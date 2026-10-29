import React from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  GraduationCap,
  ChevronRight,
  Compass,
  Play,
  Users,
  Trophy,
  Building2,
  HelpCircle,
  Award,
  UserCheck,
  Search,
} from "lucide-react";
import { getAllDocs } from "@/lib/wiki";
import { CATEGORIES } from "@/lib/categories";
import { StatusBadge } from "@/components/StatusBadge";
import { BEGINNER_STEPS } from "@/components/Sidebar";

export default function HomePage() {
  const allDocs = getAllDocs();
  const recentDocs = allDocs.slice(0, 5);

  // 12단계 가이드 상세 메타데이터 (제목과 한 줄 설명)
  const guideSteps = [
    {
      num: "01",
      slug: "beginner/step-01-game-intro",
      title: "IDOL Manager는 어떤 게임인가?",
      desc: "아이돌 기획사 매니저가 되어 10개 구단 중 리그 우승을 노리는 경영 시뮬레이션의 전체 목표와 진행 방식",
    },
    {
      num: "02",
      slug: "beginner/step-02-new-game",
      title: "게임 실행과 새 게임 시작",
      desc: "2개 독립 세이브 슬롯의 역할, 10개 참가 기획사 중 1곳 선택 및 10억 원 시작 자금",
    },
    {
      num: "03",
      slug: "beginner/step-03-founding-draft",
      title: "최초 창단 드래프트",
      desc: "창단 첫날 월요일, 200명 후보 중 160명을 16라운드 스네이크 방식으로 공평하게 지명하는 법",
    },
    {
      num: "04",
      slug: "beginner/step-04-negotiation",
      title: "지명 선수 계약 협상",
      desc: "창단 화요일, 상위 1~3라운드 에이스 3명과의 1:1 개별 협상 요령과 하위 13명 자동 계약",
    },
    {
      num: "05",
      slug: "beginner/step-05-trainee-and-fa",
      title: "연습생 신청과 FA 영입",
      desc: "수·금요일 신청, 목·토요일 무작위 균등 추첨, 연봉 0원의 알짜 연습생과 미계약 FA 영입 일정",
    },
    {
      num: "06",
      slug: "beginner/step-06-roster-and-opening",
      title: "최초 선수단 편성과 개막",
      desc: "다음 주 월요일 주전 1군(5명)과 2군(최대 11명) 확정, 접전을 뒤집는 리더 지정 및 수요일 개막전",
    },
    {
      num: "07",
      slug: "beginner/step-07-weekly-routine",
      title: "매주 무엇을 해야 하나?",
      desc: "월요일(시장 및 건강 점검) → 화요일(휴식) → 수~일요일(5연전 경기)로 반복되는 주간 플레이 루틴",
    },
    {
      num: "08",
      slug: "beginner/step-08-attributes-and-growth",
      title: "아이돌 능력치와 선수 육성",
      desc: "8대 재능, 당장의 실력(CA)과 숨겨진 잠재력(PA), 건강 상한 90 및 피로·부상 관리의 쉬운 이해",
    },
    {
      num: "09",
      slug: "beginner/step-09-matches-and-contents",
      title: "경기는 어떻게 진행되는가?",
      desc: "음악방송, 예능, 광고 등에서 벌어지는 60회 능력치 판정, 리더십 보너스와 연장전 데스매치",
    },
    {
      num: "10",
      slug: "beginner/step-10-midseason-management",
      title: "시즌 중 선수단과 기획사 운영",
      desc: "시즌 중 트레이드와 FA 보강, 4주마다 나가는 정기 급여와 주간 후원금으로 흑자 경영 유지하기",
    },
    {
      num: "11",
      slug: "beginner/step-11-postseason-and-awards",
      title: "정규 시즌 종료와 포스트시즌",
      desc: "정규 24주 최종 순위 결정, 상위 4팀의 가을 플레이오프 토너먼트, 11개 부문 시즌 개인 시상식",
    },
    {
      num: "12",
      slug: "beginner/step-12-offseason-next-season",
      title: "비시즌과 다음 시즌 준비",
      desc: "비시즌 4주간의 재계약과 은퇴, 70명 신인 유입과 연간 3라운드 통합 드래프트, 다음 시즌의 순환",
    },
  ];

  // 게임 흐름 순서도 (클릭 시 이동)
  const flowSteps = [
    { label: "1. 게임 시작", slug: "beginner/step-02-new-game" },
    { label: "2. 기획사 선택", slug: "beginner/step-02-new-game" },
    { label: "3. 창단 드래프트", slug: "beginner/step-03-founding-draft" },
    { label: "4. 계약 및 영입", slug: "beginner/step-04-negotiation" },
    { label: "5. 선수단 구성", slug: "beginner/step-06-roster-and-opening" },
    { label: "6. 정규 리그", slug: "beginner/step-07-weekly-routine" },
    { label: "7. 포스트시즌", slug: "beginner/step-11-postseason-and-awards" },
    { label: "8. 비시즌", slug: "beginner/step-12-offseason-next-season" },
    { label: "9. 다음 시즌", slug: "beginner/step-12-offseason-next-season" },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. 상단 히어로: 사이트 소개 및 큰 2대 탐색 선택지 */}
      <section className="text-center space-y-6 pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>IDOL MANAGER OFFICIAL GAME WIKI</span>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-wiki-text tracking-tight">
            IDOL Manager <span className="text-brand-600">Wiki</span>
          </h1>
          <p className="text-base sm:text-lg text-wiki-secondary leading-relaxed font-normal">
            아이돌 기획사를 운영하고, 선수를 영입하고, 리그 우승에 도전하는 경영 시뮬레이션 게임의 공식 가이드입니다.
          </p>
        </div>

        {/* 핵심 2대 선택지 (크고 명확한 CTA 버튼) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
          <Link
            href="/wiki/beginner/step-01-game-intro"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base transition-all shadow-md hover:shadow-lg group"
          >
            <GraduationCap className="w-5 h-5 text-brand-200 group-hover:scale-110 transition-transform" />
            <span>처음부터 게임 배우기</span>
            <ArrowRight className="w-4 h-4 text-brand-200 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/wiki"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white hover:bg-brand-50/70 text-wiki-text hover:text-brand-700 font-extrabold text-base border-2 border-brand-200 transition-all shadow-xs"
          >
            <BookOpen className="w-5 h-5 text-brand-600" />
            <span>전체 위키 문서 보기</span>
          </Link>
        </div>
      </section>

      {/* 2. 두 번째 영역 — 게임은 이렇게 진행됩니다 (흐름도) */}
      <section className="rounded-2xl border border-wiki-border bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-wiki-border pb-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-wiki-text flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
            <span>게임은 이렇게 진행됩니다</span>
          </h2>
          <p className="text-xs sm:text-sm text-wiki-secondary mt-1">
            창단부터 리그 우승, 그리고 다음 시즌으로 이어지는 전체 게임의 기본 순서도입니다. 단계를 누르면 해당 가이드로 이동합니다.
          </p>
        </div>

        {/* 가로 스크롤 가능한 단계형 순서도 바 */}
        <div className="overflow-x-auto pb-2 pt-2">
          <div className="flex items-center min-w-[760px] justify-between gap-1 text-xs">
            {flowSteps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <Link
                  href={`/wiki/${step.slug}`}
                  className="px-3 py-2 rounded-xl bg-brand-50/70 hover:bg-brand-600 hover:text-white border border-brand-200/80 font-bold text-wiki-text transition-all text-center flex-1 shadow-2xs whitespace-nowrap"
                >
                  {step.label}
                </Link>
                {idx < flowSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-brand-300 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 세 번째 영역 — 게임 플레이 순서별 12단계 가이드 (핵심 메인 영역) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-brand-200 pb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 flex items-center gap-1.5 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>초보자 완전 정복</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-wiki-text">
              게임 플레이 순서별 12단계 가이드
            </h2>
          </div>
          <span className="text-xs text-wiki-secondary">
            누구나 1단계부터 따라 읽으면 게임을 마스터할 수 있습니다.
          </span>
        </div>

        {/* 12단계 단정한 타임라인 목록형 UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guideSteps.map((step) => (
            <Link
              key={step.num}
              href={`/wiki/${step.slug}`}
              className="p-5 rounded-2xl border border-wiki-border bg-white hover:border-brand-400 hover:bg-brand-50/30 transition-all shadow-xs hover:shadow-sm group flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700 font-extrabold text-base font-mono flex-shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                {step.num}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-wiki-text group-hover:text-brand-600 transition-colors truncate">
                    {step.title}
                  </h3>
                  <span className="text-xs font-semibold text-brand-600 flex items-center gap-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <span>읽기</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-wiki-secondary leading-relaxed line-clamp-2">
                  {step.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. 네 번째 영역 — 필요한 규칙 찾아보기 (기존 8개 위키 카테고리) */}
      <section className="rounded-2xl border border-wiki-border bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-wiki-border">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-wiki-text flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600" />
              <span>필요한 상세 규칙 찾아보기</span>
            </h2>
            <p className="text-xs sm:text-sm text-wiki-secondary mt-1">
              특정 시스템이나 계산 공식, 세부 규정이 궁금할 때 언제든 열람할 수 있는 위키 백과사전입니다.
            </p>
          </div>
          <Link
            href="/wiki"
            className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span>전체 문서</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.filter((c) => c.id !== "beginner").map((category) => (
            <Link
              key={category.id}
              href={`/wiki#category-${category.id}`}
              className="p-4 rounded-xl border border-wiki-border/80 bg-wiki-bg/40 hover:bg-brand-50/60 hover:border-brand-300 transition-all space-y-1.5 group"
            >
              <div className="font-extrabold text-xs sm:text-sm text-wiki-text group-hover:text-brand-600 transition-colors flex items-center justify-between">
                <span>{category.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-wiki-muted group-hover:text-brand-600" />
              </div>
              <p className="text-[11px] text-wiki-secondary line-clamp-2 leading-relaxed">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. 다섯 번째 영역 — 최근 수정된 문서 (5개 간결히 표시) */}
      <section className="rounded-2xl border border-wiki-border bg-white p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-wiki-border">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <h2 className="font-bold text-sm sm:text-base text-wiki-text">최근 수정된 문서</h2>
          </div>
          <Link
            href="/wiki"
            className="text-xs text-brand-600 hover:underline font-semibold"
          >
            전체 목록 보기 →
          </Link>
        </div>

        <div className="divide-y divide-wiki-border/60 text-xs">
          {recentDocs.map((doc) => (
            <div
              key={doc.slug}
              className="py-2.5 flex items-center justify-between gap-4 hover:bg-brand-50/30 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-semibold border border-brand-100 flex-shrink-0">
                  {doc.category}
                </span>
                <Link
                  href={`/wiki/${doc.slug}`}
                  className="font-bold text-wiki-text hover:text-brand-600 hover:underline truncate"
                >
                  {doc.title}
                </Link>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 text-wiki-muted text-[11px] font-mono">
                <StatusBadge status={doc.status} />
                <span className="hidden sm:inline">{doc.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 하단 보조 정보: 통계 및 검색 단축키 */}
      <footer className="pt-4 border-t border-wiki-border text-xs text-wiki-secondary flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <span>IDOL Manager 공식 게임 정보 및 입문 공략 위키 백과사전 (총 {allDocs.length}개 문서 수록)</span>
        </div>
        <div className="font-mono text-[11px] text-wiki-muted">
          <span>문서 검색 단축키: <kbd className="px-1.5 py-0.5 rounded bg-white border border-wiki-border text-wiki-text">Ctrl + K</kbd></span>
        </div>
      </footer>
    </main>
  );
}
