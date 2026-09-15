# 글가드 랜딩 페이지

Next.js App Router, TypeScript, Vanilla Extract로 만든 한국어 랜딩 페이지입니다.

```sh
pnpm install
pnpm dev --port 43187
```

품질 검사와 배포 빌드:

```sh
pnpm lint
pnpm format:check
pnpm build
pnpm typecheck
pnpm test
pnpm start --port 43187
```

`pnpm lint:fix`는 Biome의 안전한 린트 수정, import 정리와 포맷을 함께 적용합니다.
`pnpm format`은 포맷만 갱신합니다. `styles/tokens.css.ts`가 색상·간격·모서리·서체·모션의
전역 계약과 라이트·다크 테마를 정의합니다. 화면별 스타일은 `styles/features/`에 나누고
`styles/index.css.ts`에서 적용 순서를 선언합니다. 새 색상과 간격은 임의 값을 추가하기 전에
토큰으로 정의해 사용합니다.

사용 중인 포트가 있으면 다른 포트를 지정하세요. Swift 앱의 빌드와 독립적으로 실행합니다.
다운로드는 공식 GitHub 최신 릴리스의 PKG로 연결합니다. 공개 사이트는 https://geulguard.jureuk.dev 입니다.

## 구현 범위

- 서버에서 렌더링하는 제품 소개·설치·FAQ
- 현재 표준 두벌식 지원, 다른 한글 자판 배열 지원 예정 안내
- 로컬 상태만 사용하는 입력창과 초기화
- 설치 요청문 복사, 성공 안내와 직접 복사 대안
- 모바일·태블릿·데스크톱 레이아웃, 키보드 포커스, 모션 감소 설정

브라우저의 입력창은 macOS 입력기를 대체하지 않습니다. 서버로 입력 내용을 보내지 않습니다.
디자인 기준과 외부 참고 적용 내역은 DESIGN.md를 확인하세요.

설치 단계 설명과 입력창 placeholder는 선택·포커스 여부와 관계없이 읽을 수 있는
대비를 유지합니다. 배포 기록도 첫 번째 링크로 본문에 바로 이동할 수 있습니다.
복사 중에는 버튼에 진행 표시가 나타나고 중복 요청을 막습니다. 완료 안내는 복사할
때마다 갱신되며, 실패하면 화면의 원문을 직접 선택해서 복사할 수 있습니다.
히어로 제목은 JavaScript가 실행되지 않아도 표시됩니다.

컴포넌트 회귀 테스트는 Bun과 Happy DOM으로 실행합니다. 실제 브라우저·IME 검증을
대체하지 않습니다. 개발 모드의 react-grab/react-scan은
`NEXT_PUBLIC_DISABLE_REACT_DEVTOOLS=1`로 끌 수 있으며 프로덕션 화면에는 로드하지 않습니다.

## 배포 기록·카라비너 설정

배포 기록 팝업은 GitHub `main/CHANGELOG.md`를 서버에서 받아 렌더링합니다.
Next.js ISR로 1시간이 지난 뒤 들어오는 요청에서 갱신하며, GitHub 접근 실패 시
원문 링크를 제공합니다. 새 변경을 즉시 반영하려면 다시 빌드·배포하세요.
카라비너 프리뷰는 상위 저장소의 `config/karabiner-caps-lock.json`을 직접 사용합니다.
배포 시 `landing/`과 상위 `config/`를 함께 포함하세요.

## Sparkle 업데이트 피드

`public/.well-known/appcast.xml`은 `/.well-known/appcast.xml`에서 제공하는
공개 업데이트 피드입니다. 로그인이나 API 키 없이 HTTPS로 접근할 수 있는
고정 도메인에 배포하고, macOS 앱 빌드의 `GEUL_GUARD_UPDATE_FEED_URL`을
해당 주소로 설정합니다. `.well-known` 디렉터리도 배포 산출물에 포함해야 합니다.

운영 피드 주소는 `https://geulguard.jureuk.dev/.well-known/appcast.xml`입니다.
앱을 빌드하는 터미널에서 `GEUL_GUARD_UPDATE_FEED_URL`을 이 값으로 지정합니다.

초기 피드는 배포 항목이 없는 RSS입니다. 실제 서명된 업데이트를 게시하기 전까지
새 버전을 안내하지 않습니다. 개인키는 웹 서버나 `public/`에 넣지 않습니다.

새 버전 게시 순서:

1. 자동 업데이트 PR의 `scripts/release-pkg.sh`로 서명·공증된 PKG와
   서명이 검증된 `dist/appcast.xml`을 생성합니다.
2. 최종 PKG를 공식 GitHub Release의 버전별 주소에 게시하고 다운로드를 확인합니다.
3. 생성된 XML로 `landing/public/.well-known/appcast.xml`을 교체합니다.
   이전 macOS용 배포 항목을 유지해야 하면 기존 호환 항목도 보존합니다.
4. 변경을 검토·커밋하고 Next.js 앱을 다시 배포합니다. 피드의 버전·URL·서명을
   임의로 작성하거나 이미 공개한 버전의 PKG를 교체하지 않습니다.
5. 공개 피드 주소가 HTTP 200과 XML 본문을 반환하는지 확인한 뒤 실제 앱에서
   업데이트를 검증합니다. 인증 리다이렉트나 HTML 페이지가 반환되면 안 됩니다.

Next.js의 `public` 파일은 기본적으로 `Cache-Control: public, max-age=0`으로
제공됩니다. CDN에도 장기 캐시를 추가하지 말고, 게시 후 실제 응답을 확인하세요.
피드 내용 변경에는 재배포가 필요합니다. 앱에 설정한 피드 주소는 유지합니다.
