---
title: 설치 및 실행 방법
description: IDOL Manager 게임 프로그램 설치 환경 요구사항 및 실행 절차
category: 게임 소개
categoryId: introduction
tags: 설치, 실행, Python, 요구사항
updatedAt: 2026-10-29
status: confirmed
infobox:
  운영체제: Windows 10 / 11 (64-bit)
  필수 런타임: Python 3.12 이상 (3.13.3 권장)
  의존 패키지: PySide6 (GUI 프레임워크)
  실행 파일: 실행하기.bat / dist/.../IDOL_Manager.exe
  세이브 경로: "%LOCALAPPDATA%\\IDOL_Manager\\saves\\"
related:
  - introduction/new-game
  - introduction/database
  - faq/known-issues
---

## 1. 시스템 요구사양

- **운영체제**: Microsoft Windows 10 이상 (64-bit 전용)
- **CPU**: 인텔 코어 i3 / AMD 라이젠 3 이상
- **메모리**: 4GB RAM 이상
- **디스플레이 해상도**: 1280×720 이상 권장 (세로형 900×1600 모드 지원)
- **파이썬 런타임**: Python 3.12 이상 (Python 3.13 권장)

## 2. 간편 실행 (배치 파일 이용)

가장 추천하는 실행 방식은 루트 디렉토리의 배치 스크립트를 더블클릭하는 것입니다.

```cmd
실행하기.bat
```

1. `실행하기.bat`를 실행하면 컴퓨터에 설치된 Python 3.12+ 버전을 자동으로 검색합니다.
2. 프로젝트 내부에 가상환경(`.venv`)이 없으면 자동으로 생성하고, `requirements.txt`에 명시된 PySide6 패키지를 인터넷에서 다운로드하여 설치합니다.
3. 모든 환경 점검이 끝나면 메인 게임 창이 자동으로 구동됩니다.

## 3. 개발자 수동 실행 (PowerShell)

명령 프롬프트(CMD) 또는 PowerShell에서 직접 가상환경을 구성하고 실행할 수도 있습니다.

```powershell
# 1. 가상환경 생성 (Python 3.12 이상 지정)
python -m venv .venv

# 2. 가상환경 pip 업그레이드 및 필수 패키지 설치
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

# 3. 메인 게임 프로그램 실행
.\.venv\Scripts\python.exe main.py
```

## 4. 독립 실행형 배포판 (EXE 패키지)

별도의 파이썬 설치 없이 즐길 수 있는 독립 실행형(PyInstaller) 패키지는 `dist/` 폴더 내에 제공됩니다.

- **0.29.1 타이틀 UI 빌드**: `dist/release_title/IDOL_Manager/IDOL_Manager.exe`
- **0.29.0 빌드**: `dist/release_start_menu/IDOL_Manager/IDOL_Manager.exe`

> **주의사항**: 독립 실행 파일 구동 시 `_internal` 폴더가 반드시 동일 경로에 유지되어야 하며, 폴더명을 임의로 변경하지 마세요.

## 5. 세이브 파일 및 사용자 데이터 저장 위치

- **기본 세이브 파일**: `%LOCALAPPDATA%\IDOL_Manager\saves\idol_manager.sqlite3`
- **설정 파일**: `config/` (일정, 생성 밸런스 등)
- **오디오 BGM**: `assets/audio/bgm/` 또는 `%LOCALAPPDATA%\IDOL_Manager\user_assets\audio\`
- **로그 및 캐시**: `logs/` 및 `cache/`
