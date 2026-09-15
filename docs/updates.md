# 업데이트 배포

글가드는 Sparkle 2로 업데이트를 확인하고, 공식 GitHub Release의 서명·공증된
PKG를 설치한다. 업데이트 설치에는 사용자 동의와 macOS 관리자 인증이 필요하다.
입력기의 설치 경로는 `/Library/Input Methods`다. PKG 설치 성공과 새 입력기의
활성화는 별개이며, 새 버전 적용에 로그아웃·로그인이 필요할 수 있다.

## 빌드 설정

`scripts/build-app.sh`는 SwiftPM의 Sparkle 프레임워크를 앱에 복사하고 내부
XPC 서비스, Autoupdate, Updater.app, 프레임워크, 앱 순서로 서명한다. 프레임워크의
심볼릭 링크와 실행 권한을 보존한다. 기존 `CONFIGURATION`,
`GEUL_GUARD_ARCHITECTURES`, `GEUL_GUARD_SCRATCH_PATH`, `CODESIGN_IDENTITY` 설정을
그대로 사용한다. 개발 빌드는 기본적으로 ad-hoc 서명이다.

다음 두 환경변수는 **공개 정보**이며 빌드한 앱의 Info.plist에 포함된다.

| 환경변수 | 용도 |
| --- | --- |
| `GEUL_GUARD_UPDATE_FEED_URL` | `SUFeedURL`에 기록할 고정 HTTPS appcast 주소 |
| `GEUL_GUARD_UPDATE_PUBLIC_KEY` | `SUPublicEDKey`에 기록할 Base64 Ed25519 공개키, 디코딩 후 32바이트 |

둘 다 생략하면 업데이트 서버가 설정되지 않은 개발 빌드다. 하나만 지정하거나
유효하지 않은 값을 지정하면 빌드가 실패한다. 피드 URL에는 사용자명·암호를
넣을 수 없다. 비공개 키를 환경변수나 저장소에 넣지 않는다.

## 릴리스 준비

릴리스 담당자는 고정 HTTPS 피드 호스팅과 Sparkle 서명 키를 먼저 준비한다.
Sparkle의 `generate_keys`는 키체인에 키를 저장하는 도구다. 키 생성은 자동 빌드에
포함되지 않으며, 운영자가 [공식 키 관리 안내](https://sparkle-project.org/documentation/)
에 따라 별도로 수행한다. PKG 업데이트는 키 분실 시 일반 앱 번들의 키 교체
대체 경로를 지원하지 않으므로 키 보관 정책을 먼저 정한다.

`scripts/release-pkg.sh`에는 위 두 공개 설정 외에 다음 환경변수가 필요하다.

| 환경변수 | 용도 |
| --- | --- |
| `DEVELOPER_ID_APPLICATION` | 키체인의 앱 서명 인증서 이름 |
| `DEVELOPER_ID_INSTALLER` | 키체인의 설치 패키지 서명 인증서 이름 |
| `NOTARY_PROFILE` | 기존 notarytool 키체인 프로필 이름 |
| `GEUL_GUARD_RELEASE_DOWNLOAD_URL` | `https://github.com/jureuk7/GeulGuard/releases/download/v버전/GeulGuard.pkg` 형식의 공식 다운로드 주소 |
| `GEUL_GUARD_RELEASE_PATH` | 선택 사항. 격리된 릴리스 작업 디렉터리 |

다운로드 주소의 버전은 빌드된 앱의 `CFBundleShortVersionString`과 같아야 한다.
`latest/download` 같은 가변 주소는 허용하지 않는다. 새 릴리스의
`CFBundleVersion`은 기존 버전보다 증가해야 한다.

릴리스 스크립트는 universal 앱과 서명된 PKG를 생성하고 공증·staple·Gatekeeper
검증을 수행한다. 그 후 Sparkle의 `sign_update`가 키체인의 기본 `ed25519`
계정으로 최종 PKG를 서명한다. 키 파일과 비공개 키 환경변수는 사용하지 않는다.
`scripts/update-metadata.swift`는 PKG 서명을 앱에 내장된 공개키로 검증한 뒤
`dist/appcast.xml`을 만든다. 따라서 키체인의 키와 앱의 공개키가 다르면 실패한다.

appcast는 빌드된 앱의 버전·최소 macOS, 최종 PKG의 크기·EdDSA 서명,
`installationType="package"`를 포함하는 단일 최신 버전 피드다. 기존 피드의
항목을 합치거나 배포하지 않는다. 공식 `generate_appcast`는 PKG 자동 생성을
지원하지 않으므로 이 전용 생성기를 사용한다.

## 게시 순서와 검증

1. 서명·공증된 구버전과 신버전을 준비하고 테스트용 HTTPS 피드로 검증한다.
2. 사용자 확인, 취소, 다운로드 실패, 서명 불일치, 조합 중 설치 시도를 확인한다.
3. 관리자 인증 후 PKG 설치와 새 입력기의 활성화를 각각 확인한다. 조합 내용,
   기존 입력 소스와 Karabiner 규칙이 보존되는지 확인한다.
4. 공식 GitHub Release의 버전별 주소에 최종 `GeulGuard.pkg`를 게시한다.
   이미 공개한 버전의 PKG 파일은 교체하지 않는다.
5. 해당 주소의 다운로드와 바이트 일치를 확인한 후 마지막으로 고정 HTTPS
   주소에 `dist/appcast.xml`을 게시한다. 피드의 최소 OS보다 오래된 사용자를
   계속 지원하려면 기존 호환 항목도 함께 보존해야 한다.

스크립트는 업로드, GitHub Release 생성, 사용자 Mac 설치 또는 설정 변경을
수행하지 않는다. ad-hoc 빌드의 실행만으로 PKG 업데이트 호환성을 주장하지
않는다. 실제 입력 앱별 호환성 범위는 [compatibility.md](compatibility.md)를 따른다.

## 개발 검증

각 스크립트는 `--help`를 지원하며 알 수 없는 인수를 거절한다.
`update-metadata.swift`의 메타데이터 생성은 공개 RFC 8032 서명 벡터로 검사할 수
있다. 이 검사는 XML 생성과 서명 검증 검사이며, 실제 PKG 설치 검증을 대신하지
않는다.

참고: [Sparkle PKG 업데이트](https://sparkle-project.org/documentation/package-updates/),
[Sparkle 설치·서명 문서](https://sparkle-project.org/documentation/).

## 입력 중 설치 보호

앱 시작 시 한 번 자동 확인하는 것이 기본값이며 설정에서 끌 수 있다. 주기적 자동 확인과 자동 다운로드·무인 설치는 비활성화한다. 사용자가
설치를 선택하면 종료 확인창을 표시한다. ABC가 현재 입력 소스이고 모든 입력
세션의 조합이 끝난 경우에만 앱 종료를 허용한다. API로 입력 소스를 강제로
전환하지 않으며, 기존 입력 소스와 Karabiner 설정도 변경하지 않는다.

| 보안·입력 불변식 | 구현 위치 |
| --- | --- |
| 피드·공개키 미설정 시 업데이터 비활성 | `Sources/GeulGuardInput/UpdateController.swift`의 `UpdateConfiguration.isValid` |
| 공식 버전별 PKG만 허용, Sparkle에서 다운로드 서명 검증 | `UpdateController.updater(_:shouldProceedWithUpdate:updateCheck:)`, `SUPublicEDKey` |
| 키 입력·시스템 프로필을 업데이트 요청에 포함하지 않음 | `UpdateController.init`, `allowedSystemProfileKeys(for:)` |
| ABC 전환·조합 종료 확인 전 업데이트 종료 거부 | `UpdateController.confirmTermination`, `GeulGuardInputController.hasPendingComposition` |
| 비공개 키를 파일·환경변수에 수집하지 않음 | `scripts/release-pkg.sh`의 키체인 `sign_update` 호출 |

## 2026-09-15 개발 검증 기록

- Swift 테스트 32개 통과: 기존 조합·입력·표시 검사와 업데이트 설정·URL 제한·
  모든 세션의 조합 종료 감지·시작 시 확인 기본값/비활성화 검사.
- 앱 번들 빌드와 Sparkle 내부 구성요소를 포함한 `codesign --verify --deep --strict`
  통과. 테스트 런너에는 Sparkle 프레임워크를 찾도록 전용 rpath를 추가했다.
- 별도 QA 번들 ID로 실제 설정 화면을 열어 시작 시 확인 기본 켜짐, 끄기/켜기,
  재실행 후 설정 유지, 미설정 빌드의 비활성 상태를 확인했다. 설정 화면에는
  중복 수동 확인 버튼이 없다.
- 테스트용 공개키와 HTTPS 피드를 지정한 QA 앱에서 시작 시 마지막 확인 시간이
  갱신되고, 옵션을 끈 뒤 재실행하면 갱신되지 않으며, 다시 켜고 실행하면
  갱신되는 것을 확인했다. 테스트 피드 실패 시 시작을 막는 경고창은 없었다.
- 공개 RFC 8032 벡터로 appcast 생성/XML 문법, 잘못된 주소·HTTP 피드·변조된
  데이터의 거부를 확인했다. 테스트 벡터는 배포용 키가 아니다.

아직 검증하지 않은 항목: 메뉴바 항목의 실제 마우스 클릭, 새 버전 발견 안내,
관리자 인증을 거친 서명·공증 PKG 업데이트, 취소 후 재시도 및 업데이트 후
실제 입력 앱에서의 재활성화. 공개 피드·Sparkle 배포 키를 준비하고 실제
구버전→신버전으로 검증한 뒤 배포해야 한다. 현재 작업은 사용자 입력 소스나
Karabiner 설정을 변경하지 않았으며 배포 PKG 설치·공개 게시를 수행하지 않았다.
