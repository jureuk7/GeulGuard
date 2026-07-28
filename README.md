# GeulGuard · 글가드

**Keep every Korean character.**

macOS 베타와 일부 앱에서 한글 조합 중 글자가 사라지는 문제를 우회하는
Swift 기반 두벌식 입력 소스입니다.

## 왜 글자가 사라지나

한글은 키 하나가 곧 완성 문자로 들어가지 않습니다. macOS 입력기가 `marked
text`(조합 중 문자열)를 앱에 보여 주다가 음절이 끝날 때 확정합니다. 일부 앱과
베타 OS에서는 포커스 이동, 방향키, Delete, 입력 소스 전환 때 이 문자열을
확정하지 않고 취소하거나 다음 조합으로 덮습니다.

글가드는 다음 두 가지로 이 경로를 우회합니다.

1. 하나의 입력 소스 안에서 한글과 영문을 전환해 입력 소스 세션 교체를 피합니다.
2. 방향키, Tab, Return, ESC, 단축키 등 조합을 끝내는 이벤트 전에 표시 중인
   한글을 먼저 동기적으로 확정합니다.

## 빌드와 설치

요구 사항: macOS 14 이상, Xcode 16 이상.

```bash
./scripts/install.sh
```

기본 빌드는 빠른 로컬 검증용 debug입니다. 최적화 번들은
`CONFIGURATION=release ./scripts/build-app.sh`로 만들 수 있습니다.
빌드 결과는 `dist/GeulGuard.zip`에도 생성됩니다.

설치 뒤 로그아웃/로그인하고:

1. 시스템 설정 → 키보드 → 텍스트 입력 → 편집
2. `+`를 눌러 한국어 아래의 `글가드` 추가
3. 메뉴 막대 입력 메뉴에서 `글가드` 선택

`Shift+Space`로 한/영을 전환합니다. ESC를 누르면 조합 중인 글자를 확정하고
영문 모드가 됩니다.

## 테스트

```bash
./scripts/test.sh
```

## 현재 범위

- 표준 두벌식 및 복합 모음/겹받침
- 조합 단위 Backspace
- 단일 입력 소스 내 한/영 전환
- 커서 이동·포커스 변경 전 강제 확정

한자 변환, 세벌식, Caps Lock 단독 전환, 앱별 모드 기억은 아직 포함하지 않습니다.

조사 근거와 원인/한계 분석은 [`docs/research.md`](docs/research.md)에 정리되어
있습니다.

## 개인정보

키 입력은 현재 포커스된 앱으로 전달하기 위해 메모리에서만 처리합니다. 네트워크
연결, 입력 기록, 접근성 권한을 사용하지 않습니다.

## Contributing

버그 재현 사례, 호환성 결과, 코드 기여를 환영합니다. 시작하기 전에
[`CONTRIBUTING.md`](CONTRIBUTING.md)를 확인해 주세요.

## License

GeulGuard is available under the [MIT License](LICENSE).
