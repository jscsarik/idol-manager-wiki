"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  Shuffle,
  Download,
  Menu,
  X,
  History,
  ExternalLink,
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

  const DOWNLOAD_URL = "https://drive.google.com/file/d/1lHliyWBKve_eaAQuCoKWbbJf33lBydsm/view?usp=sharing";

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#321c4d] text-white border-b border-[#241339] shadow-sm select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3 sm:gap-4">
          {/* 좌측: 로고 및 모바일 메뉴 */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-1.5 rounded text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded bg-[#58307E] border border-purple-400/30 flex items-center justify-center text-white font-black text-sm">
                IM
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-purple-200 transition-colors">
                  IDOL Manager
                </span>
                <span className="text-xs font-bold text-purple-300">
                  Wiki
                </span>
              </div>
            </Link>
          </div>

          {/* 중앙: 위키 검색창 */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 border border-purple-400/25 text-purple-200 hover:text-white text-xs sm:text-sm transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-purple-300" />
                <span className="truncate">문서 검색...</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono text-purple-300 bg-black/20 px-1.5 py-0.5 rounded border border-white/10">
                Ctrl + K
              </span>
            </button>
          </div>

          {/* 우측: 메뉴 및 다운로드 버튼 */}
          <div className="flex items-center gap-2 text-xs">
            {/* 공식 다운로드 버튼 */}
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-2xs whitespace-nowrap"
              title="게임 클라이언트 v0.30.3 다운로드 (Google Drive)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>다운로드</span>
              <span className="text-[10px] font-mono opacity-85 hidden md:inline">v0.30.3</span>
            </a>

            <Link
              href="/wiki"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded hover:bg-white/10 text-purple-100 hover:text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>전체 문서</span>
            </Link>

            <button
              onClick={handleRandomClick}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 text-purple-100 hover:text-white transition-colors"
              title="랜덤 문서 보기"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>랜덤</span>
            </button>
          </div>
        </div>
      </header>

      {/* 검색 모달 */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
