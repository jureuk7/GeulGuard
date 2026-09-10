# GeulGuard · 글가드

**Keep every Korean character.**

macOS 베타와 일부 앱에서 한글 조합 중 글자가 사라지는 문제를 우회하는
Swift 기반 두벌식 입력 소스입니다.

## 왜 글자가 사라지나

한글은 키 하나가 곧 완성 문자로 들어가지 않습니다. macOS 입력기가 `marked
text`(조합 중 문자열)를 앱에 보여 주다가 음절이 끝날 때 확정합니다. 일부 앱과
베타 OS에서는 포커스 이동, 방향키, Delete, 입력 소스 전환 때 이 문자열을
확정하지 않고 취소하거나 다음 조합으로 덮습니다.

글가드는 한글 조합만 담당합니다. 영어는 macOS 기본 `ABC` 입력 소스로 입력합니다.

1. 한글은 글가드, 영어는 ABC를 사용하고 macOS가 입력 소스 전환을 담당합니다.
2. 방향키, Tab, Return, ESC, 단축키 등 조합을 끝내는 이벤트 전에 표시 중인
   한글을 먼저 동기적으로 확정합니다.

## 설치

[최신 GitHub Release](https://github.com/jureuk7/GeulGuard/releases/latest)에서
`GeulGuard.pkg`를 내려받아 실행합니다. 설치 프로그램은 서명·공증된 Universal
Binary를 `/Library/Input Methods`에 설치하므로 관리자 암호가 필요합니다.

설치 뒤 로그아웃/로그인하고:

1. 시스템 설정 → 키보드 → 텍스트 입력 → 편집
2. `+`를 눌러 한국어 아래의 `글가드`와 영어 아래의 `ABC` 추가
3. 메뉴 막대 입력 메뉴에서 `글가드` 선택

메뉴 막대 입력 메뉴 또는 macOS의 입력 소스 전환 단축키로 `ABC ↔ 글가드`를
전환합니다. 단축키는 시스템 설정 → 키보드 → 키보드 단축키 → 입력 소스에서
확인·변경할 수 있습니다. 글가드는 `Shift+Space`를 한/영 전환으로 가로채지 않습니다.
ESC는 조합 중인 한글만 확정하며 입력 소스를 바꾸지 않습니다.

## 권장 사용법: ABC + 글가드 + Karabiner

영어는 **ABC**, 한글은 **글가드**, Caps Lock 전환은 **Karabiner-Elements**가
담당하는 구성을 권장합니다. Karabiner는 선택 사항이며, 없어도 시스템 단축키로
글가드를 사용할 수 있습니다.

### 1. macOS 입력 소스 설정

- 시스템 설정 → 키보드 → 텍스트 입력 → 편집에서 `ABC`와 `글가드`를 추가합니다.
  두 소스만 사용하면 전환 대상을 예측하기 쉽습니다. 다른 입력 소스가 필요하면
  유지해도 되지만, ‘이전 입력 소스’가 항상 ABC/글가드인 것은 아닙니다.
- 키보드 → 키보드 단축키 → 입력 소스에서 **이전 입력 소스 선택**을
  `Control+Space`로 설정합니다. 아래 Karabiner 규칙은 이 단축키를 보냅니다.
- Caps Lock의 ‘길게 눌러 대문자 고정’ 동작은 기본 입력 전환 옵션에 함께
  포함됩니다. 대문자 고정 없이 전환만 하려면 아래 규칙을 사용합니다.

### 2. Caps Lock을 입력 전환 전용으로 사용

1. [Karabiner-Elements 공식 사이트](https://karabiner-elements.pqrs.org/)에서
   설치하고 앱이 안내하는 macOS 권한·드라이버 설정을 완료합니다.
2. Karabiner → Complex Modifications → Add your own rule을 엽니다.
3. [Caps Lock 규칙 JSON](config/karabiner-caps-lock.json) 전체를 붙여 넣고 저장합니다.
4. 규칙이 활성화되어 있고 Devices에서 사용하는 키보드가 활성화되어 있는지 확인합니다.

규칙은 Caps Lock을 `Control+Space` 한 번으로 바꿉니다. `repeat: false`로
길게 눌렀을 때의 반복 전환을 막으며, 다른 수정키와 함께 눌러도 입력 전환을
보냅니다. 기존 Caps Lock 규칙과 충돌하면 어느 규칙을 유지할지 먼저 정하세요.
Karabiner가 실행 중이고 해당 키보드를 처리할 때 적용되며, 로그인 전 화면에는
이 설정이 그대로 적용된다고 가정하지 마세요. 대문자는 Shift로 입력합니다.

### 에이전트에게 설치 맡기기

다음 요청을 저장소에 접근할 수 있는 코딩 에이전트에게 전달하세요.

> 이 저장소의 AGENTS.md와 docs/agent-setup.md를 읽고 글가드를 권장 구성으로
> 설치해 줘. 영어 ABC와 한글 글가드를 함께 쓰고, Caps Lock은 카라비너로 입력
> 전환만 하게 해 줘. 기존 설정을 백업하고, 가능한 설치·설정을 진행한 뒤
> 직접 해야 하는
> 인증·권한 승인·로그아웃 단계와 실제 검증 결과를 알려 줘.

설치 절차·설정 보존·복구·검증 기준은 [에이전트 설치 가이드](docs/agent-setup.md)에
있습니다. 관리자 인증과 macOS 권한 승인은 사용자 조작이 필요할 수 있습니다.

설정 근거: [Apple 입력 소스 안내](https://support.apple.com/guide/mac-help/write-in-another-language-on-mac-mchlp1406/mac),
[Karabiner 반복 억제](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/repeat/),
[수정키 처리](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/modifiers/).

## 소스에서 빌드

요구 사항: macOS 14 이상, Xcode 16 이상.

```bash
./scripts/install.sh
```

기본 빌드는 빠른 로컬 검증용 debug입니다. 최적화 번들은
`CONFIGURATION=release ./scripts/build-app.sh`로 만들 수 있습니다.
빌드 결과는 `dist/GeulGuard.zip`에도 생성됩니다.

### 0.1.x에서 업데이트

최신 PKG를 설치하면 기존 앱을 교체합니다. 입력 소스 목록에 이전 글가드가 남아
있다면 시스템 설정에서 제거한 뒤 새 `글가드`를 추가하세요.

## 주요 개선

- Shift가 눌린 채 이어서 입력해도 모음이 영문으로 새지 않습니다.
- Electron/Chromium 기반 앱의 조합 중 텍스트 표시와 확정 동작을 개선했습니다.
- 시스템 언어에 맞는 입력 소스 이름과 작은 메뉴 막대 아이콘을 제공합니다.

## 테스트

```bash
./scripts/test.sh
```

터미널·Electron의 실제 검증 범위와 미완료 항목은 [호환성 검증 기록](docs/compatibility.md)에 있습니다.

## 현재 범위

- 표준 두벌식 및 복합 모음/겹받침
- 조합 단위 Backspace
- macOS 기본 ABC 입력 소스와 함께 사용
- 커서 이동·포커스 변경 전 강제 확정
- Electron/Chromium 호환 marked text 표시

한자 변환, 세벌식, 글가드 자체 Caps Lock 전환, 앱별 모드 기억은 포함하지 않습니다.
Caps Lock 전환은 위 Karabiner 설정으로 구성할 수 있습니다.

조사 근거와 원인/한계 분석은 [`docs/research.md`](docs/research.md)에 정리되어
있습니다.

## 개인정보

키 입력은 현재 포커스된 앱으로 전달하기 위해 메모리에서만 처리합니다. 네트워크
연결, 입력 기록, 접근성 권한을 사용하지 않습니다.
선택 구성인 Karabiner-Elements는 키를 재매핑하기 위한 별도의 macOS 권한과
드라이버를 사용합니다. 글가드 자체의 권한과 구분하세요.

## Contributing

버그 재현 사례, 호환성 결과, 코드 기여를 환영합니다. 시작하기 전에
[`CONTRIBUTING.md`](CONTRIBUTING.md)를 확인해 주세요.

## License

GeulGuard is available under the [MIT License](LICENSE).
