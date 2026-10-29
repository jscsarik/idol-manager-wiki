"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Link2,
  Code2,
  Copy,
  Check,
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
      <div className="flex items-center justify-between border-b border-[#DDD8E6] mb-5 pb-0 text-xs select-none">
        {/* 좌측 탭 */}
        <div className="flex items-center gap-0.5 -mb-px">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-1.5 px-3 py-2 border-t-2 font-medium transition-colors cursor-pointer ${
              activeTab === "content"
                ? "bg-white text-[#58307E] font-bold border-t-[#58307E] border-x border-[#DDD8E6] border-b-white -mb-px"
                : "border-t-transparent text-[#5A5468] hover:text-[#212529] hover:bg-[#F5F2F9]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>문서</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("backlinks")}
            className={`flex items-center gap-1.5 px-3 py-2 border-t-2 font-medium transition-colors cursor-pointer ${
              activeTab === "backlinks"
                ? "bg-white text-[#58307E] font-bold border-t-[#58307E] border-x border-[#DDD8E6] border-b-white -mb-px"
                : "border-t-transparent text-[#5A5468] hover:text-[#212529] hover:bg-[#F5F2F9]"
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>역링크</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded text-[10px] bg-[#EBE7F2] text-[#4A2E6D] font-mono">
              {doc.backlinks.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("raw")}
            className={`flex items-center gap-1.5 px-3 py-2 border-t-2 font-medium transition-colors cursor-pointer ${
              activeTab === "raw"
                ? "bg-white text-[#58307E] font-bold border-t-[#58307E] border-x border-[#DDD8E6] border-b-white -mb-px"
                : "border-t-transparent text-[#5A5468] hover:text-[#212529] hover:bg-[#F5F2F9]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>원본 보기</span>
          </button>
        </div>

        {/* 우측 액션: 링크 복사 */}
        <div className="pb-1.5">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#DDD8E6] bg-white hover:bg-[#F5F2F9] text-[#5A5468] hover:text-[#212529] transition-colors cursor-pointer"
            title="문서 링크 복사"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">복사됨</span>
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
            className="wiki-content prose max-w-none clear-both"
            dangerouslySetInnerHTML={{ __html: doc.htmlContent }}
          />
        </div>
      )}

      {/* 2. 역링크 탭 */}
      {activeTab === "backlinks" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded border border-[#DDD8E6] bg-[#FAFAFD] flex items-start gap-3">
            <Info className="w-4 h-4 text-[#58307E] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#5A5468] leading-relaxed">
              <strong className="text-[#212529] font-bold">{doc.title}</strong> 문서를 링크하거나 언급하고 있는 다른 위키 문서 목록입니다. (총 {doc.backlinks.length}개)
            </div>
          </div>

          {doc.backlinks.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#718096] border border-dashed border-[#DDD8E6] rounded">
              현재 이 문서를 참조하는 다른 문서가 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-[#EBE7F2] border border-[#DDD8E6] rounded bg-white overflow-hidden text-xs">
              {doc.backlinks.map((link) => (
                <div
                  key={link.slug}
                  className="p-3 hover:bg-[#F9F7FC] transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F1EDF6] text-[#4A2E6D] font-medium flex-shrink-0">
                      {link.category}
                    </span>
                    <Link
                      href={`/wiki/${link.slug}`}
                      className="font-bold text-[#212529] group-hover:text-[#553C9A] hover:underline truncate"
                    >
                      {link.title}
                    </Link>
                    {link.excerpt && (
                      <span className="text-[#718096] hidden sm:inline truncate max-w-md">
                        - {link.excerpt}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/wiki/${link.slug}`}
                    className="p-1 text-[#A0AEC0] group-hover:text-[#553C9A] flex-shrink-0"
                    title="문서로 이동"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
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
          <div className="flex items-center justify-between text-xs text-[#5A5468]">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#58307E]" />
              <span>읽기 전용 마크다운 소스 코드</span>
            </span>
            <button
              type="button"
              onClick={handleCopyRaw}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#DDD8E6] bg-white hover:bg-[#F5F2F9] text-[#5A5468] hover:text-[#212529] transition-colors"
            >
              {isRawCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>전체 복사</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded border border-[#343A40] bg-[#1E1E24] text-[#E2E8F0] p-4 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
            <pre className="whitespace-pre-wrap">{doc.rawMarkdown}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
