import React from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Trophy,
  Building2,
  FileText,
  Search,
  Shuffle,
  Info,
  CheckCircle2,
} from "lucide-react";
import { getAllDocs } from "@/lib/wiki";
import { CATEGORIES } from "@/lib/categories";
import { StatusBadge } from "@/components/StatusBadge";

export default function HomePage() {
  const allDocs = getAllDocs();
  const recentDocs = allDocs.slice(0, 10);

  // 카테고리별 문서 그룹화
  const docsByCategory = CATEGORIES.map((cat) => {
    const docs = allDocs.filter((d) => d.categoryId === cat.id);
    return {
      ...cat,
      docs,
    };
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* 1. 나무위키 스타일 대문 상단 환영 박스 */}
      <section className="rounded-2xl border border-brand-300 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-brand-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>IDOL MANAGER OFFICIAL ENCYCLOPEDIA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-wiki-text tracking-tight">
              IDOL Manager <span className="text-brand-600">Wiki</span> 대문
            </h1>
            <p className="text-xs sm:text-sm text-wiki-secondary leading-relaxed max-w-2xl">
              <strong>IDOL Manager Wiki</strong>에 오신 것을 환영합니다! 10개 기획사, 200명 드래프트, 31주 정규 시즌, 30종 콘텐츠 경기 판정 등 게임 내 모든 시스템과 공략 정보를 다루는 위키 백과사전입니다. 본문 내 링크를 클릭해 관련 문서를 자유롭게 탐색해 보세요.
            </p>
          </div>

          {/* 위키 현황 통계 박스 */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto flex-shrink-0 bg-brand-50/60 p-4 rounded-xl border border-brand-200/80 text-center text-xs">
            <div className="px-3">
              <div className="text-lg sm:text-xl font-extrabold text-brand-700 font-mono">
                {allDocs.length}
              </div>
              <div className="text-[11px] text-wiki-secondary mt-0.5 font-medium">수록 문서</div>
            </div>
            <div className="px-3 border-x border-brand-200">
              <div className="text-lg sm:text-xl font-extrabold text-brand-700 font-mono">
                {CATEGORIES.length}
              </div>
              <div className="text-[11px] text-wiki-secondary mt-0.5 font-medium">분류 항목</div>
            </div>
            <div className="px-3">
              <div className="text-lg sm:text-xl font-extrabold text-emerald-600 font-mono flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                100%
              </div>
              <div className="text-[11px] text-wiki-secondary mt-0.5 font-medium">규칙 검증</div>
            </div>
          </div>
        </div>

        {/* 대문 빠른 내비게이션 바 */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-wiki-text flex items-center gap-1 text-brand-800">
              <Compass className="w-3.5 h-3.5 text-brand-600" />
              빠른 이동:
            </span>
            <Link
              href="/wiki/season/founding-prep"
              className="px-2.5 py-1 rounded-md bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium transition-colors"
            >
              창단 준비 7일
            </Link>
            <Link
              href="/wiki/season/structure"
              className="px-2.5 py-1 rounded-md bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium transition-colors"
            >
              시즌 31주 구조
            </Link>
            <Link
              href="/wiki/idols/attributes"
              className="px-2.5 py-1 rounded-md bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium transition-colors"
            >
              아이돌 8대 능력치
            </Link>
            <Link
              href="/wiki/matches/engine"
              className="px-2.5 py-1 rounded-md bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium transition-colors"
            >
              30종 콘텐츠 경기 판정
            </Link>
            <Link
              href="/wiki/draft/trainee-recruitment"
              className="px-2.5 py-1 rounded-md bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium transition-colors"
            >
              연습생 영입 추첨
            </Link>
            <Link
              href="/wiki/management/finance"
              className="px-2.5 py-1 rounded-md bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium transition-colors"
            >
              기획사 재정 및 급여
            </Link>
          </div>

          <Link
            href="/wiki/random"
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors shadow-2xs ml-auto"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>랜덤 문서 열기</span>
          </Link>
        </div>
      </section>

      {/* 2. 나무위키식 주요 포털 색인 표 (Portal Index Table) */}
      <section className="rounded-2xl border border-wiki-border bg-white overflow-hidden shadow-xs">
        <div className="bg-brand-600 text-white px-5 py-3 font-bold text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-200" />
            <span>IDOL Manager 분야별 위키 포털 색인</span>
          </div>
          <Link
            href="/wiki"
            className="text-xs text-brand-200 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>전체 문서 목록</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-wiki-border text-xs">
          {/* 포털 1: 기본 & 시즌 */}
          <div className="p-4 space-y-3">
            <div className="font-bold text-brand-800 pb-1.5 border-b border-brand-100 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-600" />
              <span>시즌 및 일정</span>
            </div>
            <ul className="space-y-1.5 text-wiki-text">
              <li>
                <Link href="/wiki/season/founding-prep" className="hover:text-brand-600 hover:underline">
                  창단 준비 7일 일정
                </Link>
              </li>
              <li>
                <Link href="/wiki/season/structure" className="hover:text-brand-600 hover:underline">
                  시즌 31주 전체 구조
                </Link>
              </li>
              <li>
                <Link href="/wiki/season/regular-season" className="hover:text-brand-600 hover:underline">
                  정규 리그 24주 (585경기)
                </Link>
              </li>
              <li>
                <Link href="/wiki/season/postseason" className="hover:text-brand-600 hover:underline">
                  포스트시즌 (상위 4팀 PO)
                </Link>
              </li>
              <li>
                <Link href="/wiki/season/offseason" className="hover:text-brand-600 hover:underline">
                  비시즌 4주 절차
                </Link>
              </li>
            </ul>
          </div>

          {/* 포털 2: 아이돌 육성 */}
          <div className="p-4 space-y-3">
            <div className="font-bold text-brand-800 pb-1.5 border-b border-brand-100 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-600" />
              <span>아이돌 육성 & 관리</span>
            </div>
            <ul className="space-y-1.5 text-wiki-text">
              <li>
                <Link href="/wiki/idols/attributes" className="hover:text-brand-600 hover:underline">
                  8대 능력치 및 CA / PA
                </Link>
              </li>
              <li>
                <Link href="/wiki/idols/condition" className="hover:text-brand-600 hover:underline">
                  건강, 피로도 및 부상
                </Link>
              </li>
              <li>
                <Link href="/wiki/idols/growth-aging" className="hover:text-brand-600 hover:underline">
                  주간 성장 및 나이별 노화
                </Link>
              </li>
              <li>
                <Link href="/wiki/idols/roster" className="hover:text-brand-600 hover:underline">
                  1군(5명) / 2군(11명) 로스터
                </Link>
              </li>
              <li>
                <Link href="/wiki/idols/leadership" className="hover:text-brand-600 hover:underline">
                  리더십 특성 및 팀 버프
                </Link>
              </li>
            </ul>
          </div>

          {/* 포털 3: 경기 판정 엔진 */}
          <div className="p-4 space-y-3">
            <div className="font-bold text-brand-800 pb-1.5 border-b border-brand-100 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-brand-600" />
              <span>경기 및 콘텐츠</span>
            </div>
            <ul className="space-y-1.5 text-wiki-text">
              <li>
                <Link href="/wiki/matches/engine" className="hover:text-brand-600 hover:underline">
                  경기 판정 엔진 원리
                </Link>
              </li>
              <li>
                <Link href="/wiki/matches/contents" className="hover:text-brand-600 hover:underline">
                  30종 방송 콘텐츠 목록
                </Link>
              </li>
              <li>
                <Link href="/wiki/matches/deathmatch" className="hover:text-brand-600 hover:underline">
                  데스매치 연장전 룰
                </Link>
              </li>
              <li>
                <Link href="/wiki/matches/special-matches" className="hover:text-brand-600 hover:underline">
                  특별전 (올스타전, 컵 대회)
                </Link>
              </li>
              <li>
                <Link href="/wiki/matches/live-concert" className="hover:text-brand-600 hover:underline">
                  콘서트 및 이벤트 수익
                </Link>
              </li>
            </ul>
          </div>

          {/* 포털 4: 기획사 & 재정 */}
          <div className="p-4 space-y-3">
            <div className="font-bold text-brand-800 pb-1.5 border-b border-brand-100 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-brand-600" />
              <span>기획사 및 운영</span>
            </div>
            <ul className="space-y-1.5 text-wiki-text">
              <li>
                <Link href="/wiki/agencies/ten-agencies" className="hover:text-brand-600 hover:underline">
                  10대 공식 기획사 프로필
                </Link>
              </li>
              <li>
                <Link href="/wiki/management/finance" className="hover:text-brand-600 hover:underline">
                  재정, 후원금 및 주간 손익
                </Link>
              </li>
              <li>
                <Link href="/wiki/management/contracts" className="hover:text-brand-600 hover:underline">
                  4주 급여 지급 및 채무 파산
                </Link>
              </li>
              <li>
                <Link href="/wiki/draft/trade" className="hover:text-brand-600 hover:underline">
                  선수 트레이드 및 방출
                </Link>
              </li>
              <li>
                <Link href="/wiki/records/season-awards" className="hover:text-brand-600 hover:underline">
                  시즌 개인상 11개 및 MVP
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. 최근 변경 문서 표 (나무위키 스타일 최근 변경 테이블) */}
      <section className="rounded-2xl border border-wiki-border bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-wiki-border">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <h2 className="font-bold text-sm sm:text-base text-wiki-text">최근 변경 문서</h2>
          </div>
          <span className="text-xs text-wiki-secondary">
            총 {allDocs.length}개 문서 수록 중
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-wiki-border bg-brand-50/40 text-wiki-secondary">
                <th className="py-2.5 px-3 font-semibold w-1/2">문서명</th>
                <th className="py-2.5 px-3 font-semibold">분류</th>
                <th className="py-2.5 px-3 font-semibold text-center">상태</th>
                <th className="py-2.5 px-3 font-semibold text-right">최종 수정일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wiki-border/60">
              {recentDocs.map((doc) => (
                <tr key={doc.slug} className="hover:bg-brand-50/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium">
                    <Link
                      href={`/wiki/${doc.slug}`}
                      className="text-wiki-text hover:text-brand-600 hover:underline font-bold"
                    >
                      {doc.title}
                    </Link>
                    {doc.description && (
                      <span className="text-wiki-secondary ml-2 font-normal hidden sm:inline-block text-[11px] truncate max-w-xs">
                        - {doc.description}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-wiki-secondary">
                    <Link
                      href={`/wiki#category-${doc.categoryId}`}
                      className="hover:underline hover:text-brand-600 text-[11px]"
                    >
                      {doc.category}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[11px] text-wiki-muted">
                    {doc.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. 분류별 전체 문서 색인 트리 */}
      <section className="rounded-2xl border border-wiki-border bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-wiki-border">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-600" />
            <h2 className="font-bold text-sm sm:text-base text-wiki-text">분류별 전체 문서 색인</h2>
          </div>
          <span className="text-xs text-brand-600 font-medium">
            전체 {CATEGORIES.length}개 분류
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docsByCategory.map((category) => (
            <div
              key={category.id}
              id={`category-${category.id}`}
              className="rounded-xl border border-brand-100 bg-brand-50/20 p-4 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-brand-100">
                <span className="font-bold text-xs text-brand-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  {category.name}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white text-brand-700 font-mono border border-brand-100">
                  {category.docs.length}개 문서
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {category.docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/wiki/${doc.slug}`}
                    className="text-xs px-2.5 py-1 rounded-md bg-white border border-wiki-border text-wiki-text hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50/50 transition-all font-medium"
                  >
                    {doc.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 위키 탐색 팁 안내 */}
      <section className="rounded-xl border border-brand-200 bg-brand-50/40 p-4 text-xs text-wiki-secondary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-brand-600 flex-shrink-0" />
          <span>
            <strong>팁:</strong> 문서 본문에서 밑줄이 그어진 게임 용어(예: <code>창단 준비</code>, <code>31주 시즌</code>, <code>8대 능력치</code> 등)를 클릭하면 관련 문서로 즉시 이동합니다.
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-wiki-muted flex-shrink-0">
          <span>문서 검색 단축키: <kbd className="px-1.5 py-0.5 rounded bg-white border border-wiki-border">Ctrl + K</kbd></span>
        </div>
      </section>
    </main>
  );
}
