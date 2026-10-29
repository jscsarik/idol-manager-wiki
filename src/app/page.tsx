import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Play,
  Calendar,
  Users,
  Trophy,
  Award,
  Building2,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
} from "lucide-react";
import { getAllDocs } from "@/lib/wiki";
import { CATEGORIES } from "@/lib/categories";
import { StatusBadge } from "@/components/StatusBadge";

export default function HomePage() {
  const allDocs = getAllDocs();
  const recentDocs = allDocs.slice(0, 6);

  // 주요 시스템 바로가기 카드
  const quickCards = [
    {
      title: "게임 시작하기",
      desc: "설치, PySide6 실행 및 2슬롯 저장 세이브 관리",
      href: "/wiki/introduction/installation",
      icon: Play,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "창단 준비 7일",
      desc: "최초 16R 드래프트, 상위 3R 계약 협상, 연습생 추첨",
      href: "/wiki/season/founding-prep",
      icon: Users,
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "아이돌 육성 & 성장",
      desc: "8개 능력치, CA/PA 잠재력, 주간 성장 및 노화",
      href: "/wiki/idols/growth-aging",
      icon: Zap,
      color: "from-fuchsia-500 to-pink-600",
    },
    {
      title: "경기 판정 엔진",
      desc: "30종 콘텐츠별 주요/보조 판정, 리더십 보너스",
      href: "/wiki/matches/engine",
      icon: Trophy,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "시즌 31주 구조",
      desc: "정규 24주(585경기) + 포스트시즌 3주 + 비시즌 4주",
      href: "/wiki/season/structure",
      icon: Calendar,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "FA 및 트레이드",
      desc: "공개 입찰, 프로 맞교환 거래, 방출 위약금",
      href: "/wiki/draft/trade",
      icon: Users,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "기획사 재정 & 급여",
      desc: "초기 10억, 주간 후원금, 4주 급여, 채무와 강제매각",
      href: "/wiki/management/finance",
      icon: Building2,
      color: "from-purple-500 to-indigo-700",
    },
    {
      title: "개인 기록 & 시상식",
      desc: "승리·패배 아이돌, 시즌 개인상 11개 및 트로피",
      href: "/wiki/records/season-awards",
      icon: Award,
      color: "from-rose-500 to-pink-700",
    },
  ];

  // 초보자 가이드 8단계
  const beginnerSteps = [
    { step: 1, title: "게임 설치 및 실행", desc: "Python 3.12+ 가상환경 또는 실행하기.bat로 시작" },
    { step: 2, title: "새 게임 생성", desc: "10개 기획사 중 본인이 운영할 1개 기획사 선택" },
    { step: 3, title: "창단 드래프트", desc: "후보 200명 중 16라운드 스네이크 방식으로 160명 선발" },
    { step: 4, title: "선수 계약 협상", desc: "1~3라운드 지명자 개별 협상, 4~16라운드 3,000만 원 자동 계약" },
    { step: 5, title: "연습생 영입", desc: "창단 준비 수·금요일 및 매주 월요일 최대 2명 자유계약 추첨 신청" },
    { step: 6, title: "선수단 편성 & 리더", desc: "1군 5명, 2군 11명 편성 및 1군/2군 리더 지정" },
    { step: 7, title: "정규 리그 개막", desc: "수~일 정규 585경기 치르며 상대 맞춤 출전자 배치" },
    { step: 8, title: "포스트시즌 & 비시즌", desc: "상위 4팀 3판 2선승제 플레이오프 및 챔피언 트로피 도전" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 대문 히어로 배너 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 text-white p-8 sm:p-12 shadow-xl border border-brand-700/50">
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -top-12 w-64 h-64 bg-fuchsia-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/30 border border-brand-400/40 text-brand-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>IDOL Manager 공식 가이드 & 규칙 데이터베이스</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            IDOL Manager <span className="text-brand-300">Wiki</span>
          </h1>

          <p className="text-sm sm:text-base text-brand-100/90 leading-relaxed font-normal">
            10개 기획사가 치열하게 경쟁하는 Windows PC용 아이돌 기획사 경영 시뮬레이션
            <strong> IDOL Manager</strong>의 공식 시스템 및 완벽 공략 위키입니다.
            드래프트, 육성, 경기 판정, 리그 대진, 재정 규칙을 투명하게 확인하세요.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/wiki/season/founding-prep"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-md shadow-brand-950/30 transition-all hover:-translate-y-0.5"
            >
              <span>창단 가이드 읽기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/wiki"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-colors"
            >
              <span>전체 문서 둘러보기</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 게임 핵심 정보 및 소개 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-wiki-border p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-brand-700 font-bold text-lg pb-2 border-b border-wiki-border">
            <Info className="w-5 h-5 text-brand-600" />
            <h2>게임 소개: IDOL Manager란?</h2>
          </div>
          <p className="text-wiki-text text-sm leading-relaxed">
            <strong>IDOL Manager</strong>는 축구의 Football Manager(FM)나 야구의 OOTP처럼
            플레이어가 10개 기획사 중 한 곳의 대표가 되어 가상의 아이돌을 영입, 육성하고
            리그 경기와 포스트시즌에서 승리하여 챔피언 트로피를 차지하는
            <strong> PC 싱글플레이 경영 시뮬레이션 게임</strong>입니다.
          </p>
          <p className="text-wiki-text text-sm leading-relaxed">
            화려한 캐릭터 연출보다는 방대한 통계 데이터, 세밀한 8대 능력치 및 잠재력(PA),
            일정 피로도와 부상 위험, 정기 급여와 채무 청산, 스네이크 드래프트와 FA 공개 입찰 등
            깊이 있는 경영 메커니즘을 텍스트와 표 중심의 높은 가독성으로 구현했습니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-wiki-bg border border-wiki-border text-center">
              <div className="text-xs text-wiki-secondary">참가 기획사</div>
              <div className="text-lg font-bold text-brand-700 mt-0.5">10개 구단</div>
            </div>
            <div className="p-3 rounded-xl bg-wiki-bg border border-wiki-border text-center">
              <div className="text-xs text-wiki-secondary">한 시즌 구조</div>
              <div className="text-lg font-bold text-brand-700 mt-0.5">31주 (217일)</div>
            </div>
            <div className="p-3 rounded-xl bg-wiki-bg border border-wiki-border text-center">
              <div className="text-xs text-wiki-secondary">정규 경기 수</div>
              <div className="text-lg font-bold text-brand-700 mt-0.5">총 585경기</div>
            </div>
            <div className="p-3 rounded-xl bg-wiki-bg border border-wiki-border text-center">
              <div className="text-xs text-wiki-secondary">선수단 구성</div>
              <div className="text-lg font-bold text-brand-700 mt-0.5">1군 5 / 2군 11</div>
            </div>
          </div>
        </div>

        {/* 게임 사양 정보상자 */}
        <div className="bg-white rounded-2xl border border-wiki-border p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-brand-700 font-bold text-base pb-2 border-b border-wiki-border">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <h3>게임 기본 사양 및 정보</h3>
          </div>
          <table className="w-full text-xs">
            <tbody className="divide-y divide-wiki-border/60">
              <tr>
                <th className="py-2 text-left font-semibold text-wiki-secondary w-28">게임명</th>
                <td className="py-2 text-wiki-text font-bold">IDOL Manager</td>
              </tr>
              <tr>
                <th className="py-2 text-left font-semibold text-wiki-secondary">장르</th>
                <td className="py-2 text-wiki-text">아이돌 기획사 경영 시뮬레이션</td>
              </tr>
              <tr>
                <th className="py-2 text-left font-semibold text-wiki-secondary">플랫폼</th>
                <td className="py-2 text-wiki-text">Windows PC (로컬 전용)</td>
              </tr>
              <tr>
                <th className="py-2 text-left font-semibold text-wiki-secondary">개발 언어</th>
                <td className="py-2 text-wiki-text font-mono">Python 3.12+ (3.13)</td>
              </tr>
              <tr>
                <th className="py-2 text-left font-semibold text-wiki-secondary">UI 프레임워크</th>
                <td className="py-2 text-wiki-text font-mono">PySide6 (Qt)</td>
              </tr>
              <tr>
                <th className="py-2 text-left font-semibold text-wiki-secondary">데이터베이스</th>
                <td className="py-2 text-wiki-text font-mono">SQLite3 (WAL 트랜잭션)</td>
              </tr>
              <tr>
                <th className="py-2 text-left font-semibold text-wiki-secondary">최신 안정 버전</th>
                <td className="py-2 text-emerald-600 font-bold">v0.29.1 (2026-10)</td>
              </tr>
            </tbody>
          </table>
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-snug">
            ※ 다운로드 링크는 공식 배포 완료 후 별도 제공되며, 게임 속 모든 인물 데이터는 가상 생성값입니다.
          </div>
        </div>
      </section>

      {/* 주요 시스템 바로가기 카드 그리드 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-wiki-border">
          <div className="flex items-center gap-2 font-bold text-lg text-wiki-text">
            <Zap className="w-5 h-5 text-brand-600" />
            <h2>핵심 게임 시스템 바로가기</h2>
          </div>
          <Link
            href="/wiki"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            전체 문서 색인 보기 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative bg-white rounded-2xl border border-wiki-border p-5 shadow-xs hover:shadow-md hover:border-brand-300 transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-wiki-text group-hover:text-brand-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-wiki-secondary mt-1.5 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">
                  <span>자세히 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 처음 시작하는 플레이어를 위한 8단계 가이드 */}
      <section className="bg-white rounded-2xl border border-wiki-border p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1 pb-3 border-b border-wiki-border">
          <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
            START GUIDE
          </div>
          <h2 className="text-xl font-bold text-wiki-text">
            처음 시작하는 플레이어를 위한 핵심 입문 가이드
          </h2>
          <p className="text-xs text-wiki-secondary">
            창단부터 정규 리그 데뷔까지 거치게 되는 8가지 필수 절차입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {beginnerSteps.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl border border-wiki-border/80 bg-wiki-bg/60 relative hover:border-brand-300 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center mb-2.5 shadow-xs">
                {item.step}
              </div>
              <h4 className="font-bold text-sm text-wiki-text mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-wiki-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 최근 수정된 문서 및 카테고리 둘러보기 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 수정 문서 */}
        <div className="bg-white rounded-2xl border border-wiki-border p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-wiki-border">
            <div className="flex items-center gap-2 font-bold text-base text-wiki-text">
              <Clock className="w-4 h-4 text-brand-600" />
              <h3>최근 업데이트된 위키 문서</h3>
            </div>
            <span className="text-xs text-wiki-muted">메타데이터 기준</span>
          </div>

          <div className="divide-y divide-wiki-border/60">
            {recentDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/wiki/${doc.slug}`}
                className="py-3 flex items-center justify-between group hover:bg-brand-50/40 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-wiki-text group-hover:text-brand-600 transition-colors truncate">
                      {doc.title}
                    </span>
                    <StatusBadge status={doc.status} />
                  </div>
                  <p className="text-xs text-wiki-secondary truncate mt-0.5">
                    {doc.description || `${doc.category} 문서`}
                  </p>
                </div>
                <div className="text-[11px] text-wiki-muted flex-shrink-0 text-right">
                  <span>{doc.updatedAt}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 카테고리별 요약 */}
        <div className="bg-white rounded-2xl border border-wiki-border p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-wiki-border">
            <div className="flex items-center gap-2 font-bold text-base text-wiki-text">
              <FileText className="w-4 h-4 text-brand-600" />
              <h3>카테고리별 문서 탐색</h3>
            </div>
            <Link
              href="/wiki"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              전체 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => {
              const catDocs = allDocs.filter((d) => d.categoryId === cat.id);
              return (
                <Link
                  key={cat.id}
                  href={`/wiki?category=${cat.id}`}
                  className="p-3 rounded-xl border border-wiki-border hover:border-brand-300 hover:bg-brand-50/30 transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-wiki-text group-hover:text-brand-600 transition-colors">
                      {cat.name}
                    </div>
                    <div className="text-[11px] text-wiki-muted truncate mt-0.5">
                      {cat.description}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100 flex-shrink-0 ml-2">
                    {catDocs.length}개
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
