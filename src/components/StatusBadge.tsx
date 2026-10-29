import React from "react";
import { CheckCircle2, Clock, HelpCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "confirmed" | "in-development" | "verification-needed";
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  if (status === "confirmed") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
        title="게임 기획에서 확정된 공식 규칙입니다."
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        확정 규칙
      </span>
    );
  }

  if (status === "in-development") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 ${className}`}
        title="현재 게임 코드에 구현 및 개발 진행 중인 항목입니다."
      >
        <Clock className="w-3.5 h-3.5 text-indigo-600" />
        개발 중
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 ${className}`}
      title="기획 또는 시뮬레이션을 통해 추가 검증이 필요한 항목입니다."
    >
      <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
      검증 필요
    </span>
  );
}
