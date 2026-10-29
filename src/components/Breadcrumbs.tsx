"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, Copy, Check } from "lucide-react";

interface BreadcrumbsProps {
  category: string;
  categoryId: string;
  title: string;
}

export function Breadcrumbs({ category, categoryId, title }: BreadcrumbsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-between text-xs text-wiki-secondary py-2 border-b border-wiki-border/60 mb-4">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-brand-600 transition-colors flex-shrink-0"
        >
          <Home className="w-3.5 h-3.5" />
          <span>홈</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-wiki-muted flex-shrink-0" />
        <Link
          href={`/wiki?category=${categoryId}`}
          className="hover:text-brand-600 transition-colors flex-shrink-0"
        >
          {category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-wiki-muted flex-shrink-0" />
        <span className="text-wiki-text font-medium truncate max-w-[200px] sm:max-w-none">
          {title}
        </span>
      </nav>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-white hover:bg-brand-50 text-wiki-secondary hover:text-brand-600 border border-wiki-border transition-colors flex-shrink-0 ml-2"
        title="현재 문서 URL 복사"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-600 font-medium">복사됨!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>URL 복사</span>
          </>
        )}
      </button>
    </div>
  );
}
