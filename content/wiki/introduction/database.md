---
title: 인물·이미지 데이터베이스
description: 아이돌 사진, 기획사 로고 등록 방법 및 데이터 관리 원칙
category: 게임 소개
categoryId: introduction
tags: 데이터베이스, 사진, 로고, 에셋, 이미지
updatedAt: 2026-10-27
status: confirmed
infobox:
  아이돌 사진 경로: assets/idols/
  기획사 로고 경로: assets/agencies/
  사용자 추가 경로: "%LOCALAPPDATA%\\IDOL_Manager\\user_assets\\"
  지원 확장자: .jpg, .png, .webp
  목표 인물 수: 최초 800명 이상 (확장 가능)
related:
  - introduction/overview
  - introduction/new-game
---

## 1. 인물 이미지 인식 원칙

IDOL Manager는 사진 파일의 파일명을 기반으로 인물의 기본 이름을 자동 매핑합니다.

- **폴더 경로**: `assets/idols/` 또는 `%LOCALAPPDATA%\IDOL_Manager\user_assets\idols/`
- **파일 명명 규칙**:
  - `아이돌A.jpg`, `아이돌B.png`, `아이돌C.webp`
  - 동명이인이 존재할 경우 `이름__그룹명.jpg` 또는 `이름__식별자.png` 형태로 저장하면 중복 오류 없이 구분됩니다.
- 게임 엔진은 내부적으로 모든 인물에게 고유 UUID/ID를 부여하므로, 이적, 개명, 세이브 로드 후에도 모든 개인 기록과 통산 데이터가 영구 보존됩니다.

## 2. 기획사 로고

- **폴더 경로**: `assets/agencies/`
- **파일명 예시**: `SM.png`, `JYP.png`, `YG.png`, `HYBE.png` 등
- 10개 기획사의 로고 이미지는 화면 상단, 순위표, 드래프트 픽창, 경기 대결 화면에 실시간으로 표시됩니다.

## 3. 저작권 및 공개 배포 주의사항

- 본 게임은 개인용 로컬 시뮬레이션으로 설계되었습니다.
- 사용자가 직접 추가한 연예인 사진, 기획사 상표 로고, BGM 음원은 개인 PC에서 즐길 수 있으나, **공식 배포 빌드나 공개 웹사이트에는 저작권 및 퍼블리시티권이 확인되지 않은 실존 인물 사진이나 상표를 포함하지 않습니다.**
- 위키 웹사이트 역시 실존 인물의 초상권을 존중하여 자체 제작한 그래픽, 시스템 설명, UI 스크린샷만을 활용합니다.
