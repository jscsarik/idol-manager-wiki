import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { getCategoryById } from "./categories";
import { SORTED_GLOSSARY, type GlossaryEntry } from "./glossary";

const CONTENT_PATH = path.join(process.cwd(), "content", "wiki");

export interface TocItem {
  id: string;
  text: string;
  level: number;
  number: string;
}

export interface Backlink {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
}

export interface WikiDocMeta {
  title: string;
  description: string;
  category: string;
  categoryId: string;
  tags: string[];
  updatedAt: string;
  status: "confirmed" | "in-development" | "verification-needed";
  infobox?: Record<string, string>;
  related?: string[];
  slug: string;
  path: string;
}

export interface WikiDoc extends WikiDocMeta {
  content: string;
  rawMarkdown: string;
  htmlContent: string;
  toc: TocItem[];
  backlinks: Backlink[];
}

export interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  tags: string[];
  excerpt: string;
  status: string;
}

// 재귀적으로 파일 목록 읽기
function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllMarkdownFiles(fullPath, fileList);
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// 파일 경로를 슬러그로 변환
function filePathToSlug(filePath: string): string {
  const relativePath = path.relative(CONTENT_PATH, filePath);
  return relativePath
    .replace(/\\/g, "/")
    .replace(/\.(md|mdx)$/, "");
}

// 슬러그를 파일 경로로 변환
function slugToFilePath(slug: string): string | null {
  const candidates = [
    path.join(CONTENT_PATH, `${slug}.md`),
    path.join(CONTENT_PATH, `${slug}.mdx`),
    path.join(CONTENT_PATH, slug, "index.md"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

// 전체 문서의 슬러그 <-> 제목 맵 생성 (캐싱)
let cachedDocIndex: { slugToTitle: Map<string, string>; titleToSlug: Map<string, string> } | null = null;

export function getDocMappings(): { slugToTitle: Map<string, string>; titleToSlug: Map<string, string> } {
  if (cachedDocIndex) return cachedDocIndex;

  const files = getAllMarkdownFiles(CONTENT_PATH);
  const slugToTitle = new Map<string, string>();
  const titleToSlug = new Map<string, string>();

  for (const file of files) {
    const fileContents = fs.readFileSync(file, "utf8");
    const { data } = matter(fileContents);
    const slug = filePathToSlug(file);
    const title = data.title || path.basename(file, path.extname(file));

    slugToTitle.set(slug, title);
    titleToSlug.set(title.toLowerCase().trim(), slug);

    // 슬러그의 마지막 단어(예: founding-draft)도 별칭으로 매핑
    const baseSlug = path.basename(slug);
    if (!titleToSlug.has(baseSlug.toLowerCase())) {
      titleToSlug.set(baseSlug.toLowerCase(), slug);
    }
  }

  cachedDocIndex = { slugToTitle, titleToSlug };
  return cachedDocIndex;
}

/**
 * 1. 나무위키식 [[문서명]], [[문서명|표시명]], [[문서명#소제목|표시명]] 전처리
 */
function processWikiLinks(markdown: string): string {
  const { titleToSlug, slugToTitle } = getDocMappings();

  // 코드 블록(``` ... ```)과 인라인 코드(` ... `)를 임시 플레이스홀더로 보호
  const codeBlocks: string[] = [];
  const protectedMarkdown = markdown.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (match) => {
    const token = `@@CODE_BLOCK_${codeBlocks.length}@@`;
    codeBlocks.push(match);
    return token;
  });

  // [[문서명|표시명]] 또는 [[문서명]] 매칭
  const withWikiLinks = protectedMarkdown.replace(/\[\[(.*?)\]\]/g, (match, rawInner) => {
    const parts = rawInner.split("|");
    const targetPart = parts[0].trim();
    const displayText = parts.length > 1 ? parts[1].trim() : targetPart;

    // # 앵커 분리
    let targetDoc = targetPart;
    let anchor = "";
    if (targetPart.includes("#")) {
      const hashIndex = targetPart.indexOf("#");
      targetDoc = targetPart.substring(0, hashIndex).trim();
      anchor = "#" + targetPart.substring(hashIndex + 1).trim()
        .toLowerCase()
        .replace(/[^\w\s\uAC00-\uD7A3-]/g, "")
        .replace(/\s+/g, "-");
    }

    // 대상 슬러그 찾기
    let targetSlug: string | undefined = undefined;

    // 슬러그 형식 직접 입력 (예: season/founding-prep)
    if (slugToTitle.has(targetDoc)) {
      targetSlug = targetDoc;
    } else {
      targetSlug = titleToSlug.get(targetDoc.toLowerCase());
    }

    if (targetSlug) {
      return `[${displayText}](/wiki/${targetSlug}${anchor})`;
    } else {
      // 존재하지 않는 문서: 나무위키 스타일 취소선/붉은색 링크 안내
      return `<span class="wiki-link-missing" title="아직 작성되지 않은 문서입니다: ${targetDoc}">${displayText}</span>`;
    }
  });

  // 보호했던 코드 블록 복원
  return withWikiLinks.replace(/@@CODE_BLOCK_(\d+)@@/g, (_, index) => codeBlocks[parseInt(index, 10)]);
}

/**
 * 2. 나무위키 스타일 계층 번호(1., 1.1., ...) 추출 및 목차(TOC) 구성
 */
function extractTocAndProcessHeadings(rawHtml: string): { processedHtml: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let sec = 0;
  let subSec = 0;
  let subSubSec = 0;
  let headingCounter = 0;

  // h2, h3, h4 태그 매칭
  const processedHtml = rawHtml.replace(/<h([234])>(.*?)<\/h\1>/gi, (match, levelStr, innerText) => {
    headingCounter++;
    const level = parseInt(levelStr, 10);
    // 태그 제거한 순수 텍스트
    let cleanText = innerText.replace(/<[^>]+>/g, "").trim();

    // 원문에 이미 번호가 붙어 있는 경우(예: "1. 개요", "2.1. 판정") 분리
    const existingNumMatch = cleanText.match(/^(\d+(?:\.\d+)*)\.?\s*(.*)$/);
    let number = "";
    if (existingNumMatch) {
      number = existingNumMatch[1] + ".";
      cleanText = existingNumMatch[2].trim();
      // 기존 번호 체계에 맞게 카운터 동기화
      const parts = existingNumMatch[1].split(".").map((n: string) => parseInt(n, 10));
      if (parts.length === 1) {
        sec = parts[0];
        subSec = 0;
        subSubSec = 0;
      } else if (parts.length === 2) {
        sec = parts[0];
        subSec = parts[1];
        subSubSec = 0;
      } else if (parts.length >= 3) {
        sec = parts[0];
        subSec = parts[1];
        subSubSec = parts[2];
      }
    } else {
      // 원문에 번호가 없으면 자동 부여
      if (level === 2) {
        sec++;
        subSec = 0;
        subSubSec = 0;
        number = `${sec}.`;
      } else if (level === 3) {
        if (sec === 0) sec = 1;
        subSec++;
        subSubSec = 0;
        number = `${sec}.${subSec}.`;
      } else if (level === 4) {
        if (sec === 0) sec = 1;
        if (subSec === 0) subSec = 1;
        subSubSec++;
        number = `${sec}.${subSec}.${subSubSec}.`;
      }
    }

    // id 생성 (영문/한글/숫자)
    let id = cleanText
      .toLowerCase()
      .replace(/[^\w\s\uAC00-\uD7A3-]/g, "")
      .replace(/\s+/g, "-");

    if (!id) id = `heading-${headingCounter}`;

    toc.push({
      id,
      text: cleanText,
      level,
      number,
    });

    return `<h${level} id="${id}" class="wiki-heading group relative scroll-mt-24"><a href="#${id}" class="heading-anchor opacity-0 group-hover:opacity-100 transition-opacity absolute -left-6 top-0 bottom-0 flex items-center text-brand-500 font-bold" aria-hidden="true">#</a><span class="wiki-heading-num text-brand-600 font-bold mr-2 select-none">${number}</span>${cleanText}</h${level}>`;
  });

  return { processedHtml, toc };
}

/**
 * 3. 게임 용어 자동 하이퍼링크 연결 (Glossary Auto-linker)
 * - 이미 <a>, <pre>, <code>, <h1~6> 내부에 있는 것은 변환하지 않음
 * - 문단(<p>, <li>, <td>) 단위로 동일 용어는 최초 1회만 변환
 * - 현재 보고 있는 문서(currentSlug)로 향하는 링크는 셀프 링크 방지로 제외
 */
function autoLinkGlossary(htmlString: string, currentSlug: string): string {
  // 보호할 블록들을 임시 토큰으로 치환 (링크, 코드블록, 헤딩)
  const protectedBlocks: string[] = [];
  const tokenized = htmlString.replace(/(<a[\s\S]*?<\/a>|<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>|<h[1-6][\s\S]*?<\/h[1-6]>|<[^>]+>)/gi, (match) => {
    const token = `@@PROTECTED_TAG_${protectedBlocks.length}@@`;
    protectedBlocks.push(match);
    return token;
  });

  // 이제 tokenized 텍스트는 순수 텍스트 영역만 남아있음.
  // 긴 용어부터 우선 치환
  let linkedText = tokenized;
  const linkedTerms = new Set<string>();

  for (const entry of SORTED_GLOSSARY) {
    // 자기 자신 문서로의 링크는 스킵
    if (entry.slug === currentSlug) continue;

    // 이미 너무 많은 링크가 걸렸거나 같은 용어를 처리한 경우
    if (linkedTerms.has(entry.term)) continue;

    // 단어 경계 또는 한글/영문 매칭
    // 정규식 이스케이프
    const escapedTerm = entry.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<![a-zA-Z0-9가-힣_])(${escapedTerm})(?![a-zA-Z0-9가-힣_])`, "g");

    // 첫 1회 또는 2회까지만 링크 적용 (과도한 링크 방지)
    let replaceCount = 0;
    linkedText = linkedText.replace(regex, (match) => {
      if (replaceCount < 2) {
        replaceCount++;
        linkedTerms.add(entry.term);
        const anchorPart = entry.anchor ? `#${entry.anchor}` : "";
        return `<a href="/wiki/${entry.slug}${anchorPart}" class="wiki-auto-link" title="${entry.term} 문서로 이동">${match}</a>`;
      }
      return match;
    });
  }

  // 보호했던 태그들 복원
  return linkedText.replace(/@@PROTECTED_TAG_(\d+)@@/g, (_, index) => protectedBlocks[parseInt(index, 10)]);
}

/**
 * 4. 표 가로스크롤 감싸기, 인용구, 각주 스타일 강화
 */
function enhanceHtml(htmlString: string): string {
  // table 태그 감싸기
  let enhanced = htmlString.replace(
    /<table>([\s\S]*?)<\/table>/gi,
    '<div class="wiki-table-container overflow-x-auto my-6 rounded-lg border border-wiki-border bg-white shadow-xs"><table class="wiki-table min-w-full divide-y divide-wiki-border text-sm">$1</table></div>'
  );

  // blockquote 스타일
  enhanced = enhanced.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    '<blockquote class="wiki-quote border-l-4 border-brand-500 bg-brand-50/40 px-4 py-3 rounded-r-md my-4 italic text-wiki-text">$1</blockquote>'
  );

  // details/summary 접기 UI 스타일 보강
  enhanced = enhanced.replace(
    /<details>([\s\S]*?)<\/details>/gi,
    '<details class="wiki-details my-4 rounded-xl border border-brand-200 bg-white overflow-hidden shadow-xs">$1</details>'
  );

  // footnotes 섹션 스타일링
  enhanced = enhanced.replace(
    /<section[^>]*class="footnotes"[^>]*>([\s\S]*?)<\/section>/gi,
    '<section class="wiki-footnotes mt-12 pt-6 border-t border-wiki-border text-xs text-wiki-secondary bg-wiki-bg/40 p-4 rounded-xl"><div class="font-bold text-wiki-text mb-2 text-sm flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-brand-500"></span><span>각주 및 주석</span></div>$1</section>'
  );

  return enhanced;
}

// 단일 문서 메타데이터 파싱
export function getDocMeta(filePath: string): WikiDocMeta {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  const slug = filePathToSlug(filePath);
  const categoryId = slug.includes("/") ? slug.split("/")[0] : "introduction";
  const catObj = getCategoryById(categoryId);

  // Date 객체 안전 변환
  let formattedDate = "2026-10-27";
  if (data.updatedAt instanceof Date) {
    formattedDate = data.updatedAt.toISOString().split("T")[0];
  } else if (data.updatedAt) {
    formattedDate = String(data.updatedAt);
  }

  // Infobox 값 안전 문자열 변환
  let safeInfobox: Record<string, string> | undefined = undefined;
  if (data.infobox && typeof data.infobox === "object") {
    safeInfobox = {};
    for (const [k, v] of Object.entries(data.infobox)) {
      safeInfobox[k] = v instanceof Date ? v.toISOString().split("T")[0] : String(v);
    }
  }

  return {
    title: data.title || path.basename(filePath, path.extname(filePath)),
    description: data.description || "",
    category: data.category || (catObj ? catObj.name : "기타"),
    categoryId: data.categoryId || categoryId,
    tags: Array.isArray(data.tags) ? data.tags : typeof data.tags === "string" ? data.tags.split(",").map((t: string) => t.trim()) : [],
    updatedAt: formattedDate,
    status: (data.status as WikiDocMeta["status"]) || "confirmed",
    infobox: safeInfobox,
    related: Array.isArray(data.related) ? data.related : [],
    slug,
    path: `/wiki/${slug}`,
  };
}

// 모든 문서 메타데이터 조회
export function getAllDocs(): WikiDocMeta[] {
  const files = getAllMarkdownFiles(CONTENT_PATH);
  const docs = files.map((file) => getDocMeta(file));
  // 최근 수정일순 정렬
  return docs.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

// 카테고리별 문서 조회
export function getDocsByCategory(categoryId: string): WikiDocMeta[] {
  const allDocs = getAllDocs();
  return allDocs.filter((doc) => doc.categoryId === categoryId);
}

/**
 * 5. 전체 역링크 색인 (Backlinks Index) 생성
 * 전체 문서를 분석하여, A 문서를 가리키는 다른 문서들의 목록을 도출
 */
let cachedBacklinks: Map<string, Backlink[]> | null = null;

export function getAllBacklinks(): Map<string, Backlink[]> {
  if (cachedBacklinks) return cachedBacklinks;

  const files = getAllMarkdownFiles(CONTENT_PATH);
  const backlinksMap = new Map<string, Backlink[]>();
  const { titleToSlug, slugToTitle } = getDocMappings();

  // 모든 슬러그 초기화
  for (const file of files) {
    const slug = filePathToSlug(file);
    backlinksMap.set(slug, []);
  }

  for (const file of files) {
    const sourceSlug = filePathToSlug(file);
    const meta = getDocMeta(file);
    const content = fs.readFileSync(file, "utf8");

    const referencedSlugs = new Set<string>();

    // 1) 마크다운 일반 링크 [텍스트](/wiki/target-slug)
    const mdLinkRegex = /\[([^\]]+)\]\(\/wiki\/([a-zA-Z0-9_\-\/]+)(#[^)]+)?\)/g;
    let match;
    while ((match = mdLinkRegex.exec(content)) !== null) {
      const targetSlug = match[2];
      if (targetSlug !== sourceSlug) {
        referencedSlugs.add(targetSlug);
      }
    }

    // 2) [[위키 링크]]
    const wikiLinkRegex = /\[\[(.*?)\]\]/g;
    while ((match = wikiLinkRegex.exec(content)) !== null) {
      const rawTarget = match[1].split("|")[0].split("#")[0].trim();
      let targetSlug = slugToTitle.has(rawTarget) ? rawTarget : titleToSlug.get(rawTarget.toLowerCase());
      if (targetSlug && targetSlug !== sourceSlug) {
        referencedSlugs.add(targetSlug);
      }
    }

    // 3) 용어 사전 매칭 (본문에 해당 용어가 포함되어 있으면 역링크로 인식)
    for (const entry of SORTED_GLOSSARY) {
      if (entry.slug !== sourceSlug && content.includes(entry.term)) {
        referencedSlugs.add(entry.slug);
      }
    }

    // 역링크 등록
    Array.from(referencedSlugs).forEach((targetSlug) => {
      const list = backlinksMap.get(targetSlug) || [];
      if (!list.some((b) => b.slug === sourceSlug)) {
        list.push({
          slug: sourceSlug,
          title: meta.title,
          category: meta.category,
          excerpt: meta.description,
        });
        backlinksMap.set(targetSlug, list);
      }
    });
  }

  cachedBacklinks = backlinksMap;
  return cachedBacklinks;
}

export function getBacklinksForSlug(slug: string): Backlink[] {
  const allBacklinks = getAllBacklinks();
  return allBacklinks.get(slug) || [];
}

// 단일 문서 상세 조회
export async function getDocBySlug(slug: string): Promise<WikiDoc | null> {
  const filePath = slugToFilePath(slug);
  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // 1. [[위키 링크]] 전처리
  const preprocessedMarkdown = processWikiLinks(content);

  // 2. Markdown -> HTML 변환 (gfm 테이블, 각주 등 지원)
  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(preprocessedMarkdown);

  const rawHtml = processedContent.toString();

  // 3. 문단 번호 부여 및 TOC 추출
  const { processedHtml, toc } = extractTocAndProcessHeadings(rawHtml);

  // 4. 게임 용어 자동 하이퍼링크 연결
  const autoLinkedHtml = autoLinkGlossary(processedHtml, slug);

  // 5. 테이블 가로스크롤, 인용구, 각주 스타일 강화
  const htmlContent = enhanceHtml(autoLinkedHtml);

  const meta = getDocMeta(filePath);
  const backlinks = getBacklinksForSlug(slug);

  return {
    ...meta,
    content,
    rawMarkdown: content,
    htmlContent,
    toc,
    backlinks,
  };
}

// 검색 인덱스 생성
export function getSearchIndex(): SearchDoc[] {
  const files = getAllMarkdownFiles(CONTENT_PATH);
  return files.map((file) => {
    const fileContents = fs.readFileSync(file, "utf8");
    const { content } = matter(fileContents);
    const meta = getDocMeta(file);

    // 본문에서 첫 150자 발췌
    const plainContent = content
      .replace(/#+\s+/g, "")
      .replace(/\[\[([^|\]]+)(\|[^\]]+)?\]\]/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .replace(/\n+/g, " ")
      .trim();

    return {
      slug: meta.slug,
      title: meta.title,
      description: meta.description,
      category: meta.category,
      categoryId: meta.categoryId,
      tags: meta.tags,
      excerpt: plainContent.slice(0, 150) + "...",
      status: meta.status,
    };
  });
}

// 랜덤 문서 슬러그
export function getRandomDocSlug(): string {
  const allDocs = getAllDocs();
  if (allDocs.length === 0) return "introduction/overview";
  const randomIndex = Math.floor(Math.random() * allDocs.length);
  return allDocs[randomIndex].slug;
}
