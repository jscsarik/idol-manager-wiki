import React from "react";
import Link from "next/link";
import {
  Download,
  BookOpen,
  ArrowRight,
  Clock,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import { getAllDocs } from "@/lib/wiki";
import { CATEGORIES } from "@/lib/categories";
import { StatusBadge } from "@/components/StatusBadge";

export default function HomePage() {
  const allDocs = getAllDocs();
  const recentDocs = allDocs.slice(0, 6);

  const DOWNLOAD_URL = "https://drive.google.com/file/d/1lHliyWBKve_eaAQuCoKWbbJf33lBydsm/view?usp=sharing";

  // 12단계 가이드 목록
  const guideSteps = [
    {
      num: "01",
      slug: "beginner/step-01-game-intro",
      title: "IDOL Manager는 어떤 게임인가?",
      desc: "10개 기획사 경쟁 구조, 최종 우승 목표 및 하루 단위 진행 방식",
    },
    {
      num: "02",
      slug: "beginner/step-02-new-game",
      title: "게임 실행과 새 게임 시작",
      desc: "2개 세이브 슬롯 운영, 10개 기획사 중 1곳 선택 및 10억 원 시작 자금",
    },
    {
      num: "03",
      slug: "beginner/step-03-founding-draft",
      title: "최초 창단 드래프트",
      desc: "창단 월요일 200명 중 160명을 선발하는 16라운드 스네이크 드래프트",
    },
    {
      num: "04",
      slug: "beginner/step-04-negotiation",
      title: "지명 선수 계약 협상",
      desc: "창단 화요일 상위 3명과의 1:1 개별 협상 및 4~16라운드 13명 자동 계약",
    },
    {
      num: "05",
      slug: "beginner/step-05-trainee-and-fa",
      title: "연습생 신청과 FA 영입",
      desc: "수·금 신청, 목·토 무작위 추첨, 연봉 0원의 자유계약 연습생과 FA 시장",
    },
    {
      num: "06",
      slug: "beginner/step-06-roster-and-opening",
      title: "최초 선수단 편성과 개막",
      desc: "다음 주 월요일 주전 1군(5명)과 2군(최대 11명) 확정, 리더 지정 및 수요일 개막",
    },
    {
      num: "07",
      slug: "beginner/step-07-weekly-routine",
      title: "매주 무엇을 해야 하나?",
      desc: "월(시장/선수단) → 화(휴식) → 수~일(경기 5연전) 주간 플레이 사이클",
    },
    {
      num: "08",
      slug: "beginner/step-08-attributes-and-growth",
      title: "아이돌 능력치와 선수 육성",
      desc: "공식 8대 능력치, CA/PA의 개념, 건강 상한 90 및 주간 성장과 부상 관리",
    },
    {
      num: "09",
      slug: "beginner/step-09-matches-and-contents",
      title: "경기는 어떻게 진행되는가?",
      desc: "30종 콘텐츠 60회 능력치 판정, 리더십 2회 보너스, 동점 데스매치 연장전",
    },
    {
      num: "10",
      slug: "beginner/step-10-midseason-management",
      title: "시즌 중 선수단과 기획사 운영",
      desc: "월요일 시장(FA·트레이드·방출), 매주 1,000만 원 후원금과 4주 급여 정산",
    },
    {
      num: "11",
      slug: "beginner/step-11-postseason-and-awards",
      title: "정규 시즌 종료와 포스트시즌",
      desc: "정규 24주 순위 결정, 동률 단판전, 상위 4팀 PO 3주 및 시즌 개인상 11개",
    },
    {
      num: "12",
      slug: "beginner/step-12-offseason-next-season",
      title: "비시즌과 다음 시즌 준비",
      desc: "비시즌 4주 재계약, 신규 70명 유입과 매년 3R 드래프트, 다음 시즌 순환",
    },
  ];

  // 게임 흐름 순서도
  const flowSteps = [
    { label: "1. 게임 시작", slug: "beginner/step-02-new-game" },
    { label: "2. 기획사 선택", slug: "beginner/step-02-new-game" },
    { label: "3. 창단 16R 드래프트", slug: "beginner/step-03-founding-draft" },
    { label: "4. 계약 및 연습생", slug: "beginner/step-04-negotiation" },
    { label: "5. 선수단 편성 (1군 5명)", slug: "beginner/step-06-roster-and-opening" },
    { label: "6. 정규 리그 (585경기)", slug: "beginner/step-07-weekly-routine" },
    { label: "7. 포스트시즌 (상위 4팀)", slug: "beginner/step-11-postseason-and-awards" },
    { label: "8. 비시즌 4주 (3R 드래프트)", slug: "beginner/step-12-offseason-next-season" },
    { label: "9. 다음 시즌 순환", slug: "beginner/step-12-offseason-next-season" },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. 나무위키 대문 상단 환영문 & 다운로드 박스 */}
      <section className="bg-white border border-[#DDD8E6] rounded p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="border-b border-[#EBE7F2] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F192C] tracking-tight">
              IDOL Manager Wiki에 오신 것을 환영합니다.
            </h1>
            <p className="text-xs sm:text-sm text-[#5A5468] mt-1">
              IDOL Manager는 아이돌 기획사를 경영하여 리그 우승에 도전하는 Windows PC용 시뮬레이션 게임입니다.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 bg-[#F1EDF6] text-[#4A2E6D] rounded font-mono">
              총 {allDocs.length}개 문서
            </span>
          </div>
        </div>

        {/* 최신 클라이언트 다운로드 안내 박스 */}
        <div className="p-3.5 bg-[#FAF9FD] border border-[#DDD8E6] rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-[#212529] flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[11px]">
                최신 배포판
              </span>
              <span>IDOL_Manager-0.30.3.zip</span>
            </div>
            <p className="text-[#5A5468]">
              Google Drive 공식 저장소를 통해 게임 클라이언트를 즉시 다운로드하여 플레이할 수 있습니다.
            </p>
          </div>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded transition-colors shadow-2xs whitespace-nowrap self-stretch sm:self-auto justify-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>클라이언트 다운로드 (v0.30.3)</span>
          </a>
        </div>

        {/* 2대 탐색 퀵 링크 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          <Link
            href="/wiki/beginner/step-01-game-intro"
            className="p-3 bg-[#F1EDF6] hover:bg-[#EBE5F3] border border-[#DDD8E6] rounded flex items-center justify-between font-bold text-[#3E205E] transition-colors"
          >
            <span>처음 시작하기: 12단계 플레이 가이드 읽기</span>
            <ArrowRight className="w-4 h-4 text-[#58307E]" />
          </Link>
          <Link
            href="/wiki"
            className="p-3 bg-[#FAFAFD] hover:bg-[#F3EFF8] border border-[#DDD8E6] rounded flex items-center justify-between font-bold text-[#212529] transition-colors"
          >
            <span>전체 위키 문서 색인 둘러보기</span>
            <BookOpen className="w-4 h-4 text-[#5A5468]" />
          </Link>
        </div>
      </section>

      {/* 2. 게임 진행 순서도 (화살표 연결 표) */}
      <section className="bg-white border border-[#DDD8E6] rounded p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="border-b border-[#EBE7F2] pb-2">
          <h2 className="text-sm sm:text-base font-bold text-[#1F192C]">
            게임 진행 순서도
          </h2>
          <p className="text-xs text-[#5A5468] mt-0.5">
            창단 주간부터 정규 리그, 포스트시즌, 비시즌 4주로 이어지는 게임의 순환 구조입니다. 단계를 누르면 해당 가이드로 이동합니다.
          </p>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="flex items-center min-w-[780px] justify-between gap-1 text-xs">
            {flowSteps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <Link
                  href={`/wiki/${step.slug}`}
                  className="px-2.5 py-2 rounded bg-[#F8F7FA] hover:bg-[#58307E] hover:text-white border border-[#DDD8E6] font-medium text-[#212529] transition-colors text-center flex-1 whitespace-nowrap"
                >
                  {step.label}
                </Link>
                {idx < flowSteps.length - 1 && (
                  <span className="text-[#A0AEC0] px-0.5 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 게임 플레이 순서별 12단계 가이드 (핵심 메인 영역) */}
      <section className="bg-white border border-[#DDD8E6] rounded p-5 shadow-2xs space-y-4">
        <div className="border-b border-[#EBE7F2] pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#1F192C]">
              플레이 순서별 12단계 입문 가이드
            </h2>
            <p className="text-xs text-[#5A5468] mt-0.5">
              처음 플레이하는 사용자가 게임 흐름을 직관적으로 따라갈 수 있도록 정리한 필수 안내서입니다.
            </p>
          </div>
          <Link
            href="/wiki/beginner/step-01-game-intro"
            className="text-xs text-[#553C9A] hover:underline font-bold"
          >
            1단계부터 읽기 →
          </Link>
        </div>

        {/* 12단계 위키 색인 테이블 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {guideSteps.map((step) => (
            <Link
              key={step.num}
              href={`/wiki/${step.slug}`}
              className="p-3 rounded border border-[#DDD8E6] bg-[#FAFAFD] hover:bg-[#F3EFF8] hover:border-[#B794F4] transition-all flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded bg-[#EBE7F2] text-[#4A2E6D] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-[#58307E] group-hover:text-white transition-colors">
                {step.num}
              </div>
              <div className="min-w-0 space-y-0.5 flex-1">
                <div className="font-bold text-[#212529] group-hover:text-[#553C9A] transition-colors truncate">
                  {step.title}
                </div>
                <p className="text-[#718096] text-[11px] leading-relaxed line-clamp-1">
                  {step.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. 분야별 위키 백과 색인 표 (기존 8개 카테고리) */}
      <section className="bg-white border border-[#DDD8E6] rounded p-5 shadow-2xs space-y-4">
        <div className="border-b border-[#EBE7F2] pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#1F192C]">
              분야별 위키 백과사전
            </h2>
            <p className="text-xs text-[#5A5468] mt-0.5">
              특정 시스템이나 규칙, 상세 수치와 공식이 궁금할 때 열람하는 위키 문서입니다.
            </p>
          </div>
          <Link
            href="/wiki"
            className="text-xs text-[#553C9A] hover:underline font-bold"
          >
            전체 문서 색인 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {CATEGORIES.filter((c) => c.id !== "beginner").map((category) => (
            <Link
              key={category.id}
              href={`/wiki#category-${category.id}`}
              className="p-3 rounded border border-[#DDD8E6] bg-[#FAFAFD] hover:bg-[#F5F2F9] transition-colors space-y-1 block"
            >
              <div className="font-bold text-[#2A1740] flex items-center justify-between">
                <span>{category.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#A0AEC0]" />
              </div>
              <p className="text-[11px] text-[#718096] line-clamp-2 leading-relaxed">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. 최근 변경된 문서 표 */}
      <section className="bg-white border border-[#DDD8E6] rounded p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="border-b border-[#EBE7F2] pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#58307E]" />
            <h2 className="text-sm sm:text-base font-bold text-[#1F192C]">
              최근 변경된 문서
            </h2>
          </div>
          <Link
            href="/wiki"
            className="text-xs text-[#553C9A] hover:underline font-medium"
          >
            전체 목록 보기
          </Link>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DDD8E6] bg-[#F1EDF6] text-[#2A1740]">
                <th className="py-2 px-3 font-semibold">문서명</th>
                <th className="py-2 px-3 font-semibold">분류</th>
                <th className="py-2 px-3 font-semibold text-center">상태</th>
                <th className="py-2 px-3 font-semibold text-right">수정일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE7F2]">
              {recentDocs.map((doc) => (
                <tr key={doc.slug} className="hover:bg-[#F9F7FC] transition-colors">
                  <td className="py-2 px-3 font-medium">
                    <Link
                      href={`/wiki/${doc.slug}`}
                      className="text-[#212529] hover:text-[#553C9A] hover:underline font-bold"
                    >
                      {doc.title}
                    </Link>
                  </td>
                  <td className="py-2 px-3 text-[#5A5468]">
                    {doc.category}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-[11px] text-[#718096]">
                    {doc.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. 위키 푸터 */}
      <footer className="border-t border-[#DDD8E6] pt-4 text-xs text-[#718096] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div>
          IDOL Manager 공식 게임 위키 백과사전 · 클라이언트: <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="text-[#553C9A] hover:underline font-bold">IDOL_Manager-0.30.3.zip</a>
        </div>
        <div>
          문서 검색: <kbd className="px-1.5 py-0.5 bg-white border border-[#DDD8E6] rounded text-[#212529]">Ctrl + K</kbd>
        </div>
      </footer>
    </main>
  );
}
