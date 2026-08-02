# Changelog

All notable changes to GeulGuard are documented in this file.

## [0.2.0] - 2026-08-03

- Shift가 눌린 채 이어서 입력한 모음이 영문으로 새는 문제를 수정했습니다.
- Electron/Chromium 앱에서 조합 중인 글자가 선택 영역처럼 보이거나 사라지는
  문제를 줄이도록 marked text 처리를 개선했습니다.
- 입력 소스 이름을 한국어/영어로 현지화하고 메뉴 막대용 아이콘을 추가했습니다.
- 설치 스크립트가 기존 앱을 교체하고 입력 메뉴를 새로 고치도록 개선했습니다.

## [0.1.0] - 2026-07-28

- 표준 두벌식 조합, 복합 모음, 겹받침, 조합 단위 Backspace를 지원합니다.
- 커서 이동과 포커스 변경 전에 marked text를 확정해 한글 누락을 줄입니다.
- 한 입력 소스 안에서 `Shift+Space` 한/영 전환을 지원합니다.
