import React from "react";
import Link from "next/link";
import { BookOpen, FileText, ArrowRight, Tag } from "lucide-react";
import { getAllDocs } from "@/lib/wiki";
import { CATEGORIES } from "@/lib/categories";
import { StatusBadge } from "@/components/StatusBadge";
import { Sidebar } from "@/components/Sidebar";

export const metadata = {
  title: "전체 문서 색인",
  description: "IDOL Manager Wiki의 모든 시스템 문서, 카테고리 및 색인 목록입니다.",
};

export default function WikiIndexPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const allDocs = getAllDocs();
  const selectedCategory = searchParams.category;

  const filteredCategories = selectedCategory
    ? CATEGORIES.filter((c) => c.id === selectedCategory)
    : CATEGORIES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex gap-8">
        {/* 데스크톱 좌측 사이드바 */}
        <Sidebar className="hidden lg:block" />

        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* 헤더 */}
          <div className="bg-white rounded-2xl border border-wiki-border p-6 shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-xl text-wiki-text">
              <BookOpen className="w-5 h-5 text-brand-600" />
              <h1>전체 위키 문서 색인</h1>
            </div>
            <p className="text-xs sm:text-sm text-wiki-secondary leading-relaxed">
              IDOL Manager 공식 위키에 수록된 총 <strong>{allDocs.length}개</strong>의 문서 목록입니다.
              원하는 카테고리를 선택하거나 상단 검색창(Ctrl+K)을 통해 빠르게 찾아보실 수 있습니다.
            </p>

            {/* 카테고리 필터 탭 */}
            <div className="pt-3 flex flex-wrap gap-1.5 border-t border-wiki-border/60">
              <Link
                href="/wiki"
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  !selectedCategory
                    ? "bg-brand-500 text-white"
                    : "bg-wiki-bg hover:bg-brand-50 text-wiki-secondary hover:text-brand-600 border border-wiki-border"
                }`}
              >
                전체 ({allDocs.length})
              </Link>
              {CATEGORIES.map((cat) => {
                const count = allDocs.filter((d) => d.categoryId === cat.id).length;
                const isSelected = selectedCategory === cat.id;
                return (
                  <Link
                    key={cat.id}
                    href={`/wiki?category=${cat.id}`}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-brand-500 text-white"
                        : "bg-wiki-bg hover:bg-brand-50 text-wiki-secondary hover:text-brand-600 border border-wiki-border"
                    }`}
                  >
                    {cat.name} ({count})
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 카테고리별 문서 그룹 */}
          <div className="space-y-6">
            {filteredCategories.map((cat) => {
              const docs = allDocs.filter((d) => d.categoryId === cat.id);
              if (docs.length === 0) return null;

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-wiki-border p-6 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-wiki-border">
                    <div>
                      <h2 className="text-base font-bold text-wiki-text flex items-center gap-2">
                        <FileText className="w-4 h-4 text-brand-600" />
                        <span>{cat.name}</span>
                      </h2>
                      <p className="text-xs text-wiki-secondary mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">
                      {docs.length}개 문서
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {docs.map((doc) => (
                      <Link
                        key={doc.slug}
                        href={`/wiki/${doc.slug}`}
                        className="p-4 rounded-xl border border-wiki-border hover:border-brand-300 hover:bg-brand-50/30 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-wiki-text group-hover:text-brand-600 transition-colors">
                              {doc.title}
                            </span>
                            <StatusBadge status={doc.status} />
                          </div>
                          {doc.description && (
                            <p className="text-xs text-wiki-secondary mt-1 line-clamp-2 leading-relaxed">
                              {doc.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 mt-2 border-t border-wiki-border/40 flex items-center justify-between text-[11px] text-wiki-muted">
                          <div className="flex items-center gap-1.5 truncate mr-2">
                            {doc.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 rounded bg-wiki-bg text-wiki-secondary border border-wiki-border"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <span className="flex-shrink-0">{doc.updatedAt}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
