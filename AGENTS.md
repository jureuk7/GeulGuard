# GeulGuard 에이전트 안내

사용자가 설치·업데이트·권장 키보드 설정을 요청하면 먼저
[docs/agent-setup.md](docs/agent-setup.md)를 읽고 실행한다.
문서를 읽었다는 이유만으로 사용자의 Mac 설정을 바꾸지 않는다.

- 영어는 macOS ABC, 한글은 글가드가 담당한다. 글가드에 영문 모드나 전역 키
  가로채기를 추가하지 않는다.
- 배포 설치는 공식 GitHub Release의 서명·공증된 PKG를 우선한다.
  `scripts/install.sh`는 사용자 Library에 설치하는 개발용 경로다.
- 설치 시 기존 입력 소스와 Karabiner 규칙을 보존한다. 변경은 백업하고 중복
  적용하지 않는다. 암호나 개인 키를 대화·파일에 수집하지 않는다.
- 도구가 앱 조작을 차단하면 다른 도구로 우회하지 않는다. 패키지 설치,
  설정 적용, 실제 앱 입력 검증은 각각 별도로 보고한다.
- 개발 시 빌드·테스트 방법은 README와 CONTRIBUTING.md를 따른다.
  호환성 주장은 docs/compatibility.md의 실제 검증 범위를 넘지 않아야 한다.
