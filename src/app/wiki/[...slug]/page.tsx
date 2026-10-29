import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FolderTree,
  GraduationCap,
  List,
} from "lucide-react";
import { getAllDocs, getDocBySlug } from "@/lib/wiki";
import { Sidebar } from "@/components/Sidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { StatusBadge } from "@/components/StatusBadge";
import { DocViewer } from "@/components/DocViewer";

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slugPath = params.slug.join("/");
  const doc = await getDocBySlug(slugPath);

  if (!doc) {
    return {
      title: "문서를 찾을 수 없습니다",
    };
  }

  return {
    title: `${doc.title} — IDOL Manager Wiki`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} — IDOL Manager Wiki`,
      description: doc.description,
      type: "article",
    },
  };
}

export default async function WikiDocPage({ params }: PageProps) {
  const slugPath = params.slug.join("/");
  const doc = await getDocBySlug(slugPath);

  if (!doc) {
    notFound();
  }

  const allDocs = getAllDocs();
  const isBeginnerDoc = doc.categoryId === "beginner";

  // 같은 카테고리 내 문서 목록 (순서 보장)
  const categoryDocs = allDocs.filter((d) => d.categoryId === doc.categoryId);
  const currentIndex = categoryDocs.findIndex((d) => d.slug === doc.slug);

  const prevDoc = currentIndex > 0 ? categoryDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < categoryDocs.length - 1 ? categoryDocs[currentIndex + 1] : null;

  // 관련 문서 목록 계산 (초보자 가이드가 아닐 때 주로 표시)
  const relatedDocs = doc.related && doc.related.length > 0
    ? allDocs.filter((d) => doc.related?.includes(d.slug) || doc.related?.includes(d.title))
    : categoryDocs.filter((d) => d.slug !== doc.slug).slice(0, 3);

  // 초보자 가이드 단계 추출
  const stepMatch = doc.title.match(/^(\d{2})\./);
  const stepNumber = stepMatch ? parseInt(stepMatch[1], 10) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      <div className="flex gap-8 items-start">
        {/* 좌측 카테고리 & 12단계 트리 사이드바 (데스크톱) */}
        <Sidebar className="hidden lg:block" />

        {/* 중앙 본문 영역 (가독성 높은 쾌적한 레이아웃) */}
        <main className="flex-1 min-w-0">
          <article className="bg-white rounded-2xl border border-wiki-border p-6 sm:p-10 shadow-xs max-w-4xl">
            {/* 1. 상단 분류 바 또는 초보자 가이드 진행 바 */}
            <div className="mb-5 pb-3 border-b border-wiki-border/70 flex items-center justify-between text-xs text-wiki-secondary flex-wrap gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {isBeginnerDoc ? (
                  <>
                    <span className="font-extrabold text-brand-700 flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-brand-600" />
                      <span>초보자 가이드</span>
                    </span>
                    <span className="text-wiki-border">|</span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold font-mono text-[11px]">
                      STEP {stepNumber ? String(stepNumber).padStart(2, "0") : "01"} / 12
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-brand-700 flex items-center gap-1">
                      <FolderTree className="w-3.5 h-3.5 text-brand-600" />
                      분류:
                    </span>
                    <Link
                      href="/wiki"
                      className="text-brand-600 hover:underline hover:text-brand-800"
                    >
                      IDOL Manager
                    </Link>
                    <span className="text-wiki-border">|</span>
                    <Link
                      href={`/wiki#category-${doc.categoryId}`}
                      className="text-brand-600 hover:underline hover:text-brand-800 font-medium"
                    >
                      {doc.category}
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-wiki-muted">
                <Calendar className="w-3.5 h-3.5 text-brand-400" />
                <span>최종 수정: {doc.updatedAt}</span>
              </div>
            </div>

            {/* 2. 문서 헤더 및 대형 제목 */}
            <header className="pb-5 mb-5 border-b border-wiki-border space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={doc.status} />
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 font-semibold border border-brand-200">
                  {doc.category}
                </span>
                {isBeginnerDoc && (
                  <Link
                    href="/"
                    className="text-xs text-brand-600 hover:underline ml-auto flex items-center gap-1 font-medium"
                  >
                    <List className="w-3 h-3" />
                    <span>가이드 전체 목차로</span>
                  </Link>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-wiki-text tracking-tight leading-tight">
                {doc.title}
              </h1>

              {doc.description && (
                <p className="text-sm sm:text-base text-wiki-secondary leading-relaxed font-normal pt-1">
                  {doc.description}
                </p>
              )}

              {/* 태그 목록 */}
              {doc.tags && doc.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Tag className="w-3.5 h-3.5 text-wiki-muted" />
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-wiki-bg text-wiki-secondary border border-wiki-border/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* 3. 나무위키형 상단 탭 툴바 + 인포박스 + 인라인목차 + 본문/역링크/소스 통합 뷰어 */}
            <DocViewer doc={doc} />

            {/* 4. 관련 문서 섹션 (상세 문서일 때) */}
            {!isBeginnerDoc && relatedDocs.length > 0 && (
              <section className="mt-12 pt-6 border-t border-wiki-border">
                <div className="flex items-center gap-2 font-bold text-sm text-wiki-text mb-3">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  <span>함께 읽어보기 좋은 관련 문서</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedDocs.map((rDoc) => (
                    <Link
                      key={rDoc.slug}
                      href={`/wiki/${rDoc.slug}`}
                      className="p-3.5 rounded-xl border border-wiki-border hover:border-brand-300 hover:bg-brand-50/30 transition-all group"
                    >
                      <div className="font-bold text-xs sm:text-sm text-wiki-text group-hover:text-brand-600 transition-colors line-clamp-1">
                        {rDoc.title}
                      </div>
                      <div className="text-xs text-wiki-secondary line-clamp-2 mt-1 leading-relaxed">
                        {rDoc.description || `${rDoc.category} 관련 세부 내용`}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* 5. 이전 / 다음 단계 명확한 내비게이션 바 */}
            <nav className="mt-10 pt-6 border-t border-wiki-border/70 flex items-center justify-between gap-4 text-xs sm:text-sm">
              {prevDoc ? (
                <Link
                  href={`/wiki/${prevDoc.slug}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-wiki-border hover:border-brand-300 hover:bg-brand-50 text-wiki-secondary hover:text-brand-700 transition-all max-w-[48%]"
                >
                  <ChevronLeft className="w-4 h-4 flex-shrink-0 text-brand-600" />
                  <div className="text-left truncate">
                    <div className="text-[11px] text-wiki-muted">
                      {isBeginnerDoc ? "이전 가이드 단계" : "이전 문서"}
                    </div>
                    <div className="font-bold text-wiki-text truncate">{prevDoc.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextDoc ? (
                <Link
                  href={`/wiki/${nextDoc.slug}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-wiki-border hover:border-brand-300 hover:bg-brand-50 text-wiki-secondary hover:text-brand-700 transition-all max-w-[48%] ml-auto"
                >
                  <div className="text-right truncate">
                    <div className="text-[11px] text-wiki-muted">
                      {isBeginnerDoc ? "다음 가이드 단계" : "다음 문서"}
                    </div>
                    <div className="font-bold text-wiki-text truncate">{nextDoc.title}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-brand-600" />
                </Link>
              ) : isBeginnerDoc ? (
                <Link
                  href="/"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-all ml-auto shadow-xs"
                >
                  <span>가이드 완료! 메인으로</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </article>
        </main>

        {/* 우측 소제목 스크롤 네비게이터 */}
        <TableOfContents toc={doc.toc} />
      </div>
    </div>
  );
}
