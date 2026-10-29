# IDOL Manager Wiki — 공식 게임 위키 웹사이트

**IDOL Manager**의 공식 게임 시스템, 리그 일정, 드래프트, 능력치(CA/PA), 경기 판정 엔진 및 구단 경영 공략 정보를 제공하는 한국어 전문 위키 웹사이트입니다.

나무위키 스타일의 정보 중심 레이아웃과 게임 본연의 연보라색(#8B5CF6)·흰색 테마를 적용하였으며, 정적 Markdown(MDX) 파일 기반으로 구동되어 누구나 손쉽게 새로운 게임 문서를 추가하고 편집할 수 있습니다.

---

## 📌 주요 특징 및 기능

1. **문서 중심 위키 레이아웃**:
   - 나무위키 스타일의 정보상자(Infobox), 본문 헤딩 앵커, 반응형 표 가로 스크롤, 인용구 및 접기/펼치기 지원
2. **반응형 3단 레이아웃**:
   - **상단 헤더**: 로고, 검색창(Ctrl+K), 전체 문서 색인, 랜덤 문서, GitHub 링크
   - **좌측 사이드바 (250px)**: 8대 카테고리 트리 및 대표 문서 바로가기
   - **중앙 본문**: 경로 네비게이션(Breadcrumbs), 문서 제목, 확정/개발중/검증필요 상태 뱃지, 최종 수정일, URL 복사, 이전/다음 문서 내비게이션, 관련 문서 추천
   - **우측 목차 (220px)**: H2/H3 제목 자동 추출 Table of Contents (현재 스크롤 위치 하이라이트)
   - **모바일 반응형**: 슬라이드 드로어 메뉴, 모바일 검색 및 터치 최적화
3. **고성능 클라이언트 검색**:
   - 단축키 `Ctrl+K` 지원
   - 한글 부분 문자열 검색, 제목 완전/전방 일치 가중치 우선 정렬, 태그 및 설명 실시간 필터링
   - 키보드 위/아래 방향키 탐색, Enter 이동, ESC 닫기
4. **최신 게임 규칙 완전 반영**:
   - `C:\정승찬\IDOL_Manager`의 **2026-10-27 통합 마스터 기획서** 및 **v0.29.1(DB 18)** 최신 코드를 바탕으로 총 44개 이상의 상세 문서 수록
   - **창단 준비 7일** 및 최초 16R 스네이크 드래프트
   - **시즌 31주(217일)**: 정규 24주(585경기) + 포스트시즌 3주(3판 2선승) + 비시즌 4주
   - **건강 상한 90** 및 매년 나이 +1세마다 건강 -1 감소
   - **30종 정규 콘텐츠 전수 목록** 및 1인당 60틱 판정 공식
   - **월요일 연습생 자유계약 신청 및 1/N 균등 무작위 추첨**
   - **시즌 개인 시상식 11대 부문** (MVP, 신인왕, 리더상, 8대 매력상)
5. **SSG(정적 사이트 생성) 최적화**:
   - Next.js App Router의 `generateStaticParams`를 통해 모든 위키 문서를 빌드 시 정적 HTML로 사전 렌더링하여 초고속 로딩 보장

---

## 🛠️ 기술 스택

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, SSG)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), `@tailwindcss/typography`
- **Markdown Parser**: `gray-matter`, `remark`, `remark-gfm`, `remark-html`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting & Deployment**: [Vercel](https://vercel.com/)
- **Version Control**: [GitHub](https://github.com/)

---

## 📂 폴더 구조

```text
idol-manager-wiki/
├── content/
│   └── wiki/                         # 위키 마크다운 문서 저장소
│       ├── introduction/             # A. 게임 소개 (개요, 특징, 설치, 새게임, DB)
│       ├── season/                   # B. 게임 진행 (창단준비, 31주시즌, 주간일정, 정규리그, 동률전, 포스트시즌, 비시즌)
│       ├── idols/                    # C. 아이돌 시스템 (8대스탯, PA, 건강90, 피로부상, 성장노화, 로스터, 코치)
│       ├── draft/                    # D. 계약 및 영입 (창단드래프트, 통합드래프트, 신인70명, 연봉협상, 연습생추첨, FA, 트레이드, 은퇴)
│       ├── matches/                  # E. 경기 시스템 (판정엔진, 30종콘텐츠, 리더십추가, 데스매치, 특별전6회)
│       ├── management/               # F. 기획사 경영 (10개기획사, 재정, 급여, 채무강제매각, AI정책)
│       ├── records/                  # G. 기록 및 시상식 (순위산정, 개인기록, 시상식11개부문)
│       └── faq/                      # H. 기타 (FAQ, 교착복구, 개발현황)
├── src/
│   ├── app/
│   │   ├── api/search/route.ts       # 검색 인덱스 API
│   │   ├── wiki/
│   │   │   ├── page.tsx              # 전체 문서 색인 페이지
│   │   │   ├── random/page.tsx       # 랜덤 문서 리다이렉트
│   │   │   └── [...slug]/page.tsx    # 개별 위키 문서 상세 페이지
│   │   ├── layout.tsx                # 루트 레이아웃 & 메타데이터
│   │   ├── page.tsx                  # 위키 대문 (메인 대시보드)
│   │   └── not-found.tsx             # 친절한 위키 404 안내 페이지
│   ├── components/
│   │   ├── Header.tsx                # 상단 헤더 & 검색 모달 트리거
│   │   ├── Sidebar.tsx               # 좌측 카테고리 사이드바
│   │   ├── TableOfContents.tsx       # 우측 문서 목차 (스크롤 스파이)
│   │   ├── SearchModal.tsx           # Ctrl+K 실시간 검색 모달
│   │   ├── Breadcrumbs.tsx           # 상단 경로 & URL 복사
│   │   ├── Infobox.tsx               # 나무위키 스타일 정보상자
│   │   ├── StatusBadge.tsx           # 확정/개발중/검증필요 뱃지
│   │   └── MobileMenu.tsx            # 모바일 반응형 서랍 메뉴
│   └── lib/
│       ├── wiki.ts                   # 마크다운 파싱, TOC 추출, 메타데이터 처리
│       └── categories.ts             # 8대 카테고리 정의
├── public/                           # 정적 에셋
├── tailwind.config.ts                # 테마 및 컬러 팔레트 설정
├── tsconfig.json                     # 타입스크립트 설정
├── package.json
└── README.md
```

---

## 💻 로컬 개발 환경 실행 방법

### 사전 요구사항
- Node.js 18.17.0 이상 (Node.js 20 또는 24 권장)
- npm, pnpm 또는 yarn

### 1. 패키지 설치
```bash
npm install
```

### 2. 로컬 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하면 로컬 위키 사이트가 열립니다.

### 3. 프로덕션 빌드 테스트
```bash
npm run build
npm run start
```

---

## ✍️ 새로운 위키 문서 추가 방법

새로운 문서를 추가할 때 별도의 React 컴포넌트를 수정할 필요가 없습니다. `content/wiki/` 하위 적절한 카테고리 폴더에 `.md` 파일만 작성하면 자동으로 다음 영역에 반영됩니다:
- 전체 문서 색인 목록
- 좌측 사이드바 및 모바일 메뉴
- 실시간 검색 인덱스 (Ctrl+K)
- 최근 수정된 문서 목록
- 관련 문서 추천

### 마크다운 파일 Frontmatter 작성 규격 예시

```markdown
---
title: 문서 제목
description: 문서에 대한 한 줄 요약 설명
category: 카테고리 한글명 (예: 계약 및 영입)
categoryId: 카테고리 ID (예: draft)
tags: 태그1, 태그2, 태그3
updatedAt: 2026-10-30
status: confirmed # confirmed(확정 규칙), in-development(개발 중), verification-needed(검증 필요)
infobox: # 우측 상단 정보상자에 표시될 키-값 쌍 (선택사항)
  항목1: 내용1
  항목2: 내용2
related: # 관련 문서 슬러그 (선택사항)
  - draft/founding-draft
  - idols/attributes
---

## 1. 개요
여기에 본문 내용을 작성합니다.

## 2. 주요 규칙
- 목록 1
- 목록 2

### 2-1. 세부 사항
테이블이나 인용구도 지원됩니다:

| 구분 | 내용 |
| :--- | :--- |
| 항목 | 값 |
```

---

## 🚀 GitHub 저장소 업로드 및 Vercel 배포 가이드

### 1단계: GitHub 저장소 생성 및 푸시

1. [GitHub](https://github.com/new)에 접속하여 새 저장소를 생성합니다.
   - **Repository name**: `idol-manager-wiki`
   - **Public / Private**: 선호하는 공개 범위 선택
2. 로컬 프로젝트 폴더(`c:\정승찬\IDOL_Manager_wiki`)에서 Git을 초기화하고 원격 저장소로 푸시합니다:

```bash
git init
git add .
git commit -m "feat: Initial commit of IDOL Manager Wiki"
git branch -M main
git remote add origin https://github.com/<당신의-깃허브-아이디>/idol-manager-wiki.git
git push -u origin main
```

### 2단계: Vercel과 GitHub 연결하여 배포

1. [Vercel](https://vercel.com/)에 로그인합니다.
2. 대시보드 우측 상단의 **[Add New...]** $\rightarrow$ **[Project]**를 클릭합니다.
3. 방금 푸시한 `idol-manager-wiki` GitHub 저장소를 찾아 **[Import]**를 클릭합니다.
4. **Configure Project** 화면:
   - **Framework Preset**: `Next.js` (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `next build` (기본값)
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install` (기본값)
5. **[Deploy]** 버튼을 클릭합니다.
6. 약 1분 이내에 빌드가 완료되며, `https://idol-manager-wiki.vercel.app` 형태의 실제 운영 웹사이트 주소가 발급됩니다!
7. 이후 GitHub `main` 브랜치에 커밋을 푸시할 때마다 Vercel이 변경 사항을 감지하여 자동으로 새 버전을 무중단 배포합니다.

---

## 📜 라이선스 및 데이터 정책

- 본 위키 사이트는 Windows PC용 게임 **IDOL Manager**의 공식 게임 시스템을 설명하기 위해 비상업적 목적으로 제작되었습니다.
- 게임 내 인물의 실력, 나이, 잠재력, 연봉 등 모든 데이터는 가상으로 무작위 생성된 수치이며, 현실의 실존 인물 및 특정 엔터테인먼트사와는 무관합니다.
