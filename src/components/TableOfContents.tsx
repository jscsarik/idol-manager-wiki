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
    <aside className="hidden xl:block w-52 flex-shrink-0 select-none">
      <div className="sticky top-18 max-h-[calc(100vh-5rem)] overflow-y-auto rounded border border-[#DDD8E6] bg-white p-3 text-xs shadow-2xs">
        <div className="flex items-center gap-1.5 font-bold text-[#2A1740] pb-2 mb-2 border-b border-[#EBE7F2]">
          <List className="w-3.5 h-3.5 text-[#58307E]" />
          <span>목차 퀵메뉴</span>
        </div>

        <nav className="space-y-0.5">
          {toc.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group flex items-start gap-1 py-1 px-1.5 rounded transition-colors ${
                  item.level === 3 ? "pl-3 text-[11px]" : "font-medium"
                } ${
                  isActive
                    ? "text-[#58307E] font-bold bg-[#F3EFF8]"
                    : "text-[#5A5468] hover:text-[#212529] hover:bg-[#F8F7FA]"
                }`}
              >
                <span className="truncate">{item.text}</span>
              </a>
            );
          })}
        </nav>

        <div className="pt-2.5 mt-3 border-t border-[#EBE7F2]">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#718096] hover:text-[#212529] transition-colors w-full py-1 text-[11px] cursor-pointer"
          >
            <ArrowUp className="w-3 h-3" />
            <span>맨 위로 이동</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
