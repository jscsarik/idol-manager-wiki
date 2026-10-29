"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Sparkles, Compass } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { SIDEBAR_NAV } from "./Sidebar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // 페이지 이동 시 모바일 메뉴 자동 닫기
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // ESC 키 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* 딤 배경 */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* 사이드 서랍 */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-2xl p-4 flex flex-col z-10 overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-wiki-border">
          <div className="flex items-center gap-2 font-bold text-wiki-text text-sm">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>IDOL Manager Wiki</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-wiki-secondary hover:bg-brand-50"
            aria-label="메뉴 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 퀵 링크 */}
        <div className="space-y-1 mb-4 pb-3 border-b border-wiki-border">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
              pathname === "/" ? "bg-brand-500 text-white" : "text-wiki-text hover:bg-brand-50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>위키 대문 (홈)</span>
          </Link>
          <Link
            href="/wiki"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
              pathname === "/wiki" ? "bg-brand-500 text-white" : "text-wiki-text hover:bg-brand-50"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>모든 문서 색인</span>
          </Link>
        </div>

        {/* 카테고리별 문서 목록 */}
        <div className="flex-1 space-y-4">
          {CATEGORIES.map((cat) => {
            const navGroup = SIDEBAR_NAV.find((g) => g.categoryId === cat.id);
            if (!navGroup) return null;

            return (
              <div key={cat.id} className="space-y-1.5">
                <div className="text-xs font-bold text-brand-800 px-2 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-wiki-muted font-normal">
                    {navGroup.items.length}개
                  </span>
                </div>
                <div className="pl-2 space-y-0.5 border-l border-brand-100 ml-2">
                  {navGroup.items.map((item) => {
                    const isActive = pathname === `/wiki/${item.slug}`;
                    return (
                      <Link
                        key={item.slug}
                        href={`/wiki/${item.slug}`}
                        className={`block py-1.5 px-2.5 rounded text-xs transition-colors truncate ${
                          isActive
                            ? "bg-brand-50 text-brand-700 font-bold border-l-2 border-brand-500 -ml-[1px]"
                            : "text-wiki-secondary hover:text-brand-600 hover:bg-brand-50/50"
                        }`}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 푸터 */}
        <div className="pt-4 mt-4 border-t border-wiki-border text-[11px] text-wiki-muted">
          IDOL Manager v0.29.1 공식 위키
        </div>
      </div>
    </div>
  );
}
