/**
 * IDOL Manager Wiki 공통 사이트 설정
 * 다운로드 링크, 배포 폴더, 공식 버전 안내를 중앙에서 관리합니다.
 */

export const SITE_CONFIG = {
  name: "IDOL Manager",
  wikiName: "IDOL Manager Wiki",
  title: "IDOL Manager 공식 게임 위키",
  description: "나만의 아이돌 기획사를 운영하고, 리그 정상에 도전하세요. 처음 시작하는 방법부터 상세한 게임 규칙까지 한곳에서 확인하세요.",
  
  // 공식 다운로드 저장소 (Google Drive 폴더)
  downloadUrl: "https://drive.google.com/drive/folders/1F3S7lGbP9Ax34j_hxpuJsX614uT4v6p-",
  downloadText: "게임 다운로드",
  downloadSubText: "공식 배포 폴더 (Google Drive)",
  downloadNotice: "Google Drive 공식 배포 폴더를 통해 최신 클라이언트 압축 파일(ZIP)을 다운로드할 수 있습니다.",

  // GitHub 원격 저장소
  githubUrl: "https://github.com/jscsarik/idol-manager-wiki",
} as const;
