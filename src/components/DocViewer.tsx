"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Link2,
  Code2,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Info,
} from "lucide-react";
import type { WikiDoc } from "@/lib/wiki";
import { Infobox } from "./Infobox";
import { InArticleToc } from "./InArticleToc";

interface DocViewerProps {
  doc: WikiDoc;
}

export function DocViewer({ doc }: DocViewerProps) {
  const [activeTab, setActiveTab] = useState<"content" | "backlinks" | "raw">("content");
  const [isCopied, setIsCopied] = useState(false);
  const [isRawCopied, setIsRawCopied] = useState(false);

  // URL 복사
  const handleCopyUrl = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  // 마크다운 원본 복사
  const handleCopyRaw = async () => {
    try {
      await navigator.clipboard.writeText(doc.rawMarkdown);
      setIsRawCopied(true);
      setTimeout(() => setIsRawCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full">
      {/* 나무위키형 상단 문서 탭 바 */}
      <div className="flex items-center justify-between border-b border-wiki-border mb-6 pb-2 text-xs select-none">
        {/* 좌측 탭 */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-medium transition-colors ${
              activeTab === "content"
                ? "bg-pink-50 text-pink-700 font-bold border-b-2 border-pink-500"
                : "text-wiki-secondary hover:text-wiki-text hover:bg-pink-50/40"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-pink-600" />
            <span>문서</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("backlinks")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-medium transition-colors ${
              activeTab === "backlinks"
                ? "bg-purple-50 text-purple-700 font-bold border-b-2 border-purple-600"
                : "text-wiki-secondary hover:text-wiki-text hover:bg-purple-50/40"
            }`}
          >
            <Link2 className="w-3.5 h-3.5 text-purple-600" />
            <span>역링크</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-700 font-mono font-bold">
              {doc.backlinks.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("raw")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-medium transition-colors ${
              activeTab === "raw"
                ? "bg-pink-50 text-pink-700 font-bold border-b-2 border-pink-500"
                : "text-wiki-secondary hover:text-wiki-text hover:bg-pink-50/40"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-pink-600" />
            <span>원본 보기</span>
          </button>
        </div>

        {/* 우측 도구: URL 복사 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-wiki-border bg-white hover:bg-brand-50 text-wiki-secondary hover:text-brand-600 transition-colors cursor-pointer"
            title="문서 링크 복사"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">복사됨!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>URL 복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. 문서 본문 탭 */}
      {activeTab === "content" && (
        <div className="space-y-4">
          {/* 정보상자(Infobox): 우측 플로팅 */}
          {doc.infobox && <Infobox title={doc.title} data={doc.infobox} />}

          {/* 본문 상단 인라인 목차 박스 */}
          {doc.toc && doc.toc.length > 0 && <InArticleToc toc={doc.toc} />}

          {/* 마크다운 렌더링 본문 */}
          <div
            className="wiki-content prose prose-violet max-w-none clear-both"
            dangerouslySetInnerHTML={{ __html: doc.htmlContent }}
          />
        </div>
      )}

      {/* 2. 역링크 탭 */}
      {activeTab === "backlinks" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-100 flex items-start gap-3">
            <Info className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-wiki-secondary leading-relaxed">
              <strong className="text-brand-800 font-semibold">{doc.title}</strong> 문서를 참조하거나 언급하고 있는 다른 위키 문서 목록입니다. (총 {doc.backlinks.length}개)
            </div>
          </div>

          {doc.backlinks.length === 0 ? (
            <div className="text-center py-12 text-xs text-wiki-muted border border-dashed border-wiki-border rounded-xl">
              현재 이 문서를 참조하는 다른 문서가 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-wiki-border border border-wiki-border rounded-xl bg-white overflow-hidden">
              {doc.backlinks.map((link) => (
                <div
                  key={link.slug}
                  className="p-4 hover:bg-brand-50/30 transition-colors flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-brand-100/70 text-brand-700 font-semibold">
                        {link.category}
                      </span>
                      <Link
                        href={`/wiki/${link.slug}`}
                        className="font-bold text-sm text-wiki-text group-hover:text-brand-600 transition-colors hover:underline"
                      >
                        {link.title}
                      </Link>
                    </div>
                    {link.excerpt && (
                      <p className="text-xs text-wiki-secondary line-clamp-1">
                        {link.excerpt}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/wiki/${link.slug}`}
                    className="p-1.5 text-wiki-muted group-hover:text-brand-600 flex-shrink-0"
                    title="문서로 이동"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. 마크다운 원본 보기 탭 */}
      {activeTab === "raw" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-wiki-secondary">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-brand-600" />
              <span>읽기 전용 마크다운 소스 코드</span>
            </span>
            <button
              type="button"
              onClick={handleCopyRaw}
              className="flex items-center gap-1 px-3 py-1 rounded border border-wiki-border bg-white hover:bg-brand-50 text-wiki-secondary hover:text-brand-600 transition-colors"
            >
              {isRawCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>전체 복사</span>
                </>
              )}
            </button>
          </div>

          <div className="relative rounded-xl border border-wiki-border bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto selection:bg-brand-500 selection:text-white">
            <pre className="whitespace-pre-wrap">{doc.rawMarkdown}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
