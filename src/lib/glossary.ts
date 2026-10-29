/**
 * IDOL Manager Wiki — 게임 용어 사전 및 자동 하이퍼링크 매핑 테이블
 *
 * 본문에서 해당 게임 용어가 등장하면 명시된 위키 문서 슬러그로 자동 연결됩니다.
 * 긴 용어를 먼저 매칭하기 위해 글자 수 내림차순으로 정렬하여 적용합니다.
 */

export interface GlossaryEntry {
  term: string;
  slug: string;
  anchor?: string;
  description?: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  // A. 게임 진행 및 일정 (Season)
  { term: "창단 준비 7일", slug: "season/founding-prep" },
  { term: "창단 준비", slug: "season/founding-prep" },
  { term: "31주 시즌", slug: "season/structure" },
  { term: "시즌 31주", slug: "season/structure" },
  { term: "시즌 구조", slug: "season/structure" },
  { term: "주간 일정", slug: "season/weekly-schedule" },
  { term: "월요일 시장", slug: "season/weekly-schedule" },
  { term: "정규 리그", slug: "season/regular-league" },
  { term: "585경기", slug: "season/regular-league" },
  { term: "더블헤더", slug: "season/regular-league" },
  { term: "순위 동률 결정전", slug: "season/tiebreaker" },
  { term: "동률 결정전", slug: "season/tiebreaker" },
  { term: "포스트시즌", slug: "season/postseason" },
  { term: "가을 무대", slug: "season/postseason" },
  { term: "챔피언 트로피", slug: "season/postseason" },
  { term: "비시즌", slug: "season/offseason" },
  { term: "스토브리그", slug: "season/offseason" },

  // B. 아이돌 시스템 (Idols)
  { term: "8대 능력치", slug: "idols/attributes" },
  { term: "현재 실력", slug: "idols/attributes" },
  { term: "CA", slug: "idols/attributes" },
  { term: "숨겨진 잠재력", slug: "idols/potential" },
  { term: "잠재력", slug: "idols/potential" },
  { term: "PA", slug: "idols/potential" },
  { term: "특별 유망주", slug: "draft/new-idols" },
  { term: "건강 상한 90", slug: "idols/health" },
  { term: "건강 상한", slug: "idols/health" },
  { term: "건강", slug: "idols/health" },
  { term: "연속 출전 피로", slug: "idols/fatigue-injury" },
  { term: "부상 위험 배수", slug: "idols/fatigue-injury" },
  { term: "피로", slug: "idols/fatigue-injury" },
  { term: "부상", slug: "idols/fatigue-injury" },
  { term: "주간 성장", slug: "idols/growth-aging" },
  { term: "추가 성장", slug: "idols/growth-aging" },
  { term: "노화 감소", slug: "idols/growth-aging" },
  { term: "노화", slug: "idols/growth-aging" },
  { term: "1군 프로", slug: "idols/squad-tiers" },
  { term: "2군 프로", slug: "idols/squad-tiers" },
  { term: "1군", slug: "idols/squad-tiers" },
  { term: "2군", slug: "idols/squad-tiers" },
  { term: "코치 힌트", slug: "idols/coach-evaluation" },
  { term: "코치 평가", slug: "idols/coach-evaluation" },
  { term: "코치", slug: "idols/coach-evaluation" },

  // C. 계약 및 영입 (Draft & Contracts)
  { term: "최초 창단 드래프트", slug: "draft/founding-draft" },
  { term: "창단 드래프트", slug: "draft/founding-draft" },
  { term: "16라운드 드래프트", slug: "draft/founding-draft" },
  { term: "스네이크 드래프트", slug: "draft/founding-draft" },
  { term: "연간 통합 드래프트", slug: "draft/annual-draft" },
  { term: "통합 드래프트", slug: "draft/annual-draft" },
  { term: "신규 인물 70명", slug: "draft/new-idols" },
  { term: "신규 유입", slug: "draft/new-idols" },
  { term: "기준 시장연봉", slug: "draft/contracts" },
  { term: "계약 협상", slug: "draft/contracts" },
  { term: "시장연봉", slug: "draft/contracts" },
  { term: "재계약", slug: "draft/contracts" },
  { term: "연습생 자유계약", slug: "draft/trainee-recruitment" },
  { term: "연습생 추첨", slug: "draft/trainee-recruitment" },
  { term: "연습생", slug: "draft/trainee-recruitment" },
  { term: "프로 데뷔", slug: "season/offseason" },
  { term: "FA 시장", slug: "draft/fa-market" },
  { term: "자유계약", slug: "draft/fa-market" },
  { term: "공개 입찰", slug: "draft/fa-market" },
  { term: "FA", slug: "draft/fa-market" },
  { term: "트레이드", slug: "draft/trade" },
  { term: "선수 맞교환", slug: "draft/trade" },
  { term: "방출 위약금", slug: "draft/release-retire" },
  { term: "중도 방출", slug: "draft/release-retire" },
  { term: "방출", slug: "draft/release-retire" },
  { term: "은퇴", slug: "draft/release-retire" },

  // D. 경기 시스템 (Matches)
  { term: "경기 판정 엔진", slug: "matches/engine" },
  { term: "판정 엔진", slug: "matches/engine" },
  { term: "60틱 판정", slug: "matches/engine" },
  { term: "60틱", slug: "matches/engine" },
  { term: "30종 정규 콘텐츠", slug: "matches/contents" },
  { term: "정규 콘텐츠", slug: "matches/contents" },
  { term: "주요 능력치", slug: "matches/contents" },
  { term: "리더십 추가 판정", slug: "matches/leadership-bonus" },
  { term: "리더 추가 판정", slug: "matches/leadership-bonus" },
  { term: "1군 리더", slug: "matches/leadership-bonus" },
  { term: "2군 리더", slug: "matches/leadership-bonus" },
  { term: "리더", slug: "matches/leadership-bonus" },
  { term: "동점 데스매치", slug: "matches/deathmatch" },
  { term: "데스매치", slug: "matches/deathmatch" },
  { term: "일요일 특별전", slug: "matches/special-matches" },
  { term: "특별전 6회", slug: "matches/special-matches" },
  { term: "특별전", slug: "matches/special-matches" },
  { term: "대학축제", slug: "matches/special-matches" },
  { term: "K-POP 페스티벌", slug: "matches/special-matches" },
  { term: "아이돌 체육대회", slug: "matches/special-matches" },

  // E. 기획사 경영 (Management)
  { term: "10개 기획사", slug: "management/agencies" },
  { term: "기획사", slug: "management/agencies" },
  { term: "기획사 재정", slug: "management/finance" },
  { term: "주간 후원금", slug: "management/finance" },
  { term: "시즌 종료 보너스", slug: "management/finance" },
  { term: "후원금", slug: "management/finance" },
  { term: "정기 급여", slug: "management/salary" },
  { term: "기본 훈련비", slug: "management/salary" },
  { term: "집중 훈련", slug: "idols/growth-aging" },
  { term: "급여 체불", slug: "management/debt-liquidation" },
  { term: "강제 선수 매각", slug: "management/debt-liquidation" },
  { term: "강제 매각", slug: "management/debt-liquidation" },
  { term: "채무", slug: "management/debt-liquidation" },
  { term: "AI 기획사", slug: "management/ai-operations" },

  // F. 기록 및 시상식 (Records)
  { term: "리그 순위표", slug: "records/standings" },
  { term: "리그 순위", slug: "records/standings" },
  { term: "승리 아이돌", slug: "records/idol-records" },
  { term: "패배 아이돌", slug: "records/idol-records" },
  { term: "개인 기록", slug: "records/idol-records" },
  { term: "통산 기록", slug: "records/idol-records" },
  { term: "시즌 개인 시상식", slug: "records/season-awards" },
  { term: "개인 시상식", slug: "records/season-awards" },
  { term: "신인왕", slug: "records/season-awards" },
  { term: "리더상", slug: "records/season-awards" },
  { term: "매력상", slug: "records/season-awards" },
  { term: "MVP", slug: "records/season-awards" },

  // G. 기본 정보 및 시스템 (Intro / FAQ)
  { term: "IDOL Manager", slug: "introduction/overview" },
  { term: "새 게임 시작", slug: "introduction/new-game" },
  { term: "초기 날짜 복구", slug: "faq/known-issues" },
  { term: "교착 상태", slug: "faq/known-issues" },
  { term: "개발 현황", slug: "faq/development-status" },
];

/**
 * 긴 용어를 우선적으로 매칭하기 위해 정렬된 단어 목록
 */
export const SORTED_GLOSSARY = [...GLOSSARY].sort((a, b) => b.term.length - a.term.length);
