import React from "react";
import Link from "next/link";
import {
  Download,
  BookOpen,
  ArrowRight,
  Clock,
  Compass,
  Calendar,
  Users,
  UserCheck,
  Trophy,
  Building2,
  Award,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { getAllDocs } from "@/lib/wiki";
import { CATEGORIES } from "@/lib/categories";
import { SITE_CONFIG } from "@/lib/site-config";
import { StatusBadge } from "@/components/StatusBadge";

// 카테고리별 아이콘 매핑
const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Compass,
  Calendar,
  Users,
  UserCheck,
  Trophy,
  Building2,
  Award,
  HelpCircle,
};

export default function HomePage() {
  const allDocs = getAllDocs();
  // 최근 변경 문서 4개만 간결하게 표시
  const recentDocs = allDocs.slice(0, 4);

  // 첫 방문자 핵심 4단계 입문 가이드
  const beginnerSteps = [
    {
      num: "01",
      slug: "beginner/step-02-new-game",
      title: "기획사 선택",
      desc: "10개 기획사 중 1곳을 선택하고 10억 원의 시작 자금으로 경영을 시작합니다.",
    },
    {
      num: "02",
      slug: "beginner/step-03-founding-draft",
      title: "창단 드래프트",
      desc: "후보 200명 중 160명을 선발하는 16라운드 스네이크 드래프트를 진행합니다.",
    },
    {
      num: "03",
      slug: "beginner/step-04-negotiation",
      title: "계약과 영입",
      desc: "상위 지명자 개별 협상 및 정규 일정에 맞춘 연습생과 FA 선수를 영입합니다.",
    },
    {
      num: "04",
      slug: "beginner/step-06-roster-and-opening",
      title: "선수단 편성",
      desc: "주전 1군 5명과 2군을 최종 편성하고 리더를 임명하여 정규 개막에 나섭니다.",
    },
  ];

  // 32주 시즌 진행 구조 타임라인 (최신 0.35.0 / DB 25 기준 6개 구간)
  const seasonTimeline = [
    {
      step: "1단계",
      title: "시즌 준비",
      period: "1주",
      desc: "창단 및 개막 준비, 로스터 정비, 연습생 신청",
      slug: "season/founding-prep",
      badge: "개막 전야",
    },
    {
      step: "2단계",
      title: "정규 전반기",
      period: "12주",
      desc: "1~12주차 경기, 일요일 특별전 3회, 12주차 나이 +1",
      slug: "season/regular-league",
      badge: "정규 리그",
    },
    {
      step: "3단계",
      title: "중간 정비",
      period: "1주",
      desc: "전반기 결산, 휴식 및 로스터 재정비 주간",
      slug: "season/weekly-schedule",
      badge: "재정비",
    },
    {
      step: "4단계",
      title: "정규 후반기",
      period: "12주",
      desc: "13~24주차 경기, 특별전 3회, 24주차 나이 +1",
      slug: "season/regular-league",
      badge: "순위 경쟁",
    },
    {
      step: "5단계",
      title: "포스트시즌",
      period: "3주",
      desc: "상위 4개 팀 스텝래더 토너먼트 및 11대 시상식",
      slug: "season/postseason",
      badge: "가을 축제",
    },
    {
      step: "6단계",
      title: "비시즌",
      period: "3주",
      desc: "신규 70명 유입, 3라운드 통합 드래프트, FA 시장",
      slug: "season/offseason",
      badge: "전력 보강",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* =========================================================================
          A. Hero 영역: 깔끔한 공식 타이틀, 핵심 설명문, 명확한 3대 행동 버튼
          ========================================================================= */}
      <section className="bg-white border border-[#DDD8E6] rounded-xl p-6 sm:p-8 md:p-10 shadow-xs text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F192C] tracking-tight">
            IDOL Manager
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium text-[#4A2E6D] break-keep leading-relaxed">
            나만의 아이돌 기획사를 운영하고, 리그 정상에 도전하세요.
          </p>
          <p className="text-sm sm:text-base text-[#5A5468] break-keep leading-relaxed">
            처음 시작하는 방법부터 상세한 게임 규칙까지 한곳에서 확인하세요.
          </p>
        </div>

        {/* 3대 주요 행동 버튼 (1. 다운로드 가장 강조 / 2. 처음 시작하기 / 3. 전체 위키) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-xl mx-auto">
          {/* 1. 게임 다운로드 (가장 강조) */}
          <a
            href={SITE_CONFIG.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow group"
            title="공식 배포 폴더로 이동 (Google Drive)"
          >
            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>{SITE_CONFIG.downloadText}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
          </a>

          {/* 2. 처음 시작하기 (두 번째 강조) */}
          <Link
            href="/wiki/beginner/step-01-game-intro"
            className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-[#58307E] hover:bg-[#452464] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
          >
            <span>처음 시작하기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* 3. 전체 위키 보기 (보조 버튼) */}
          <Link
            href="/wiki"
            className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-white hover:bg-[#F3EFF8] text-[#4A2E6D] border border-[#DDD8E6] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#58307E]" />
            <span>전체 위키 ({allDocs.length})</span>
          </Link>
        </div>

        {/* 안전한 공식 다운로드 보조 안내 문구 */}
        <p className="text-xs text-[#718096]">
          {SITE_CONFIG.downloadNotice}
        </p>
      </section>

      {/* =========================================================================
          B. 첫 방문자 가이드: 핵심 입문 4단계 노출 + 전체 12단계 연결
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EBE7F2] pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F192C]">
              첫 방문자 빠른 시작 가이드
            </h2>
            <p className="text-sm text-[#5A5468] mt-1 break-keep">
              게임을 처음 접하셨다면 창단부터 첫 경기 출전까지 다음 핵심 4단계를 순서대로 따라오세요.
            </p>
          </div>
          <Link
            href="/wiki/beginner/step-01-game-intro"
            className="text-sm font-semibold text-[#58307E] hover:text-[#452464] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>전체 12단계 가이드 보기</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 핵심 4단계 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {beginnerSteps.map((step) => (
            <Link
              key={step.num}
              href={`/wiki/${step.slug}`}
              className="p-5 bg-white rounded-xl border border-[#DDD8E6] hover:border-[#9F7AEA] hover:shadow-xs transition-all flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-[#F1EDF6] text-[#4A2E6D] font-mono font-bold text-sm flex items-center justify-center group-hover:bg-[#58307E] group-hover:text-white transition-colors">
                    {step.num}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#58307E] transition-colors" />
                </div>
                <h3 className="text-base font-bold text-[#1F192C] group-hover:text-[#58307E] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5468] leading-relaxed break-keep">
                  {step.desc}
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-[#58307E] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>자세히 읽기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          C. 시즌 진행 안내: 반응형 타임라인 (32주 구조 6개 구간)
          ========================================================================= */}
      <section className="bg-white border border-[#DDD8E6] rounded-xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBE7F2] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#1F192C]">
                시즌 진행 구조 (총 32주)
              </h2>
              <span className="px-2 py-0.5 rounded bg-[#F1EDF6] text-[#4A2E6D] text-xs font-semibold">
                32주 체계
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5468] mt-1 break-keep">
              창단 준비부터 정규 전·후반기, 중간 정비, 포스트시즌과 비시즌으로 순환되는 6개 핵심 구간입니다.
            </p>
          </div>
          <Link
            href="/wiki/season/structure"
            className="text-xs sm:text-sm font-semibold text-[#58307E] hover:underline flex items-center gap-1"
          >
            <span>시즌 구조 상세 문서</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6구간 반응형 단계 카드 (가로스크롤 강요 없이 grid 형태로 유연하게 배치) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {seasonTimeline.map((item, idx) => (
            <Link
              key={item.step}
              href={`/wiki/${item.slug}`}
              className="p-4 rounded-lg border border-[#DDD8E6] bg-[#FAF9FD] hover:bg-[#F3EFF8] hover:border-[#B794F4] transition-all group flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#58307E]">
                      {item.step}
                    </span>
                    <span className="text-xs text-[#718096]">
                      · {item.period}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white border border-[#DDD8E6] text-[#4A2E6D]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#1F192C] group-hover:text-[#58307E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5A5468] leading-relaxed break-keep">
                  {item.desc}
                </p>
              </div>
              <div className="pt-1 text-[11px] font-semibold text-[#58307E] flex items-center gap-1 group-hover:underline">
                <span>규칙 확인하기</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* 32주 규정 안내 노트 */}
        <div className="p-3 bg-[#FAF9FD] border border-[#DDD8E6] rounded-lg text-xs text-[#5A5468] leading-relaxed break-keep">
          <strong className="text-[#321C4D]">안내:</strong> 최신 0.35.0(DB 25) 소스 기준으로 정규 12주차·24주차 나이 정산 및 중간 정비 1주가 포함된 32주 구조가 설계되었습니다. 구버전 클라이언트 배포판(0.30~0.34)의 경우 31주 구조로 진행될 수 있습니다.
        </div>
      </section>

      {/* =========================================================================
          D. 위키 카테고리: 8개 주요 카테고리 대표 링크 (필터 파라미터 /wiki?category= 로 연결)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBE7F2] pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F192C]">
              위키 백과사전 카테고리
            </h2>
            <p className="text-sm text-[#5A5468] mt-1 break-keep">
              특정 시스템이나 규칙, 상세 수치와 공식이 궁금할 때 원하는 분야를 선택하여 탐색하세요.
            </p>
          </div>
          <Link
            href="/wiki"
            className="text-sm font-semibold text-[#58307E] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>전체 문서 목록 ({allDocs.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8개 카테고리 그리드 (실제 /wiki?category= 로 연결) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CATEGORIES.filter((c) => c.id !== "beginner").map((category) => {
            const IconComponent = CATEGORY_ICON_MAP[category.icon] || BookOpen;
            const docCount = allDocs.filter((d) => d.categoryId === category.id).length;

            return (
              <Link
                key={category.id}
                href={`/wiki?category=${category.id}`}
                className="p-4 bg-white rounded-xl border border-[#DDD8E6] hover:border-[#9F7AEA] hover:bg-[#FAF9FD] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-[#F1EDF6] text-[#4A2E6D] flex items-center justify-center group-hover:bg-[#58307E] group-hover:text-white transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-[#718096]">
                      {docCount}개 문서
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1F192C] group-hover:text-[#58307E] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#5A5468] leading-relaxed break-keep">
                    {category.description}
                  </p>
                </div>
                <div className="pt-1 text-xs font-semibold text-[#58307E] flex items-center gap-1 group-hover:underline">
                  <span>문서 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          E. 최근 변경 문서: 간결한 4개 문서 요약 테이블
          ========================================================================= */}
      <section className="bg-white border border-[#DDD8E6] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="border-b border-[#EBE7F2] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#58307E]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#1F192C]">
              최근 갱신된 문서
            </h2>
          </div>
          <Link
            href="/wiki"
            className="text-xs sm:text-sm text-[#58307E] hover:underline font-semibold"
          >
            전체 문서 색인 보기 →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#DDD8E6] bg-[#FAF9FD] text-[#2A1740]">
                <th className="py-2.5 px-3.5 font-bold">문서 제목</th>
                <th className="py-2.5 px-3.5 font-bold">분류</th>
                <th className="py-2.5 px-3.5 font-bold text-center">상태</th>
                <th className="py-2.5 px-3.5 font-bold text-right">최근 수정일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE7F2]">
              {recentDocs.map((doc) => (
                <tr key={doc.slug} className="hover:bg-[#F9F7FC] transition-colors">
                  <td className="py-2.5 px-3.5 font-semibold">
                    <Link
                      href={`/wiki/${doc.slug}`}
                      className="text-[#1F192C] hover:text-[#58307E] hover:underline font-bold"
                    >
                      {doc.title}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3.5 text-[#5A5468]">
                    {doc.category}
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="py-2.5 px-3.5 text-right font-mono text-xs text-[#718096]">
                    {doc.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          Footer 영역
          ========================================================================= */}
      <footer className="border-t border-[#DDD8E6] pt-6 pb-4 text-xs sm:text-sm text-[#718096] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          IDOL Manager 공식 게임 위키 · <a href={SITE_CONFIG.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-[#58307E] hover:underline font-bold">공식 Google Drive 배포처</a>
        </div>
        <div className="flex items-center gap-2">
          <span>빠른 검색:</span>
          <kbd className="px-2 py-0.5 bg-white border border-[#DDD8E6] rounded text-[#212529] font-mono text-xs">
            Ctrl + K
          </kbd>
        </div>
      </footer>
    </main>
  );
}
