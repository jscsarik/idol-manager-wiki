"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Search,
  BookOpen,
  Shuffle,
  Github,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { SearchModal } from "./SearchModal";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function Header({ onMobileMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Ctrl+K 단축키 리스너
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRandomClick = () => {
    router.push("/wiki/random");
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-wiki-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* 좌측: 로고 및 모바일 메뉴 버튼 */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg text-wiki-secondary hover:text-wiki-text hover:bg-brand-50 transition-colors"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-wiki-text group-hover:text-brand-600 transition-colors">
                  IDOL Manager <span className="text-brand-600 font-extrabold">Wiki</span>
                </span>
                <span className="text-[10px] text-wiki-secondary -mt-1 hidden sm:inline-block">
                  공식 게임 시스템 & 공략 위키
                </span>
              </div>
            </Link>
          </div>

          {/* 중앙: 검색 버튼 */}
          <div className="flex-1 max-w-md mx-2 sm:mx-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-wiki-bg hover:bg-brand-50/70 border border-wiki-border text-wiki-secondary text-xs sm:text-sm transition-all shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-500" />
                <span className="truncate">문서 검색하기...</span>
              </div>
              <div className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono text-wiki-muted bg-white px-1.5 py-0.5 rounded border border-wiki-border">
                <span>Ctrl</span>
                <span>+</span>
                <span>K</span>
              </div>
            </button>
          </div>

          {/* 우측: 네비게이션 & 외부 링크 */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/wiki"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-wiki-secondary hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>전체 문서</span>
            </Link>

            <button
              onClick={handleRandomClick}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-wiki-secondary hover:text-brand-600 hover:bg-brand-50 transition-colors"
              title="랜덤 문서 보기"
            >
              <Shuffle className="w-4 h-4 text-brand-500" />
              <span className="hidden sm:inline">랜덤 문서</span>
            </button>

            <div className="h-4 w-px bg-wiki-border mx-1 hidden sm:block" />

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-wiki-secondary hover:text-wiki-text hover:bg-brand-50 transition-colors"
              title="GitHub 저장소 바로가기"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* 검색 모달 */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
