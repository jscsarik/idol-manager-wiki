import React from "react";
import Link from "next/link";
import { HelpCircle, Home, Search, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-wiki-border p-8 text-center shadow-sm space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Document Not Found
          </span>
          <h1 className="text-xl font-extrabold text-wiki-text">
            아직 작성되지 않은 문서입니다
          </h1>
          <p className="text-xs text-wiki-secondary leading-relaxed">
            요청하신 문서는 아직 위키에 작성되지 않았거나, 경로가 변경되었을 수 있습니다.
            위키 대문으로 이동하거나 검색을 통해 다른 문서를 찾아보세요.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>위키 홈으로</span>
          </Link>
          <Link
            href="/wiki"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-wiki-bg hover:bg-brand-50 text-wiki-text text-xs font-semibold border border-wiki-border transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>전체 문서 색인</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
