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
  Download,
  Star,
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
      <header className="sticky top-0 z-40 w-full border-b border-wiki-border bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
          {/* 좌측: 마법소녀 로고 및 모바일 메뉴 버튼 */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg text-wiki-secondary hover:text-wiki-text hover:bg-pink-50 transition-colors"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-pink-600" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-pink-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 ring-2 ring-white magic-twinkle" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-base tracking-tight text-wiki-text group-hover:text-pink-600 transition-colors">
                    IDOL Manager <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-black">Wiki</span>
                  </span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-300 hidden sm:inline-block" />
                </div>
                <span className="text-[10px] text-wiki-secondary -mt-1 hidden sm:inline-block">
                  공식 게임 시스템 & 마법소녀 육성 위키
                </span>
              </div>
            </Link>
          </div>

          {/* 중앙: 검색 버튼 */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 sm:px-3.5 py-2 rounded-xl bg-wiki-bg/80 hover:bg-pink-50/50 border border-wiki-border text-wiki-secondary text-xs sm:text-sm transition-all shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-500" />
                <span className="truncate">문서 검색하기...</span>
              </div>
              <div className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono text-wiki-muted bg-white px-1.5 py-0.5 rounded border border-wiki-border">
                <span>Ctrl</span>
                <span>+</span>
                <span>K</span>
              </div>
            </button>
          </div>

          {/* 우측: 게임 다운로드 버튼 & 네비게이션 */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* 공식 구글 드라이브 다운로드 링크 */}
            <a
              href="https://drive.google.com/file/d/1lHliyWBKve_eaAQuCoKWbbJf33lBydsm/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 hover:from-pink-600 hover:via-fuchsia-600 hover:to-purple-700 text-white font-bold text-xs shadow-xs hover:shadow-md hover:scale-102 transition-all cursor-pointer"
              title="게임 최신 클라이언트 다운로드 (IDOL_Manager-0.30.3.zip)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>다운로드</span>
              <span className="hidden md:inline px-1 py-0.2 rounded bg-white/20 text-[10px] font-mono font-normal">v0.30.3</span>
            </a>

            <Link
              href="/wiki"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-wiki-secondary hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>전체 문서</span>
            </Link>

            <button
              onClick={handleRandomClick}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold text-wiki-secondary hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1.5"
              title="랜덤 문서 보기"
            >
              <Shuffle className="w-4 h-4 text-purple-500" />
              <span className="hidden xl:inline">랜덤</span>
            </button>

            <a
              href="https://github.com/jscsarik/idol-manager-wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-wiki-secondary hover:text-wiki-text hover:bg-purple-50 transition-colors"
              title="GitHub 저장소"
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
