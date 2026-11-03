---
title: 설치, 실행 및 세이브 파일 관리
description: IDOL Manager 게임 프로그램 설치 환경 요구사항, 실행 절차 및 2슬롯 세이브 관리·복구 가이드
category: 게임 소개
categoryId: introduction
tags: 설치, 실행, Python, 요구사항, 세이브파일, 2슬롯, 복구
updatedAt: 2026-11-03
status: confirmed
infobox:
  운영체제: Windows 10 / 11 (64-bit)
  필수 런타임: Python 3.12 이상 (3.13 권장)
  의존 패키지: PySide6 (GUI 프레임워크)
  실행 파일: 실행하기.bat / dist/.../IDOL_Manager.exe
  세이브 경로: "%LOCALAPPDATA%\\IDOL_Manager\\saves\\"
  세이브 슬롯: 2슬롯 독립 관리 및 단일 세이브 임포트 지원
related:
  - introduction/new-game
  - introduction/database
  - introduction/bgm-system
  - faq/known-issues
---

## 1. 공식 게임 클라이언트 다운로드

IDOL Manager의 공식 최신 배포판은 Google Drive 공식 저장소를 통해 바로 다운로드받으실 수 있습니다.

> 💾 **[IDOL Manager 공식 클라이언트 다운로드 (Google Drive)](https://drive.google.com/drive/folders/1F3S7lGbP9Ax34j_hxpuJsX614uT4v6p-)**
> 
> * **최신 버전**: v0.30.3
> * **파일 형식**: ZIP 압축 파일 (`IDOL_Manager-0.30.3.zip`)
> * **설치 방법**: ZIP 압축을 원하는 폴더에 푼 뒤 `실행하기.bat` 또는 `IDOL_Manager.exe`를 실행하세요.

---

## 2. 시스템 요구사양

- **운영체제**: Microsoft Windows 10 이상 (64-bit 전용)
- **CPU**: 인텔 코어 i3 / AMD 라이젠 3 이상
- **메모리**: 4GB RAM 이상
- **디스플레이 해상도**: 1280×720 이상 권장 (세로형 900×1600 모드 및 창 너비 1000px 이하 자동 최적화)
- **파이썬 런타임**: Python 3.12 이상 (Python 3.13 권장, 독립 실행형 EXE 사용 시 별도 설치 불필요)

---

## 3. 간편 실행 방법

가장 추천하는 실행 방식은 루트 디렉토리의 배치 스크립트를 더블클릭하는 것입니다.

```cmd
실행하기.bat
```

1. `실행하기.bat`를 실행하면 컴퓨터에 설치된 Python 3.12+ 버전을 자동으로 검색합니다.
2. 프로젝트 내부에 가상환경(`.venv`)이 없으면 자동으로 생성하고, `requirements.txt`에 명시된 PySide6 패키지를 인터넷에서 다운로드하여 설치합니다.
3. 모든 환경 점검이 끝나면 메인 게임 창이 자동으로 구동됩니다.

### 개발자 수동 실행 (PowerShell)
```powershell
# 1. 가상환경 생성 (Python 3.12 이상 지정)
python -m venv .venv

# 2. 가상환경 pip 업그레이드 및 필수 패키지 설치
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

# 3. 메인 게임 프로그램 실행
.\.venv\Scripts\python.exe main.py
```

### 독립 실행형 배포판 (EXE 패키지)
별도의 파이썬 설치 없이 즐길 수 있는 독립 실행형(PyInstaller) 패키지는 `dist/` 폴더 내에 제공됩니다.
- 최신 빌드: `dist/release_title/IDOL_Manager/IDOL_Manager.exe` 또는 `dist/release_start_menu/IDOL_Manager/IDOL_Manager.exe`
- **주의사항**: 독립 실행 파일 구동 시 `_internal` 폴더가 반드시 동일 경로에 유지되어야 하며, 폴더명을 임의로 변경하지 마세요.

---

## 4. 세이브 파일 및 사용자 데이터 저장 위치

IDOL Manager는 Windows 표준 AppData 디렉토리를 사용하여 사용자의 소중한 게임 데이터를 안전하게 보존합니다.

```text
%LOCALAPPDATA%\IDOL_Manager\
├── saves/
│   ├── idol_manager.sqlite3        (기본 세이브 DB)
│   ├── idol_manager_slot1.sqlite3  (슬롯 1 저장 파일)
│   └── idol_manager_slot2.sqlite3  (슬롯 2 저장 파일)
├── config/                         (사용자 설정 파일)
├── logs/                           (실행 로그)
└── cache/                          (인물 사진 캐시)
```

---

## 5. 시작 화면과 2슬롯 세이브 관리

0.29.0 이상 버전부터는 **2개 세이브 슬롯 관리 시스템**이 도입되어 서로 다른 기획사 플레이 데이터를 독립적으로 운영할 수 있습니다.

- **슬롯 1 / 슬롯 2 선택**: 타이틀 화면에서 원하는 슬롯을 선택하여 새 게임을 시작하거나 기존 플레이를 이어할 수 있습니다.
- **이전 단일 세이브 가져오기 (Import)**:
  - 구버전에서 플레이하던 단일 세이브 파일(`idol_manager.sqlite3`)이 있다면, 시작 화면에서 원하는 슬롯으로 안전하게 복사하여 이전할 수 있습니다.
  - 실행만으로 원본 파일을 덮어쓰거나 초기화하지 않으므로 데이터 손실 걱정이 없습니다.
- **비상 안전 복구 기능 (초기 날짜 복구)**:
  - 창단 준비 기간 중 드래프트나 선수단 편성을 마치지 않은 상태에서 수요일로 진행하여 교착 상태가 되었을 경우, 상단의 **[초기 날짜 복구]** 버튼을 통해 안전하게 SQLite 백업을 생성한 뒤 월요일 초기 상태로 되돌릴 수 있습니다. (자세한 내용은 [알려진 문제 및 교착 복구](faq/known-issues) 문서 참조)
