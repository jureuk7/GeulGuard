# Contributing to GeulGuard

GeulGuard에 관심을 가져 주셔서 감사합니다.

## 버그 제보

다음 정보를 GitHub Issue에 포함해 주세요.

- macOS 버전과 빌드 번호
- 문제가 발생한 앱과 버전
- 사용한 키 입력과 실제/기대 결과
- 가능하면 화면 녹화와 재현 빈도

키 입력에 개인정보가 포함되지 않도록 반드시 확인해 주세요.

## 개발 환경

- macOS 14 이상
- Xcode 16 이상
- Swift 6

```bash
git clone https://github.com/jureuk7/GeulGuard.git
cd GeulGuard
./scripts/test.sh
./scripts/build-app.sh
```

## Pull Request

1. 동작 변경에는 테스트를 추가합니다.
2. 사용자에게 보이는 변경에는 README 또는 `docs/` 문서를 함께 수정합니다.
3. `./scripts/test.sh`와 `./scripts/build-app.sh`가 성공하는지 확인합니다.
4. 한 PR에는 하나의 목적만 담습니다.

커밋 메시지는 변경 이유가 드러나는 짧은 명령형 문장을 권장합니다.
