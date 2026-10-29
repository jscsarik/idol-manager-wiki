import React from "react";
import Link from "next/link";
import { Sparkles, Github, ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-wiki-border bg-white text-xs text-wiki-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 사이트 소개 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-wiki-text">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>IDOL Manager Wiki</span>
            </div>
            <p className="text-wiki-secondary leading-relaxed">
              IDOL Manager 공식 게임 정보 및 시스템 공략 위키입니다. 10개 기획사 경쟁 시뮬레이션의
              모든 규칙과 데이터를 투명하게 제공합니다.
            </p>
          </div>

          {/* 주요 카테고리 링크 */}
          <div className="space-y-2">
            <div className="font-semibold text-wiki-text text-xs uppercase tracking-wider">
              주요 게임 시스템
            </div>
            <ul className="space-y-1 text-wiki-secondary">
              <li>
                <Link href="/wiki/season/founding-prep" className="hover:text-brand-600 transition-colors">
                  창단 준비 7일 및 스네이크 드래프트
                </Link>
              </li>
              <li>
                <Link href="/wiki/season/structure" className="hover:text-brand-600 transition-colors">
                  31주(정규24·포스트3·비시즌4) 시즌 구조
                </Link>
              </li>
              <li>
                <Link href="/wiki/idols/health" className="hover:text-brand-600 transition-colors">
                  건강 상한 90 및 나이 감소 규칙
                </Link>
              </li>
              <li>
                <Link href="/wiki/matches/contents" className="hover:text-brand-600 transition-colors">
                  30종 정규 콘텐츠와 판정 공식
                </Link>
              </li>
            </ul>
          </div>

          {/* 저작권 및 안내 */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-wiki-text text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>저작권 및 데이터 안내</span>
            </div>
            <p className="text-[11px] text-wiki-muted leading-relaxed">
              본 게임 속 모든 인물의 나이, 능력치, 건강, 잠재력, 사건은 게임 내에서 무작위로 생성된
              가상 데이터이며 실제 인물 및 현실의 사건과는 무관합니다.
            </p>
            <div className="pt-2 text-[11px] text-wiki-muted">
              © 2026 IDOL Manager Wiki. Built with Next.js & Tailwind CSS.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
