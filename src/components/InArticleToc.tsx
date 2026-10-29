"use client";

import React, { useState } from "react";
import type { TocItem } from "@/lib/wiki";

interface InArticleTocProps {
  toc: TocItem[];
}

export function InArticleToc({ toc }: InArticleTocProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="my-6 inline-block min-w-[260px] sm:min-w-[320px] max-w-full border border-[#DDD8E6] bg-[#FAFAFD] rounded p-3 text-xs select-none shadow-2xs">
      {/* 나무위키형 목차 헤더 */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#E8E4F0] font-bold text-sm text-[#212529]">
        <div className="flex items-center gap-1.5 text-[#2A1740]">
          <span>목차</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-normal text-[#553C9A] hover:text-[#2D1B69] hover:underline cursor-pointer"
        >
          [{isOpen ? "숨기기" : "펼치기"}]
        </button>
      </div>

      {/* 목차 리스트 */}
      {isOpen && (
        <nav className="mt-2.5 space-y-1 max-h-[460px] overflow-y-auto pr-2">
          {toc.map((item) => {
            const indentClass =
              item.level === 3
                ? "pl-4 text-[#5A5468]"
                : item.level >= 4
                ? "pl-8 text-[#718096] text-[11px]"
                : "font-semibold text-[#212529]";

            return (
              <div key={item.id} className={`${indentClass} leading-relaxed`}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-[#553C9A] hover:underline transition-colors inline-flex items-baseline gap-1.5"
                >
                  <span className="text-[#553C9A] font-mono font-bold text-xs">
                    {item.number}
                  </span>
                  <span>{item.text}</span>
                </a>
              </div>
            );
          })}
        </nav>
      )}
    </div>
  );
}
