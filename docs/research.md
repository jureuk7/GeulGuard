# macOS 한글 글자 사라짐 조사

조사일: 2026-07-28

## 확인된 증상

- macOS 26.1의 Claude Quick Access에서 `가나다`가 `가다`처럼 중간 글자를
  잃는 재현 사례가 보고됐다. 같은 시스템의 다른 입력 창에서는 정상이라
  앱의 텍스트 입력 구현과 IME 조합 상태의 상호작용도 원인이다.
  [사용자 보고](https://www.reddit.com/r/ClaudeAI/comments/1pf4c21/korean_input_bug_in_quick_access_macos/)
- macOS 26.3의 Ghostty에서는 조합 중 방향키나 Delete를 누르면 `marked
  text`가 확정되지 않고 취소되어 사라졌다. 같은 순서가 Terminal.app에서는
  정상 동작해, 앱이 조합 종료 이벤트를 어떻게 처리하는지가 중요함을 보여 준다.
  [재현 절차와 분석](https://upd.dev/ghostty-org/ghostty/issues/11461)
- JetBrains AI Assistant 입력창에는 띄어쓰기 없이 한글을 입력할 때 앞 문자가
  다음 문자로 덮이거나 삭제된다는 별도 보고가 있다.
  [AIR-5485](https://youtrack.jetbrains.com/projects/AIR/issues/AIR-5485/Korean-IME-composition-bug-in-AI-Assistant-Chat-window)
- macOS 27 베타에서는 입력이 시스템 전반에서 멎고 로그에
  `InputMethodKit: NO Endpoint, Bail`이 나타난다는 보고도 있다. 이 경우는
  특정 한글 조합기보다 베타 OS의 IMK 연결 자체가 깨지는 더 넓은 장애다.
  [macOS 27 베타 보고](https://www.reddit.com/r/MacOSBeta/comments/1v7a7gy/macos_27_randomly_stops_accepting_keyboard_input/)

## 원인 모델

한글 두벌식은 `ㄱ` → `가` → `간`처럼 이미 보이는 한 글자를 계속 교체하면서
완성한다. macOS에서는 이 임시 문자열을 `marked text` 또는 preedit라고 한다.
클라이언트 앱은 조합 중 문자열과 확정 문자열을 구별해야 한다.

관찰된 실패는 세 층으로 나뉜다.

1. **클라이언트 오류**: 앱이 `setMarkedText`, selection range, 조합 종료를
   잘못 처리하거나 UI 재렌더링으로 임시 문자열을 덮는다.
2. **입력 소스 세션 경쟁**: 한/영 전환 때 InputMethodKit 세션이 바뀌는 동안
   첫 이벤트나 마지막 marked text가 유실된다.
3. **베타 OS의 IMK 장애**: 입력기 endpoint 자체가 끊기면 어떤 제3자 입력기도
   완전한 복구를 보장할 수 없다.

Apple은 InputMethodKit을 macOS 입력기용 공식 프레임워크로 제공하며, IMKServer가
클라이언트 연결과 입력 세션별 IMKInputController 생성을 맡는다.
[Apple InputMethodKit 문서](https://developer.apple.com/documentation/inputmethodkit)

## 선택한 해결책

글가드는 접근성 API로 다른 앱의 텍스트를 사후 수정하지 않는다. 대신 공식
InputMethodKit 입력 소스로 동작한다.

- 한 입력 소스 내부에 한글/영문 모드를 두어 한/영 전환 시 세션 교체를 피한다.
- 확정 문자열과 조합 문자열을 별도 버퍼로 관리한다.
- 방향키, Tab, Return, ESC, 단축키, 포커스 이탈 전에 조합 문자열을 동기적으로
  확정한다.
- 조합기는 UI와 분리된 순수 Swift 상태 머신이며 단위 테스트한다.

같은 단일 입력 소스 접근으로 글자 누락과 전환 지연을 피한다는 공개 사례도 있다.
[온글 소개 및 구현 설명](https://www.reddit.com/r/Maclien/comments/1rxvvfg/%EC%83%88%EB%A1%9C%EC%9A%B4_%EB%A7%A5%EC%9A%A9_%ED%95%9C%EA%B8%80_%EC%9E%85%EB%A0%A5%EA%B8%B0_%EC%98%A8%EA%B8%80ongeul_%EC%86%8C%EA%B0%9C/)

## 한계

- 앱 자체가 macOS 텍스트 입력 계약을 위반하면 입력기만으로 모든 경우를 고칠 수
  없다. 해당 앱의 수정이 최종 해결책이다.
- macOS 27 베타의 IMK endpoint 장애처럼 프레임워크 연결이 죽는 경우 로그아웃,
  재부팅 또는 Apple의 OS 수정이 필요할 수 있다.
- 이 프로젝트는 우회책이자 검증 가능한 MVP다. Apple Feedback Assistant에도
  재현 영상, 문제 앱/버전, macOS 빌드 번호와 함께 신고하는 것이 좋다.
