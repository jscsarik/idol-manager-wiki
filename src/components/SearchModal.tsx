"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import type { SearchDoc } from "@/lib/wiki";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 검색 인덱스 로딩 (최초 열릴 때 1회 로드)
  useEffect(() => {
    if (isOpen && docs.length === 0) {
      setIsLoading(true);
      fetch("/api/search")
        .then((res) => res.json())
        .then((data: SearchDoc[]) => {
          setDocs(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [isOpen, docs.length]);

  // 열릴 때 포커스 및 초기화
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // 검색 결과 계산 (제목 일치 우선, 설명/카테고리/태그/본문)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const scored = docs.map((doc) => {
      let score = 0;
      const title = doc.title.toLowerCase();
      const desc = doc.description.toLowerCase();
      const cat = doc.category.toLowerCase();
      const tags = doc.tags.map((t) => t.toLowerCase()).join(" ");
      const excerpt = doc.excerpt.toLowerCase();

      // 완전 일치
      if (title === q) score += 100;
      // 제목이 검색어로 시작
      else if (title.startsWith(q)) score += 60;
      // 제목에 검색어 포함
      else if (title.includes(q)) score += 40;

      // 설명/태그
      if (tags.includes(q)) score += 25;
      if (desc.includes(q)) score += 20;
      if (cat.includes(q)) score += 15;
      if (excerpt.includes(q)) score += 5;

      return { doc, score };
    });

    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.doc)
      .slice(0, 10);
  }, [query, docs]);

  // 키보드 조작
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigateTo(results[selectedIndex].slug);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // 선택 변경 시 스크롤 맞춤
  useEffect(() => {
    if (listRef.current && results.length > 0) {
      const activeItem = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, results.length]);

  const navigateTo = (slug: string) => {
    onClose();
    router.push(`/wiki/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-wiki-border overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 검색 인풋 헤더 */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-wiki-border bg-wiki-surface">
          <Search className="w-5 h-5 text-brand-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="문서 제목, 규칙, 능력치, 일정 검색... (예: 드래프트, 건강, 부상)"
            className="flex-1 bg-transparent border-none outline-none text-wiki-text placeholder:text-wiki-muted text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 hover:bg-brand-50 rounded-full text-wiki-secondary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-wiki-muted bg-wiki-bg border border-wiki-border rounded">
            ESC
          </kbd>
        </div>

        {/* 결과 리스트 */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-1 flex-1">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-wiki-secondary">
              검색 색인을 불러오는 중...
            </div>
          ) : query.trim() === "" ? (
            <div className="p-8 text-center text-xs text-wiki-secondary">
              <div className="font-semibold text-wiki-text text-sm mb-1">
                IDOL Manager 공식 위키 검색
              </div>
              <p>원하는 키워드를 입력하면 관련 문서로 바로 이동할 수 있습니다.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {["창단 드래프트", "31주 시즌", "건강 90", "연습생 추첨", "특별전 6회", "MVP"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-full text-xs font-medium transition-colors"
                    >
                      #{tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-sm text-wiki-secondary">
              <p className="font-medium text-wiki-text mb-1">
                &ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.
              </p>
              <p className="text-xs text-wiki-muted">
                단어의 철자를 확인하거나 다른 검색어로 다시 시도해 보세요.
              </p>
            </div>
          ) : (
            results.map((doc, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={doc.slug}
                  onClick={() => navigateTo(doc.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? "bg-brand-50/80 border border-brand-200"
                      : "hover:bg-wiki-bg/60 border border-transparent"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg mt-0.5 ${
                      isSelected
                        ? "bg-brand-500 text-white"
                        : "bg-brand-100/70 text-brand-600"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-wiki-text">
                        {doc.title}
                      </span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-wiki-bg text-wiki-secondary border border-wiki-border">
                        {doc.category}
                      </span>
                    </div>
                    {doc.description && (
                      <p className="text-xs text-wiki-secondary mt-0.5 line-clamp-1">
                        {doc.description}
                      </p>
                    )}
                    <p className="text-[11px] text-wiki-muted mt-1 line-clamp-1">
                      {doc.excerpt}
                    </p>
                  </div>
                  {isSelected && (
                    <CornerDownLeft className="w-4 h-4 text-brand-500 flex-shrink-0 mt-1" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 푸터 안내 */}
        <div className="px-4 py-2 bg-wiki-bg border-t border-wiki-border text-[11px] text-wiki-muted flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 bg-white border border-wiki-border rounded mr-1">↑</kbd>
              <kbd className="px-1 py-0.5 bg-white border border-wiki-border rounded mr-1">↓</kbd>
              이동
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-white border border-wiki-border rounded mr-1">↵</kbd>
              선택
            </span>
          </div>
          <span>IDOL Manager 공식 가이드</span>
        </div>
      </div>
    </div>
  );
}
