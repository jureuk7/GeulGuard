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
다운로드는 공식 GitHub 최신 릴리스의 PKG로 연결합니다. 도메인 연결과 공개 배포는 아직 하지 않았습니다.

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

## 서체

전역 서체는 [Interlude](https://avanturation.com/interlude)입니다. `interlude-ui@1.3.0`의
공식 Dynamic Subset CSS를 루트 레이아웃에서 가져오며, WOFF2 파일은 Next.js 빌드에
포함되어 자체 호스팅됩니다. 브라우저는 화면에 필요한 글자 범위만 내려받습니다.
`font-display: swap`으로 로딩 중에도 시스템 서체로 내용을 표시합니다.

제목·본문·버튼·입력창은 공통 서체 토큰을 사용합니다. `font-optical-sizing: auto`로
작은 글자는 Text, 큰 제목은 Display에 맞는 형태를 사용하며, 굵기와 자간은 기존
토큰을 유지합니다. SIL Open Font License 1.1 사본은
`public/fonts/Interlude-LICENSE.txt`에 포함됩니다.

## 배포 기록·카라비너 설정

배포 기록 팝업은 GitHub `main/CHANGELOG.md`를 서버에서 받아 렌더링합니다.
Next.js ISR로 1시간이 지난 뒤 들어오는 요청에서 갱신하며, GitHub 접근 실패 시
원문 링크를 제공합니다. 새 변경을 즉시 반영하려면 다시 빌드·배포하세요.
카라비너 프리뷰는 상위 저장소의 `config/karabiner-caps-lock.json`을 직접 사용합니다.
배포 시 `landing/`과 상위 `config/`를 함께 포함하세요.
