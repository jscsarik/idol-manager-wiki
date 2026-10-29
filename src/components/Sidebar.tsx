"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Calendar,
  Users,
  UserCheck,
  Trophy,
  Building2,
  Award,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Calendar,
  Users,
  UserCheck,
  Trophy,
  Building2,
  Award,
  HelpCircle,
};

// 각 카테고리별 주요 문서 매핑 (정적 목록)
export const SIDEBAR_NAV = [
  {
    categoryId: "introduction",
    items: [
      { slug: "introduction/overview", title: "게임 소개 및 개요" },
      { slug: "introduction/features", title: "핵심 게임 특징" },
      { slug: "introduction/installation", title: "설치 및 실행 방법" },
      { slug: "introduction/new-game", title: "새 게임 시작" },
      { slug: "introduction/database", title: "인물·이미지 DB" },
    ],
  },
  {
    categoryId: "season",
    items: [
      { slug: "season/founding-prep", title: "창단 준비 7일" },
      { slug: "season/structure", title: "시즌 31주 구조" },
      { slug: "season/weekly-schedule", title: "주간 요일별 일정" },
      { slug: "season/regular-league", title: "정규 리그 585경기" },
      { slug: "season/tiebreaker", title: "순위 동률 단판 결정전" },
      { slug: "season/postseason", title: "포스트시즌 3주" },
      { slug: "season/offseason", title: "비시즌 4주 진행" },
    ],
  },
  {
    categoryId: "idols",
    items: [
      { slug: "idols/attributes", title: "8대 능력치 및 CA" },
      { slug: "idols/potential", title: "숨겨진 잠재력 (PA)" },
      { slug: "idols/health", title: "건강 상한 90 및 나이 감소" },
      { slug: "idols/fatigue-injury", title: "피로 및 부상 위험" },
      { slug: "idols/growth-aging", title: "주간 성장과 노화" },
      { slug: "idols/squad-tiers", title: "1군·2군·연습생 체계" },
      { slug: "idols/coach-evaluation", title: "코치 정성 평가" },
    ],
  },
  {
    categoryId: "draft",
    items: [
      { slug: "draft/founding-draft", title: "최초 창단 16R 드래프트" },
      { slug: "draft/annual-draft", title: "매년 통합 3R 드래프트" },
      { slug: "draft/new-idols", title: "신규 유입 70명 & 특별유망주" },
      { slug: "draft/contracts", title: "시장연봉 및 계약 협상" },
      { slug: "draft/trainee-recruitment", title: "월요일 연습생 자유추첨" },
      { slug: "draft/fa-market", title: "FA 공개 경쟁 입찰" },
      { slug: "draft/trade", title: "선수 맞교환 트레이드" },
      { slug: "draft/release-retire", title: "방출 위약금 및 은퇴" },
    ],
  },
  {
    categoryId: "matches",
    items: [
      { slug: "matches/engine", title: "정규 경기 판정 엔진" },
      { slug: "matches/contents", title: "30종 정규 콘텐츠 목록" },
      { slug: "matches/leadership-bonus", title: "리더십 추가 판정" },
      { slug: "matches/deathmatch", title: "동점 데스매치" },
      { slug: "matches/special-matches", title: "일요일 특별전 6회" },
    ],
  },
  {
    categoryId: "management",
    items: [
      { slug: "management/agencies", title: "10개 참가 기획사" },
      { slug: "management/finance", title: "기획사 재정 & 후원금" },
      { slug: "management/salary", title: "정기 급여 및 훈련비" },
      { slug: "management/debt-liquidation", title: "채무 및 강제 매각" },
      { slug: "management/ai-operations", title: "AI 기획사 운영 정책" },
    ],
  },
  {
    categoryId: "records",
    items: [
      { slug: "records/standings", title: "정규 순위 산정 방식" },
      { slug: "records/idol-records", title: "선수 개인 기록 집계" },
      { slug: "records/season-awards", title: "시즌 개인상 11개" },
    ],
  },
  {
    categoryId: "faq",
    items: [
      { slug: "faq/frequently-asked", title: "자주 묻는 질문 (FAQ)" },
      { slug: "faq/known-issues", title: "알려진 문제 & 복구" },
      { slug: "faq/development-status", title: "개발 로드맵 & 버전" },
    ],
  },
];

export function Sidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    introduction: true,
    season: true,
    idols: true,
    draft: true,
    matches: true,
    management: true,
    records: true,
    faq: true,
  });

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <aside
      className={`w-64 flex-shrink-0 select-none pb-12 ${className}`}
      aria-label="위키 목차 사이드바"
    >
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 space-y-4">
        {/* 상단 퀵 링크 */}
        <div className="bg-white rounded-xl border border-wiki-border p-3 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-wiki-muted px-2 mb-2">
            위키 바로가기
          </div>
          <div className="space-y-0.5">
            <Link
              href="/"
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                pathname === "/"
                  ? "bg-brand-500 text-white shadow-xs"
                  : "text-wiki-text hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>위키 대문 (홈)</span>
            </Link>
            <Link
              href="/wiki"
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                pathname === "/wiki"
                  ? "bg-brand-500 text-white shadow-xs"
                  : "text-wiki-text hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>모든 문서 색인</span>
            </Link>
          </div>
        </div>

        {/* 카테고리 트리 */}
        <div className="bg-white rounded-xl border border-wiki-border p-3 shadow-xs space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-wiki-muted px-2">
            게임 시스템 분류
          </div>

          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Compass;
            const isOpen = openCategories[cat.id] ?? false;
            const navGroup = SIDEBAR_NAV.find((g) => g.categoryId === cat.id);

            return (
              <div key={cat.id} className="space-y-1">
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold text-wiki-text hover:bg-brand-50 hover:text-brand-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-brand-500" />
                    <span>{cat.name}</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-wiki-muted transition-transform duration-200 ${
                      isOpen ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </button>

                {isOpen && navGroup && (
                  <div className="pl-6 pr-1 space-y-0.5 border-l-2 border-brand-100 ml-3 py-1">
                    {navGroup.items.map((item) => {
                      const isActive = pathname === `/wiki/${item.slug}`;
                      return (
                        <Link
                          key={item.slug}
                          href={`/wiki/${item.slug}`}
                          className={`block py-1 px-2 rounded text-xs transition-colors truncate ${
                            isActive
                              ? "bg-brand-50 text-brand-700 font-bold border-l-2 border-brand-500 -ml-[2px]"
                              : "text-wiki-secondary hover:text-brand-600 hover:bg-wiki-bg/80"
                          }`}
                          title={item.title}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 하단 버전 정보 카드 */}
        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-3 text-xs text-wiki-secondary">
          <div className="font-bold text-brand-900 text-xs flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            IDOL Manager v0.29.1
          </div>
          <p className="text-[11px] text-brand-700/80 leading-relaxed">
            최신 확정 마스터 기획서(2026-10-27) 및 최신 배포 코드를 반영한 공식 위키입니다.
          </p>
        </div>
      </div>
    </aside>
  );
}
