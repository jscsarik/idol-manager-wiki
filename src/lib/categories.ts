export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "beginner",
    name: "처음 시작하기",
    description: "게임 진행 순서대로 배우는 초보자 전용 12단계 완전 가이드",
    icon: "Sparkles",
    order: 0,
  },
  {
    id: "introduction",
    name: "게임 소개",
    description: "IDOL Manager의 기본 개요, 특징, 설치 및 기본 조작법",
    icon: "Compass",
    order: 1,
  },
  {
    id: "season",
    name: "게임 진행 및 일정",
    description: "창단 준비 7일부터 31주 시즌 구조, 주간 일정 및 포스트시즌",
    icon: "Calendar",
    order: 2,
  },
  {
    id: "idols",
    name: "아이돌 시스템",
    description: "8개 능력치, CA/PA, 건강 및 피로, 성장과 노화, 1·2군 편성",
    icon: "Users",
    order: 3,
  },
  {
    id: "draft",
    name: "계약 및 영입",
    description: "창단 드래프트, 매년 통합 드래프트, FA 시장, 연습생 모집, 트레이드",
    icon: "UserCheck",
    order: 4,
  },
  {
    id: "matches",
    name: "경기 시스템",
    description: "정규 585경기 엔진, 30종 콘텐츠 판정 공식, 리더 판정, 특별전 6회",
    icon: "Trophy",
    order: 5,
  },
  {
    id: "management",
    name: "기획사 경영",
    description: "10개 기획사 재정, 후원금, 정기 급여, 채무와 강제 매각, AI 운영",
    icon: "Building2",
    order: 6,
  },
  {
    id: "records",
    name: "기록 및 시상식",
    description: "리그 순위, 승리·패배 아이돌, 콘텐츠별 기록, 시즌 개인상 11개",
    icon: "Award",
    order: 7,
  },
  {
    id: "faq",
    name: "FAQ 및 개발 현황",
    description: "자주 묻는 질문, 알려진 문제 및 교착 복구, 개발 로드맵",
    icon: "HelpCircle",
    order: 8,
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find((c) => c.name === name);
}
