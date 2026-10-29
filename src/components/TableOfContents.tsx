"use client";

import React, { useEffect, useState } from "react";
import { List, ArrowUp, ChevronRight } from "lucide-react";
import type { TocItem } from "@/lib/wiki";

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (toc.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-wiki-border bg-white p-4 shadow-sm text-xs">
        <div className="flex items-center gap-1.5 font-bold text-wiki-text pb-2.5 mb-2.5 border-b border-wiki-border">
          <List className="w-4 h-4 text-brand-600" />
          <span>문서 목차</span>
        </div>

        <nav className="space-y-1">
          {toc.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group flex items-start gap-1 py-1 rounded transition-colors ${
                  item.level === 3 ? "pl-3 text-[11px]" : "font-medium"
                } ${
                  isActive
                    ? "text-brand-600 font-bold bg-brand-50/60"
                    : "text-wiki-secondary hover:text-brand-600"
                }`}
              >
                <ChevronRight
                  className={`w-3 h-3 mt-0.5 flex-shrink-0 transition-transform ${
                    isActive ? "text-brand-600 translate-x-0.5" : "text-transparent group-hover:text-wiki-muted"
                  }`}
                />
                <span className="truncate">{item.text}</span>
              </a>
            );
          })}
        </nav>

        <div className="pt-3 mt-4 border-t border-wiki-border/60">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-wiki-secondary hover:text-brand-600 transition-colors w-full py-1 text-[11px]"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>맨 위로 이동</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
