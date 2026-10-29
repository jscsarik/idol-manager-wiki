import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Calendar,
  Tag,
  Share2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { getAllDocs, getDocBySlug } from "@/lib/wiki";
import { Sidebar } from "@/components/Sidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StatusBadge } from "@/components/StatusBadge";
import { Infobox } from "@/components/Infobox";

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
    title: doc.title,
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
  const categoryDocs = allDocs.filter((d) => d.categoryId === doc.categoryId);
  const currentIndex = categoryDocs.findIndex((d) => d.slug === doc.slug);

  const prevDoc = currentIndex > 0 ? categoryDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < categoryDocs.length - 1 ? categoryDocs[currentIndex + 1] : null;

  // 관련 문서 목록 계산
  const relatedDocs = doc.related
    ? allDocs.filter((d) => doc.related?.includes(d.slug) || doc.related?.includes(d.title))
    : categoryDocs.filter((d) => d.slug !== doc.slug).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex gap-8 items-start">
        {/* 좌측 사이드바 (데스크톱) */}
        <Sidebar className="hidden lg:block" />

        {/* 중앙 본문 영역 */}
        <main className="flex-1 min-w-0">
          <article className="bg-white rounded-2xl border border-wiki-border p-6 sm:p-10 shadow-xs">
            {/* 상단 경로 (Breadcrumbs) */}
            <Breadcrumbs
              category={doc.category}
              categoryId={doc.categoryId}
              title={doc.title}
            />

            {/* 문서 헤더 */}
            <header className="pb-6 mb-6 border-b border-wiki-border space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={doc.status} />
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-semibold border border-brand-100">
                  {doc.category}
                </span>
                <span className="text-xs text-wiki-muted flex items-center gap-1 ml-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  최종 수정: {doc.updatedAt}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-wiki-text tracking-tight">
                {doc.title}
              </h1>

              {doc.description && (
                <p className="text-sm sm:text-base text-wiki-secondary leading-relaxed font-normal">
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
                      className="text-[11px] px-2 py-0.5 rounded-md bg-wiki-bg text-wiki-secondary border border-wiki-border/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* 정보상자 (Infobox) */}
            {doc.infobox && (
              <Infobox title={doc.title} data={doc.infobox} />
            )}

            {/* 본문 마크다운 HTML 렌더링 */}
            <div
              className="wiki-content prose prose-violet max-w-none clear-both"
              dangerouslySetInnerHTML={{ __html: doc.htmlContent }}
            />

            {/* 관련 문서 섹션 */}
            {relatedDocs.length > 0 && (
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
                      className="p-3 rounded-xl border border-wiki-border hover:border-brand-300 hover:bg-brand-50/30 transition-all group"
                    >
                      <div className="font-bold text-xs text-wiki-text group-hover:text-brand-600 transition-colors line-clamp-1">
                        {rDoc.title}
                      </div>
                      <div className="text-[11px] text-wiki-secondary line-clamp-2 mt-1">
                        {rDoc.description || `${rDoc.category} 관련 세부 내용`}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* 이전/다음 문서 내비게이션 */}
            <nav className="mt-8 pt-6 border-t border-wiki-border/60 flex items-center justify-between gap-4 text-xs">
              {prevDoc ? (
                <Link
                  href={`/wiki/${prevDoc.slug}`}
                  className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-brand-50 text-wiki-secondary hover:text-brand-600 transition-colors max-w-[45%]"
                >
                  <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                  <div className="text-left truncate">
                    <div className="text-[10px] text-wiki-muted">이전 문서</div>
                    <div className="font-semibold text-wiki-text truncate">{prevDoc.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextDoc ? (
                <Link
                  href={`/wiki/${nextDoc.slug}`}
                  className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-brand-50 text-wiki-secondary hover:text-brand-600 transition-colors max-w-[45%]"
                >
                  <div className="text-right truncate">
                    <div className="text-[10px] text-wiki-muted">다음 문서</div>
                    <div className="font-semibold text-wiki-text truncate">{nextDoc.title}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </article>
        </main>

        {/* 우측 목차 (TOC) */}
        <TableOfContents toc={doc.toc} />
      </div>
    </div>
  );
}
