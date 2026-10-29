"use client";

import React, { useState } from "react";
import { List, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import type { TocItem } from "@/lib/wiki";

interface InArticleTocProps {
  toc: TocItem[];
}

export function InArticleToc({ toc }: InArticleTocProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="my-6 inline-block min-w-[280px] sm:min-w-[340px] max-w-full rounded-2xl border border-pink-200/90 bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-white p-4 shadow-2xs">
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-pink-200/70 font-bold text-sm text-wiki-text select-none">
        <div className="flex items-center gap-1.5 text-purple-900 font-extrabold">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>문서 목차</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-purple-700 hover:text-pink-600 flex items-center gap-1 hover:underline cursor-pointer"
        >
          [{isOpen ? "숨기기" : "펼치기"}]
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-3 text-xs sm:text-sm space-y-1.5 max-h-[460px] overflow-y-auto pr-2">
          {toc.map((item) => {
            const indentClass =
              item.level === 3
                ? "pl-4 text-wiki-secondary text-xs"
                : item.level >= 4
                ? "pl-8 text-wiki-muted text-[11px]"
                : "font-bold text-wiki-text";

            return (
              <div key={item.id} className={`${indentClass} leading-relaxed`}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-pink-600 hover:underline transition-colors inline-flex items-baseline gap-1.5"
                >
                  <span className="text-pink-600 font-mono text-xs font-extrabold">
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
