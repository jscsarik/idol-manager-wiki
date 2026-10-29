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
  BookOpen,
  Home,
  GraduationCap,
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

// 12단계 초보자 가이드 목록
export const BEGINNER_STEPS = [
  { step: "01", slug: "beginner/step-01-game-intro", title: "01. 게임 소개" },
  { step: "02", slug: "beginner/step-02-new-game", title: "02. 새 게임 시작" },
  { step: "03", slug: "beginner/step-03-founding-draft", title: "03. 창단 드래프트" },
  { step: "04", slug: "beginner/step-04-negotiation", title: "04. 계약 협상" },
  { step: "05", slug: "beginner/step-05-trainee-and-fa", title: "05. 연습생 영입" },
  { step: "06", slug: "beginner/step-06-roster-and-opening", title: "06. 선수단 편성" },
  { step: "07", slug: "beginner/step-07-weekly-routine", title: "07. 주간 운영" },
  { step: "08", slug: "beginner/step-08-attributes-and-growth", title: "08. 아이돌 육성" },
  { step: "09", slug: "beginner/step-09-matches-and-contents", title: "09. 경기" },
  { step: "10", slug: "beginner/step-10-midseason-management", title: "10. 기획사 운영" },
  { step: "11", slug: "beginner/step-11-postseason-and-awards", title: "11. 포스트시즌" },
  { step: "12", slug: "beginner/step-12-offseason-next-season", title: "12. 다음 시즌" },
];

// 기존 8개 일반 위키 카테고리별 주요 문서 매핑
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
      { slug: "draft/trainee-recruitment", title: "연습생 추첨 영입" },
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
    season: false,
    idols: false,
    draft: false,
    matches: false,
    management: false,
    records: false,
    faq: false,
  });

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <aside
      className={`w-60 flex-shrink-0 select-none pb-12 ${className}`}
      aria-label="위키 사이드바"
    >
      <div className="sticky top-18 max-h-[calc(100vh-5rem)] overflow-y-auto pr-1 space-y-3 text-xs">
        {/* 상단 1: 빠른 메뉴 */}
        <div className="bg-white border border-[#DDD8E6] rounded p-2.5 shadow-2xs space-y-1">
          <Link
            href="/"
            className={`flex items-center gap-2 px-2 py-1.5 rounded transition-colors ${
              pathname === "/"
                ? "bg-[#58307E] text-white font-bold"
                : "text-[#212529] hover:bg-[#F3EFF8] hover:text-[#58307E]"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>대문 (홈)</span>
          </Link>
          <Link
            href="/wiki"
            className={`flex items-center gap-2 px-2 py-1.5 rounded transition-colors ${
              pathname === "/wiki"
                ? "bg-[#58307E] text-white font-bold"
                : "text-[#212529] hover:bg-[#F3EFF8] hover:text-[#58307E]"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>전체 문서 색인</span>
          </Link>
        </div>

        {/* 상단 2: [처음 시작하기] 12단계 가이드 */}
        <div className="bg-white border border-[#DDD8E6] rounded p-2.5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#EBE7F2] px-1 font-bold text-[#2A1740]">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#58307E]" />
              <span>플레이 순서 가이드</span>
            </span>
            <span className="text-[10px] text-[#553C9A] bg-[#F1EDF6] px-1.5 py-0.2 rounded font-mono">
              12단계
            </span>
          </div>

          <nav className="space-y-0.5">
            {BEGINNER_STEPS.map((item) => {
              const href = `/wiki/${item.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item.slug}
                  href={href}
                  className={`block px-2 py-1.5 rounded transition-colors truncate ${
                    isActive
                      ? "bg-[#58307E] text-white font-bold"
                      : "text-[#4A5568] hover:bg-[#F5F2F9] hover:text-[#212529]"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 하단: [전체 위키 백과] 8개 카테고리 */}
        <div className="bg-white border border-[#DDD8E6] rounded p-2.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#EBE7F2] px-1 font-bold text-[#5A5468]">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>분야별 문서</span>
            </span>
            <span className="text-[10px] font-mono text-[#A0AEC0]">8개 분류</span>
          </div>

          <div className="space-y-0.5 pt-1">
            {CATEGORIES.filter((c) => c.id !== "beginner").map((cat) => {
              const Icon = iconMap[cat.icon] || Compass;
              const isOpen = openCategories[cat.id] ?? false;
              const navGroup = SIDEBAR_NAV.find((g) => g.categoryId === cat.id);

              return (
                <div key={cat.id} className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded text-[#212529] hover:bg-[#F5F2F9] hover:text-[#58307E] transition-colors font-medium"
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#58307E]" />
                      <span>{cat.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#A0AEC0] transition-transform duration-150 ${
                        isOpen ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>

                  {isOpen && navGroup && (
                    <div className="pl-3 py-0.5 space-y-0.5 border-l-2 border-[#EBE7F2] ml-2.5">
                      {navGroup.items.map((item) => {
                        const href = `/wiki/${item.slug}`;
                        const isActive = pathname === href;

                        return (
                          <Link
                            key={item.slug}
                            href={href}
                            className={`block px-2 py-1 rounded text-[11px] truncate transition-colors ${
                              isActive
                                ? "text-[#58307E] font-bold bg-[#F3EFF8]"
                                : "text-[#718096] hover:text-[#212529] hover:bg-[#F8F7FA]"
                            }`}
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
        </div>
      </div>
    </aside>
  );
}
