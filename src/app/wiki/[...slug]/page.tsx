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

  // 관련 문서 목록 계산 (일반 문서일 때)
  const relatedDocs = doc.related && doc.related.length > 0
    ? allDocs.filter((d) => doc.related?.includes(d.slug) || doc.related?.includes(d.title))
    : categoryDocs.filter((d) => d.slug !== doc.slug).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 w-full">
      <div className="flex gap-6 items-start">
        {/* 좌측 사이드바 (데스크톱) */}
        <Sidebar className="hidden lg:block" />

        {/* 중앙 본문 영역 */}
        <main className="flex-1 min-w-0">
          <article className="bg-white border border-[#DDD8E6] rounded p-6 sm:p-9 shadow-2xs max-w-4xl">
            {/* 나무위키형 상단 분류 박스 */}
            <div className="mb-4 pb-2.5 border-b border-[#EBE7F2] flex items-center justify-between text-xs text-[#5A5468] flex-wrap gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-[#58307E] flex items-center gap-1">
                  <FolderTree className="w-3.5 h-3.5" />
                  분류:
                </span>
                <Link
                  href="/wiki"
                  className="text-[#553C9A] hover:underline"
                >
                  IDOL Manager
                </Link>
                <span className="text-[#DDD8E6]">|</span>
                <Link
                  href={`/wiki#category-${doc.categoryId}`}
                  className="text-[#553C9A] hover:underline font-medium"
                >
                  {doc.category}
                </Link>
              </div>

              <div className="flex items-center gap-1 text-xs text-[#718096]">
                <Calendar className="w-3.5 h-3.5 text-[#A0AEC0]" />
                <span>최근 수정: {doc.updatedAt}</span>
              </div>
            </div>

            {/* 문서 헤더 및 대형 제목 */}
            <header className="pb-4 mb-4 border-b border-[#DDD8E6] space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={doc.status} />
                <span className="text-xs px-2 py-0.5 rounded bg-[#F1EDF6] text-[#4A2E6D] font-semibold">
                  {doc.category}
                </span>
                {isBeginnerDoc && (
                  <Link
                    href="/"
                    className="text-xs text-[#553C9A] hover:underline ml-auto font-medium"
                  >
                    가이드 전체 목록
                  </Link>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#1F192C] tracking-tight">
                {doc.title}
              </h1>

              {doc.description && (
                <p className="text-sm text-[#5A5468] leading-relaxed pt-0.5">
                  {doc.description}
                </p>
              )}

              {/* 태그 목록 */}
              {doc.tags && doc.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Tag className="w-3.5 h-3.5 text-[#A0AEC0]" />
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded bg-[#F8F7FA] text-[#5A5468] border border-[#DDD8E6]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* 문서 탭 + 인포박스 + 인라인목차 + 본문/역링크/소스 통합 뷰어 */}
            <DocViewer doc={doc} />

            {/* 관련 문서 섹션 (일반 문서일 때) */}
            {!isBeginnerDoc && relatedDocs.length > 0 && (
              <section className="mt-10 pt-5 border-t border-[#DDD8E6]">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#1F192C] mb-3">
                  <BookOpen className="w-4 h-4 text-[#58307E]" />
                  <span>관련 문서</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {relatedDocs.map((rDoc) => (
                    <Link
                      key={rDoc.slug}
                      href={`/wiki/${rDoc.slug}`}
                      className="p-3 rounded border border-[#DDD8E6] bg-[#FAFAFD] hover:bg-[#F3EFF8] transition-colors group"
                    >
                      <div className="font-bold text-[#212529] group-hover:text-[#553C9A] truncate">
                        {rDoc.title}
                      </div>
                      <div className="text-[11px] text-[#718096] line-clamp-2 mt-1 leading-relaxed">
                        {rDoc.description || `${rDoc.category} 관련 세부 내용`}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* 이전 / 다음 문서 내비게이션 바 */}
            <nav className="mt-8 pt-5 border-t border-[#DDD8E6] flex items-center justify-between gap-4 text-xs">
              {prevDoc ? (
                <Link
                  href={`/wiki/${prevDoc.slug}`}
                  className="flex items-center gap-1.5 p-2 rounded border border-[#DDD8E6] hover:bg-[#F5F2F9] text-[#5A5468] hover:text-[#212529] transition-colors max-w-[48%]"
                >
                  <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                  <div className="text-left truncate">
                    <div className="text-[10px] text-[#A0AEC0]">이전 문서</div>
                    <div className="font-semibold text-[#212529] truncate">{prevDoc.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextDoc ? (
                <Link
                  href={`/wiki/${nextDoc.slug}`}
                  className="flex items-center gap-1.5 p-2 rounded border border-[#DDD8E6] hover:bg-[#F5F2F9] text-[#5A5468] hover:text-[#212529] transition-colors max-w-[48%] ml-auto"
                >
                  <div className="text-right truncate">
                    <div className="text-[10px] text-[#A0AEC0]">다음 문서</div>
                    <div className="font-semibold text-[#212529] truncate">{nextDoc.title}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </Link>
              ) : isBeginnerDoc ? (
                <Link
                  href="/"
                  className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#58307E] text-white font-bold hover:bg-[#452464] transition-colors ml-auto"
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

        {/* 우측 소제목 퀵 네비게이터 */}
        <TableOfContents toc={doc.toc} />
      </div>
    </div>
  );
}
