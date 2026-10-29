import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { getCategoryById } from "./categories";

const CONTENT_PATH = path.join(process.cwd(), "content", "wiki");

export interface TocItem {
  id: string;
  text: string;
  level: number;
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
  htmlContent: string;
  toc: TocItem[];
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

// 목차(TOC) 추출 및 제목에 id 부여
function extractTocAndProcessHeadings(rawHtml: string): { processedHtml: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let headingCounter = 0;

  // h2, h3 태그 매칭
  const processedHtml = rawHtml.replace(/<h([23])>(.*?)<\/h\1>/gi, (match, levelStr, text) => {
    headingCounter++;
    const level = parseInt(levelStr, 10);
    // 태그 제거한 순수 텍스트
    const cleanText = text.replace(/<[^>]+>/g, "").trim();
    // id 생성 (영문/숫자/한글 모두 지원)
    let id = cleanText
      .toLowerCase()
      .replace(/[^\w\s\uAC00-\uD7A3-]/g, "")
      .replace(/\s+/g, "-");

    if (!id) id = `heading-${headingCounter}`;

    toc.push({
      id,
      text: cleanText,
      level,
    });

    return `<h${level} id="${id}" class="wiki-heading group relative scroll-mt-24"><a href="#${id}" class="heading-anchor opacity-0 group-hover:opacity-100 transition-opacity absolute -left-6 top-0 bottom-0 flex items-center text-brand-500 font-bold" aria-hidden="true">#</a>${text}</h${level}>`;
  });

  return { processedHtml, toc };
}

// 표에 반응형 가로 스크롤 감싸기 및 스타일 추가
function enhanceHtml(htmlString: string): string {
  // table 태그 감싸기
  let enhanced = htmlString.replace(
    /<table>([\s\S]*?)<\/table>/gi,
    '<div class="wiki-table-container overflow-x-auto my-6 rounded-lg border border-wiki-border bg-wiki-surface shadow-sm"><table class="wiki-table min-w-full divide-y divide-wiki-border text-sm">$1</table></div>'
  );

  // blockquote 스타일
  enhanced = enhanced.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    '<blockquote class="wiki-quote border-l-4 border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 px-4 py-3 rounded-r-md my-4 italic text-wiki-text">$1</blockquote>'
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

// 단일 문서 상세 조회
export async function getDocBySlug(slug: string): Promise<WikiDoc | null> {
  const filePath = slugToFilePath(slug);
  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Markdown -> HTML 변환
  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);

  const rawHtml = processedContent.toString();
  const { processedHtml, toc } = extractTocAndProcessHeadings(rawHtml);
  const htmlContent = enhanceHtml(processedHtml);

  const meta = getDocMeta(filePath);

  return {
    ...meta,
    content,
    htmlContent,
    toc,
  };
}

// 검색 인덱스 생성
export function getSearchIndex(): SearchDoc[] {
  const files = getAllMarkdownFiles(CONTENT_PATH);
  return files.map((file) => {
    const fileContents = fs.readFileSync(filePathToSlug(file) ? file : file, "utf8");
    const { content } = matter(fileContents);
    const meta = getDocMeta(file);

    // 본문에서 첫 200자 발췌
    const plainContent = content
      .replace(/#+\s+/g, "")
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
