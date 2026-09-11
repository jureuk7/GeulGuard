# 검증 기록

2026-09-11 로컬 Next.js 프로덕션 빌드, http://localhost:43187.

- `pnpm build`: 정적 홈 페이지 빌드 통과.
- `pnpm typecheck`: 통과.
- Biome format 검사: 7개 소스/설정 파일 통과.
- 브라우저 입력창에 테스트 문장 입력 후 비우기: 빈 값 확인.
- 설치 요청문 복사: 성공 메시지 확인.
- FAQ: 클릭 및 Enter로 펼침 확인.
- 다운로드 링크: 리디렉션 후 HTTP 200, PKG 614006 bytes 확인.
- 375/768/1280px 반응형 확인. 모바일 grid min-content로 생긴 3px 넘침을 수정.
- 브라우저 오류/경고 로그 없음.
- Frontend Fundamentals 독립 리뷰: 1차 Warning 1(간격 토큰),
  2차 Warning 1(음수 CSS 변수 문법), 3차 Critical/Warnings/Suggestions 모두 0.
- 스타일 스캔의 링크 밑줄·짧은 큰 제목·텍스트 화살표는 목적이 있는 표현으로 유지.

전체 페이지 캡처에 도구의 스티칭 오류가 있어 뷰포트별 캡처로 대체했다.
검증용 캡처는 `/tmp/geulguard-landing-qa/final-*.png`에 있다.
공개 배포·도메인 연결·Lighthouse 성능 점수 측정은 수행하지 않았다.
이 웹 입력창의 테스트는 macOS 글가드 IME 호환성 검증이 아니다.

독립 시각 검토: PASS. 375/768/1280px 주요 콘텐츠와 FAQ를 검토했고
잘림·겹침·한글 가독성의 차단 문제는 발견되지 않았다. 모바일 푸터 자체는
최종 캡처에 포함되지 않아 해당 부분의 독립 이미지 검토는 미완료다.

## 중앙 히어로·반응형 키보드 수정
- 프로덕션 빌드와 TypeScript 통과.
- 모든 SVG stroke-width=1.5, body 배경 rgb(255,255,255) 확인.
- Q 키캡 클릭 후 Q 입력 표시, 실제 w 키 이벤트 후 W 입력 표시 확인.
- 입력창에서 asdf 입력이 그대로 보존되고 마지막 F 키에 반응함을 확인.
- 키를 놓은 뒤 눌림 상태 0개. 브라우저 오류/경고 없음.
- 모바일 375px에서 scrollWidth=375 확인.
- 캡처: /tmp/geulguard-landing-qa/keyboard-*.png.

## Motion 적용
- motion/react 13.2.0 사용, 프로덕션 빌드·타입 검사 통과.
- 첫 진입 6회 샘플에서 히어로 각 요소 opacity가 순서대로 0에서 1로 진행됨을 관찰.
- 진입 완료 후 opacity=1, transform=none으로 복귀 확인.
- Q 클릭 반응, 입력창 asdf 보존, 복사 및 FAQ 재검증. 브라우저 오류/경고 없음.
- 모바일 scrollWidth=375, viewport=375.
- reduced-motion은 코드 분기 구현; OS 환경을 변경한 실측은 하지 않음.
- 캡처 /tmp/geulguard-landing-qa/motion-*.png.

## 배포 기록·설정 팝업
- GitHub CHANGELOG.md 실제 요청 후 0.4.0~0.1.0 버전 내용 렌더링 확인.
- Next 빌드 출력의 ISR revalidate=1h 확인.
- 카라비너 코드 프리뷰 및 복사 성공 상태 확인.
- ESC 닫기 후 배포 기록 버튼으로 focus 복귀 확인.
- 모바일375px에서 팝업 좌17/우358, 문서 scrollWidth375 확인.
- 브라우저 오류/경고 없음. 캡처 dialog-*.png.

## 입력 애니메이션
- 최초 노출 시 85ms 간격 자동 타이핑, 직접 입력 시 자동 타이핑 중단 확인.
- 새 텍스트의 그라디언트가 0.5초에 걸쳐 검은색으로 전환됨을 캡처로 확인.
- 포커스 outline 제거, 모바일 375px 줄바꿈 및 가로 넘침 없음 확인.
- 프로덕션 빌드 통과, 브라우저 오류/경고 없음. 독립 소스·이미지 리뷰 PASS.
- 캡처 ink-flash.png, ink-settled.png, ink-mobile.png.
- 실제 macOS 한글 IME 조합은 이번 브라우저 자동화 검증 범위에 포함하지 않음.

## 세로 설치 스텝
- 1280×900에서 세 단계 버튼으로 스크롤 이동 및 활성 항목/그래픽 전환 확인.
- 375×812에서 스텝과 그림이 세로로 배치되고 잘림 없이 표시됨.
- 프로덕션 빌드 및 TypeScript 검사 통과.
- 캡처 install-step1.png, install-step2.png, install-step3.png, install-mobile.png.

## 이미지·복사·FAQ 인터랙션
- 사용자 제공 PNG 2개를 설치 단계에 표시. 데스크톱 캡처 assets-step1/3.png 확인.
- 요청문·카라비너 코드 복사 성공 시 체크 아이콘 표시, 화면의 완료 문구 없음 확인(copy-check/code-check.png).
- FAQ 클릭 열기와 Enter 닫기에서 aria-expanded true→false 확인. 모바일 FAQ 줄바꿈 확인.
- 배포 기록 Escape 닫기 및 원래 버튼 포커스 복귀 확인.
- 키보드 Q 클릭, 입력창 한영 문자열 입력·비우기 회귀 확인.
- 독립 리뷰에서 FAQ 높이 애니메이션 지적 후 opacity/transform 전환으로 수정.
- 프로덕션 빌드·TypeScript 검사 통과. OS reduced-motion 실측과 실제 IME 검증은 이번 범위 밖.

## 히어로 타이핑
- 120ms 간격 글자 순서 등장 캡처 title-final-4.png에서 ‘쓰던 한’ 중간 상태 확인.
- 데스크톱·모바일 최종 문장과 그라디언트, 줄바꿈 확인.
- 프로덕션 빌드·TypeScript 검사 통과.

## 배포 기록 페이지·버튼 통일
- /releases 이동, GitHub 버전 기록 표시, 홈 복귀 확인. ISR 1h 빌드 출력 확인.
- 홈·배포 기록의 렌더링 요소 글꼴 굵기 700 이상 검사 결과 0개.
- 모바일375px에서 solid 버튼, 숫자 없는 설치 단계, FAQ·팝업 레이아웃 확인.
- FAQ 클릭 열기, 설정 팝업 Escape 닫기, 페이지 이동 검증.
- 캡처 solid-*.png, releases-page.png, releases-mobile.png.

## 공통 헤더·Pretendard·중앙 입력 체험
- 전역 computed fontFamily: pretendard, pretendard Fallback, sans-serif 확인.
- 모바일375px에서 문서폭375, 헤더 메뉴·입력 체험 중앙 배치 확인.
- 홈→배포 기록→설치 안내 이동 확인.
- Apple Support 로그인 화면 외부 이미지가 실제 표시됨을 확인(macos-login.png).
- 프로덕션 빌드 및 TypeScript 검사 통과.

## Caps Lock 설정 안내 개선
- 데스크톱 2열, 모바일 그림 위/설명 아래 배치 확인(caps-redesign.png, caps-mobile.png).
- 기존 설정 팝업 열기·닫기·Escape 및 포커스 복귀 확인.
- 프로덕션 빌드 및 TypeScript 검사 통과.

## 헤더·CTA·Mac 키보드
- Mac ANSI 기반 6행 배열과 역T 방향키 데스크톱/모바일 캡처 확인.
- 모바일 CTA 높이50/50px, 문서폭375px 확인.
- Q 클릭 후 눌림 해제, 입력창 q 키 전달 및 눌린 키0개 확인.
- 프로덕션 빌드·TypeScript 검사 통과, 독립 소스·이미지 리뷰 PASS.
- 캡처 mac-keyboard-desktop.png, mac-keyboard-mobile.png.
