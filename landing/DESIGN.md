# 글가드 웹 디자인

## 목적
맥에서 한글 누락을 겪는 방문자가 동작 범위를 이해하고 공식 설치 파일을 받는다.
설치 안내와 에이전트 요청 복사가 보조 작업이다.

## 참고와 선택
사용자가 지정한 Impeccable의 명확한 행동·위계·실제 내용 중심 원칙,
kill-ai-slop의 장식 제거, korean-saas-product-design의 한글 줄바꿈·접근성을 적용한다.
im-not-ai의 번역투·기계적인 병렬 문장을 피한다. Frontend Fundamentals에 따라
입력 체험과 복사 동작은 독립된 클라이언트 컴포넌트로 두고 페이지는 서버 렌더링한다.
기존 브랜드 화면은 없다. macOS 입력 도구라는 맥락에서 키캡과 편집 영역을 사용한다.
과장된 수치·후기·호환성 로고를 사용하지 않는다. 참고 사이트를 복제하지 않는다.

## 시각 토큰
캔버스 #ffffff, 표면 #ffffff, 잉크 #171d26, 보조 글자 #596372,
선 #dce1e7, 강조 #254acb, 강조 hover #19399f. 키캡 바닥 #e5e9ef.
폰트는 한국어 시스템 글꼴 Apple SD Gothic Neo / 맑은 고딕, 영문 Helvetica Neue.
제목 76px(태블릿 64px, 모바일 48px), 소제목 36px(모바일 30px), 본문 17px, 메타 13px.
간격 4/8/12/16/24/32/48/64/96. 페이지 최대 1160px, 좌우 24px(모바일20px).
모서리 컨트롤 6px, 편집 표면 12px. 키캡은 실제 키 형태를 위한 12px 곡률과
입체 키캡의 다층 접촉 그림자와 표면 명암을 사용한다. 배경에는 그라데이션이나 장식용 그림자를 쓰지 않는다.

토큰의 기준 파일은 `styles/tokens.css.ts`다. `createGlobalThemeContract`로 의미 색상과
기초 토큰의 이름을 고정하고, 라이트·다크 값은 같은 계약을 공유한다. 간격은
4/8/12/16/24/32/48/64/96, 서체 굵기는 400/500, 액션 모서리는 14px를 기본으로 한다.
화면별 Vanilla Extract 스타일은 `styles/features/`에 두며 `styles/index.css.ts`에서
토큰 다음에 불러온다.

## 구조와 컴포넌트
header → 제목/다운로드와 키캡 조합 → 편집 체험 → 입력 원리 → 설치 → FAQ → footer.
Link의 primary/secondary 두 역할, 실제 textarea, 상태 텍스트, 네이티브 details.
키보드는 접근 가능한 버튼으로 구성한 눌림 체험 모형이며 실제 입력 소스는 바꾸지 않는다.

## 상호작용과 접근성
복사 성공/실패를 aria-live로 알린다. 실패하면 원문을 선택해 복사할 수 있다.
모든 버튼은 44px 이상, focus-visible은 3px 강조 테두리. 입력 내용은 네트워크로
보내거나 저장하지 않는다. 한글 word-break keep-all. 375/768/1280 폭 검증.
움직임은 버튼의 눌림과 포커스 상태만 사용. reduced-motion에서 transition 없음.

## 범위
설치 파일은 GitHub 최신 릴리스로 연결. 실제 macOS IME는 웹에 포함되지 않는다.
터미널 전체 검증 완료, 완전 자동 설치, 누락률 0%를 주장하지 않는다.

다운로드 CTA는 브라우저의 운영체제를 확인한다. macOS에서는 Apple 로고와 설치 파일
링크를 표시하고, Windows·Linux·ChromeOS·모바일에서는 해당 플랫폼 로고와 `macOS
전용` 문구를 포함한 비활성 버튼으로 지원 범위를 바로 알린다.

## 참고 원문
- https://impeccable.style/docs/layout : 주요 작업의 위계와 화면 너비별 재배치.
- https://github.com/epoko77-ai/im-not-ai/blob/main/codex/skills/humanize-korean/SKILL.md : 번역투, 추상적 수식, 반복 문장 제거.
- https://github.com/epoko77-ai/im-not-ai/blob/main/skills/humanize-korean/references/rewriting-playbook.md : 구체적 주어와 행동 중심의 한국어.

## 스캔 판정
대형 제목은 짧은 한글 다섯 어절로 의도한 위계다. 스캔의 emoji 판정은
이전 텍스트 화살표에서 발생했다. 현재 인터페이스 아이콘은 Lucide 1.5로 통일했다.
키캡 그림자는 실제 키 형태를 설명하며, 나머지 표면에는 그림자를 사용하지 않는다.
설치 단계의 숫자는 실제 순서이므로 유지한다.

링크 밑줄은 탐색 가능성을 나타내는 의미 있는 스타일로 유지한다.

## 사용자 수정 방향
캔버스는 순백 #ffffff. 히어로 카피·CTA는 중앙 정렬하고 아래에 반응형 키보드를 둔다.
모든 인터페이스 아이콘은 Lucide, strokeWidth=1.5. 분리선 대신 여백과 표면 차이를 사용한다.
키보드는 다층 키캡 측면·사선 원근·접촉 그림자로 입체감을 표현한다.
실제 keydown/up 및 포인터 눌림을 키캡에 반영하되 preventDefault나 입력 소스 변경은 하지 않는다.
포커스 이탈 시 눌림 상태를 초기화한다. 모션 감소 환경에서도 색과 위치로 눌림 상태를 구분한다.
키보드 클릭은 시각 반응만 제공하며 입력기 설치나 OS 전환을 가장하지 않는다.

## Motion
Motion for React를 사용한다. 히어로는 60ms 간격으로 아래에서 12px 등장,
스크롤 섹션은 처음 진입할 때 420ms 동안 14px 이동·페이드한다.
SSR 원문은 항상 보이고 JS 실행 후에만 등장 효과를 적용한다. 섹션별 반복 재생 없음.
버튼 hover -2px/tap scale .98, 키캡은 stiffness 650 / damping 32 스프링.
애니메이션은 opacity/transform만 사용하며 reduced-motion에서는 위치·크기 효과를 끈다.

## 배포 기록과 설정 프리뷰
키보드 도움말·입력기 소개 띠·무료 오픈소스 문구를 제거한다.
배포 기록은 GitHub main/CHANGELOG.md를 서버에서 읽고 1시간 주기로 페이지를 재검증한다.
외부 Markdown은 raw HTML 없이 렌더링하며 실패하면 GitHub 원문 링크를 제공한다.
설정 코드는 저장소의 단일 JSON을 가져와 보여준다. 복사 성공/실패를 상태 영역에 표시한다.
팝업은 native dialog로 focus trap, Escape 닫기, 원래 버튼으로 포커스 복귀를 지원한다.

## 입력창 잉크 효과
사용자 요청으로 입력창의 focus 선을 제거한다. caret와 하단 ‘입력 중’ 상태로 포커스를 알린다.
최초 노출 시 예시 문장을 85ms 간격으로 입력하고, 사용자가 포커스·수정·비우기를 하면 즉시 중단한다.
네이티브 textarea는 그대로 유지하며 aria-hidden 미러에 추가된 문자열만 브랜드 블루를 중심으로 옅은 블루·라벤더가 섞인 그라디언트에서 500ms 안에 잉크색으로 전환한다.
모션 감소 설정은 예시를 즉시 표시하고 색 애니메이션을 생략한다. 강제 색상 모드에서는 네이티브 텍스트를 표시한다.

## 헤더 키캡 로고
헤더 로고는 키보드의 Shift 키 재질을 가져온 112×46px 키캡이다. 글가드와 Lucide ArrowBigUp 기호(1.5px)를 한 면에 새긴다. 파란색(#254acb) 상판과 흰색 500 굵기 글자, 1px 깊이로 얕게 표현하며 홈 링크 의미와 포커스 표시를 유지한다.

## 스크롤 설치 안내
설치 안내는 240svh 스크롤 구간 안에 100svh sticky 무대를 둔다. 왼쪽 세로 단계는 현재 항목만 크게, 오른쪽은 PKG·재로그인·입력 소스의 도식으로 전환한다. Motion scroll progress를 세 단계로 나누며 단계 버튼으로 해당 위치 이동도 가능하다. 작은 화면은 상하 배치, reduced-motion은 전환 이동을 생략한다. 그래픽은 실제 시스템 UI가 아닌 설치 과정의 설명 그림이다.

다운로드 CTA는 사용자 요청에 따라 화살표 대신 단색 Apple 브랜드 로고를 사용한다. 일반 UI 아이콘은 Lucide 1.5 규칙을 유지한다.

## 인터랙션과 설치 이미지
복사 성공은 Copy → Check 아이콘 전환으로 표시하며 완료 텍스트는 스크린리더에만 알린다. 실패 안내는 화면에 유지한다. FAQ는 키보드로 작동하는 버튼과 aria-expanded를 사용하고 답변의 이동·투명도 및 Plus 회전을 250ms로 전환한다. 닫히는 답변의 링크는 즉시 inert 처리한다. 헤더·본문 링크 hover, 팝업 진입에도 짧은 전환을 적용하며 reduced-motion에서는 생략한다.
설치 1단계에는 사용자가 제공한 패키지 PNG, 3단계에는 제공한 macOS 메뉴 막대 배경을 사용한다. 입력 소스 단계는 제공 사진만 표시하고 별도 목록 UI를 겹치지 않는다.

## 히어로 문구 전환
‘쓰던 한글,’은 120ms 간격으로 글자 단위 등장하고 ‘끝까지.’는 이어서 청색·청록·보라 그라디언트가 왼쪽부터 오른쪽으로 1100ms 동안 부드럽게 드러난다. 선명한 잘림 대신 넓은 페더 마스크와 3px→0 블러로 경계가 번지며 선명해진다. 전체 문장 공간을 미리 확보해 타이핑 중에도 중앙 정렬과 줄바꿈이 흔들리지 않는다. h1은 별도 진입 애니메이션에서 제외하고 모션 감소 설정에서는 즉시 표시한다.

입력 소스 단계 제목은 ‘글가드 입력 방식 추가’. 사진은 라벨 없이 정사각형·라운드 0, 데스크톱 최대 460px / 모바일 최대 300px로 표시한다.

히어로 ‘끝까지.’는 타이핑 섹션의 fresh-ink를 재사용한다. 왼쪽부터 120ms 간격으로 그라디언트가 나타나고 각 글자는 550ms 안에 검은색으로 정착한다. 이전 마스크 전환은 사용하지 않는다.

## 배포 기록 페이지와 액션 스타일
배포 기록은 /releases 별도 페이지에서 GitHub CHANGELOG를 1시간마다 갱신한다. 설치 단계 숫자는 제거한다. 전체 글꼴은 700 미만(최대 650)으로 제한한다. 문장에 포함된 링크 외 모든 액션은 밑줄 없이 solid 배경을 사용한다. FAQ와 단계 선택도 낮은 대비의 단색 면으로 구분한다.

히어로 빛 효과는 글자별 배경 대신 문장 전체를 덮는 하나의 그라디언트 레이어를 쓴다. 6색 순서를 진입마다 섞고 왼쪽부터 부드럽게 드러낸 뒤 검은 글씨 레이어로 전환한다.

헤더는 데스크톱 76px, 모바일 68px 높이. 헤더 메뉴만 ghost 예외를 적용하고 GitHub는 접근성 이름이 있는 Lucide 아이콘으로 표시한다. 보조 CTA·검증 링크·라이선스의 장식 화살표는 제거한다.

## 설치 안내·서체·공통 헤더
Pretendard Variable을 자체 호스팅하여 전역 적용한다(동봉 OFL 라이선스). 단계 선택은 예외적으로 배경 없는 텍스트로 유지한다. 입력 체험은 제목·설명·입력창을 중앙 열로 배치한다. 공통 헤더는 홈 로고, 배포 기록, 설치 방법, GitHub를 모든 페이지에 표시한다.
로컬 Pretendard Variable을 우선 사용하고 jsDelivr의 공식 Pretendard 배포본을 네트워크 fallback으로 둔다. 제목·본문·버튼·입력 컨트롤은 모두 같은 전역 sans-serif 스택을 사용한다.
로그인 단계는 Apple Support의 macOS Sequoia 로그인 화면을 사용한다. 출처: https://support.apple.com/en-us/102633 (이미지: https://cdsassets.apple.com/live/7WUAS350/images/macos/sequoia/macos-sequoia-login-window-password-entry.png). 이미지 원본을 외부 URL로 표시한다.

입력 체험은 빈 값과 placeholder로 시작하고 자동 입력하지 않는다. 직접 입력할 때만 6색 순서·각도·색상 간격을 매번 섞은 그라디언트가 나타나고 검은색으로 정착한다.

## 접근성 보완

설치 단계 설명은 선택 여부와 관계없이 `--muted`를 불투명하게 표시한다.
입력창 placeholder도 같은 토큰을 사용해 모바일의 작은 글자 대비를 확보한다.
배포 기록에는 홈과 같은 본문 바로가기와 `main` 대상을 둔다.
공통 복사 동작은 진행 중 버튼을 비활성화하고 LoaderCircle과 `aria-busy`로 알린다.
안정된 `role=status` 영역에 매번 달라지는 완료 횟수를 포함해 반복 성공도 전달한다.
성공은 기존 Check 아이콘, 실패는 직접 복사 안내를 유지한다.
로딩 아이콘만 1초 선형 회전하고 모션 감소 환경에서는 정지한다.
입력창 인스턴스마다 label·설명 id를 별도로 만든다.
히어로 제목은 서버 HTML에서도 읽을 수 있고, 등장 효과는 JavaScript 실행 후에만 적용한다.

Caps Lock 권장 설정은 독립된 2열 안내로 구성한다. 선택 설정 표제·짧은 제목·설명·파란 CTA와 반대편 키캡/ABC↔한글 도식으로 기능을 전달한다. 모바일은 그림 위, 텍스트 아래로 정렬한다.

히어로는 최소 한 화면 높이(100svh, 100vh fallback)를 채우고 내용이 많으면 자연스럽게 늘어난다. 중앙 배치, 데스크톱 내부 간격64px·모바일40px. 입력 체험 섹션 상단 여백은144px·모바일104px로 확보한다.

## 간결한 헤더·Mac 배열 키보드
헤더는60px/모바일52px, 글가드 워드마크와 파란 점으로 단순화한다. GitHub는 공식 형태의 채움 로고. ghost 메뉴는32px 높이. 히어로는 위쪽 정렬하며 CTA 두 개는56px(모바일50px) 동일 높이, 다운로드 글씨18px(모바일15px).
헤더 배경은 viewport 전체 너비를 채우고, 내부 정렬 컨테이너만 1208px로 제한한다. 오른쪽 내비게이션은 평상시 투명한 ghost이며 hover 때만 옅은 control surface를 표시한다.
헤더 내비게이션은 모든 항목을 세로 중앙에 맞추며 GitHub 공식 로고에는 이동 hover 효과를 적용하지 않는다.
키보드는 Mac ANSI 기반 6행(기능·숫자·QWERTY·홈·Shift·수정키/스페이스/역T 방향키)으로 구성한다. 거의 평면에 가까운12도 원근과 얕은 키 측면을 사용하고 실제 keydown/up 및 포인터 눌림에 3px 깊이 차로 반응한다. 모바일은 전체 배열을 축소한 시각 체험이며 글쓰기에는 별도 입력창을 사용한다.

설치 요청문은 기본으로 펼쳐 표시한다. 복사 상태 영역 높이는 성공·대기 상태에서도 유지해 아래 요청문 위치가 움직이지 않게 한다. 성공은 체크 아이콘으로 표시한다.

전역 서체 굵기는 사용자 요청으로 Regular(400)·Medium(500)만 사용한다. 제목·강조·버튼은500, 본문·보조 문구는400으로 통일한다.

## 스크롤 등장 모션 정교화
기본 스크롤은 유지한다. beui.dev scroll-animation의 native/reduced-motion 분리 원칙을 참고한다.
텍스트는 18px/600ms, 그래픽은 28px 및 .985배/760ms, easing [.22,1,.36,1].
같은 묶음 내 등장 간격은80ms이며 최대160ms로 제한한다. 화면 하단보다48px 안쪽에 도달하면
개별 요소가 한 번 등장한다. 부모와 자식에 중첩 모션을 적용하지 않는다.
초기 화면 밖 요소만 JS에서 준비하고, 모션 감소·키보드 포커스·정리 시 즉시 읽을 수 있게 복구한다.
SSR/JS 비활성 상태에서는 모든 콘텐츠가 보인다. 블러와 스크롤 가로채기는 사용하지 않는다.

## 에이전트 설치 메시 배경
에이전트 설치 영역 전체에 낮은 채도의 남색·청록·보라 radial-gradient를 넓게 겹친다.
배경은 정적으로 유지하며 본문·제목·아이콘은 흰색. 요청문에는 옅은 흰색 면,
복사 버튼에는 짙은 단색 남색을 사용해 가독성과 기존 solid 액션 규칙을 유지한다.
내부 여백은 데스크톱56px, 모바일28px/24px. 복사 상태 공간은 유지한다.


## FAQ 단일 열림
FAQ 그룹은 하나의 열린 항목 id를 공유한다. 같은 질문을 다시 누르면 모두 닫힌다.
답변 영역은 펼침과 접힘 모두 320ms 높이 전환, 180ms 페이드로 움직이며 도중 재입력도 반영한다.
닫힌 답변은 inert 및 aria-hidden으로 탐색에서 제외한다. 모션 감소 환경은 즉시 전환한다.

푸터는 왼쪽에 글가드와 MIT License만 배치한다. 슬로건·영문 중복 표기·버튼 배경을 제거한다.


## 키보드 참고 수정
사용자 제공 참고에 따라 맥북 본체·스피커·트랙패드를 제거한다. Mac 배열은 유지하고
정면 상단 시점의 어두운 키보드만 크게 배치한다. 원근 회전 없이 #171717 바닥,
#242424 키 표면, 얕은 1px 접촉 그림자와 1.5px 눌림을 사용한다.
하단은 화면 구도에 맞춰 일부 크롭한다. 예시의 장식 연결선·AI 문구는 가져오지 않는다.

에이전트 설치는 shell 밖 독립 전폭 영역으로 배치한다. 카드 라운드를 없애고 블루·청록·보라 메시를 더 선명하게 조정한다. 내용은 기존1160px 정렬선에 맞추며 모바일 좌우20px을 유지한다.

Caps Lock 안내는1160px 콘텐츠 폭을 모두 사용한다. 검은색 Mac 키 표면과 작은 상태등, Lucide Caps Lock 기호로 단순화한다. 보안 안내는 별도 2열 텍스트 섹션으로 추가하며 Sources에서 확인한 입력 기록 없음·네트워크 전송 없음·소스 공개만 설명한다.

히어로 상단 여백64px/모바일48px로 카피를 내린다. 키보드는 콘텐츠보다96px/모바일32px 넓게 확장하고 키 높이는72px/38px로 키운다. CTA 높이는48px/44px, 버튼 서체는Regular400으로 조정한다.


## 키 재질·잉크·메시 개선
참고: algorix-hq/www src/views/capabilities/key.tsx 및 styles/key.css.ts를 인증된 GitHub API로 읽었다.
중앙 각인과 얇은 명암 테두리를 현재 버튼 키에 적용한다. 과한 키 측면이나 본체는 추가하지 않는다.
MESH(https://meshgradient.com/)의 코럴/차가운 색 혼합 사례를 참고해 에이전트 배경을 코럴·로즈·아이리스로 변경한다.
히어로의 색 레이어와 검정 레이어는 같은1.25초 마스크 경로를 공유하고 검정은 뒤에서 부드럽게 섞인다.
타이핑 색은 입력을1.2초 멈추기 전까지 유지해 매 키마다 색이 바뀌는 플래시를 줄인다. 잉크 정착750ms.
히어로 버튼42px(모바일44px), 보조 버튼40px. 글씨400 유지.

주요 섹션 간격은 데스크톱144px/모바일88px 수준으로 확장한다. 동작 원리는 ‘좋은 하루’의 마지막 글자를 확정한 뒤 왼쪽 커서 이동하는 수동 데모로 설명한다. 개인정보 보호는 기존 검은 키 재질과 회색 표면을 사용해 내 Mac 안의 입력→앱 흐름을 보여준다. 암호화나 외부 보안 인증을 암시하지 않는다.

본문 설명의 키 이름은 재사용 가능한 `Kbd` 컴포넌트로 렌더링하며, 본문 행간에 맞춘 작은 키 표면과 전역 키 색 토큰을 사용한다.

히어로 보조 CTA는 ‘에이전트로 설치하기’로 표시하고 #agent-install에 연결한다. 액션 모서리는 공통14px/모바일12px로 통일하며 키캡·설치 단계 텍스트는 제외한다.

개인정보 그래픽은 실제 HangulComposer의 초성·중성·종성 상태에 맞춘 메모리 시각화로 교체한다. ㅎ→하→한→앱 확정·버퍼 초기화 순서로 최초 진입 시 한 번 재생하고 수동 재생 버튼을 제공한다. 메모리 측정·보안 삭제를 주장하지 않으며 모션 감소에서는 최종 상태를 바로 표시한다.

에이전트 전폭 배경은 사용자 요청에 따라 화이트·시안·블루로 교체한다. 독립된 배경 레이어에만44px(모바일32px) 블러를 적용해 텍스트는 선명하게 유지한다. 밝은 흰빛은 오른쪽 위, 시안은 반대쪽 아래에 두며 본문 뒤에는 블루를 유지한다.

배포 기록 페이지에는 제목 진입·본문 순차 등장·읽기 진행선·맨 위로 버튼을 적용한다. 위로 이동 시 제목에 포커스를 복구하며 모션 감소에서는 즉시 이동한다.


## 한글 자판 비율과 화이트 테마
Apple 2026 지원 이미지(https://support.apple.com/ko-kr/guide/macbook-pro/apdab672d5e9/2026/mac/26)로 전체 배열을 대조했다.
해당 이미지는 영문 각인이므로 한글 각인은 Apple 공식 M1 2020 GEO_KR 제품 이미지로 추가 대조했다:
https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/refurb-mbp13-silver-m1-2020_GEO_KR
육안 대조한 근사 비율: 일반 키 높이 대비 영문·한글 약23%, 기능 기호22%, F숫자12%.
영문 오른쪽 위·한글 왼쪽 아래·쌍자음 왼쪽 위. CSS cqw 단위로 각인과 키·간격을 함께 비례 축소한다.
배열은2026 기능키를 유지하며 화이트 표면으로 재해석한다. 최대1440px, 모든 행을 크롭 없이 표시한다.

에이전트 배경의 흰빛 범위를61%까지 넓히고 파란색을 부드러운 스카이블루로 낮춘다. 복사 버튼은44% 불투명도의 흰색과 짙은 청색 글씨,12px 배경 블러를 사용한다.

키보드는 히어로 하단 자동 밀착을 해제하고 카피 아래64px(모바일44px) 간격으로 둔다. 키보드 진입 이동 효과는 제거하고 하단80px/56px 여백을 확보한다.

Caps Lock 제목은 muted 상속을 끊고 ink 색을 명시한다. 키 종횡비25:14, 아이콘 너비10.667%, 글씨 크기5%, 상태등1.333%(모두 키 폭 기준)로 고정하며 내부 위치도 백분율로 유지한다.

키 폭은 (전체 폭−14개 간격)/15의 단위 키를 기준으로 계산한다. 넓은 키는 차지하는 단위 사이 간격까지 포함해 줄마다 다른 여백 수로 폭이 늘어나지 않게 한다. Touch ID는 단위 키 너비·높이로 정사각형 고정한다. Tab 포커스는 연한 블루2px 링과180ms 등장 효과, 모션 감소에서는 즉시 표시한다.

Typing practice uses a restrained blue/lavender highlight that settles into ink over one second, without randomized palette changes. The textarea has a fixed user-facing size (no resize handle), its clear action is ghost styled, and the centered helper copy breaks at sentence boundaries.
The typing highlight now carries the brand blue through a soft blue-to-lavender gradient before settling into ink. The status footer reserves at least40px with a deeper lower inset so ‘입력 준비됨’ does not crowd the panel edge. The release strip above and explanation boundary below the typing section do not draw horizontal rules.

The hero opening types through Korean two-set composition frames (ㅆ → 쓰, ㄷ → 더 → 던, ㅎ → 하 → 한, ㄱ → 그 → 글). Its final width stays reserved; reduced motion shows the completed phrase immediately. The finishing gradient follows composition.

The agent installation section uses a pale sky-blue, cyan and white mesh with blue-gray text for contrast on the lighter surface. Translucent white controls remain.

Keyboard key faces use a softened rim and near-flat white fill. Pressed keys stay neutral gray with 1px travel; the keyboard sits 20px lower below the hero copy.

Privacy visualization uses a 18×7 cell field: three column groups fill for initial, medial and final consonant composition, then clear as the app receives the syllable. Empty state labels stay blank instead of using dash placeholders. Brand-blue intensity is illustrative, never a memory metric. Reduced motion skips to the cleared buffer and committed text; replay restarts the sequence.
The privacy graphic surface uses a lighter low-saturation blue-gray in light mode and a charcoal blue-gray in dark mode; it does not use the former green-leaning neutral surface.

Action button and text-button labels use the shared 15px control token, with an 8px icon-to-label gap. Typographic step selectors and keycaps keep their own display scales.
Adjacent action buttons use only 8–12px gaps. The keyboard Touch ID legend is a solid circle without an outline.

The composition graphic enters once from 52px below at .96 scale with a restrained spring, making its scroll arrival distinct from the adjacent 18px text reveal. On that same first viewport entry it auto-plays the composing, committing and cursor-move phases; the button remains available for replay. Reduced motion shows the final phase immediately.

Korean body copy uses natural word boundaries and balanced wrapping instead of breaking words to fill a fixed width. The typing helper is grouped into two sentence-based lines, while the composition explanation starts a new line only when its meaning changes. Privacy detail descriptions are capped at 30rem so the right column does not become a single overly long line. Each privacy claim begins with a restrained 42px rounded-square Lucide icon using the shared accent and surface colors.

Dark mode follows the system appearance initially and can be toggled in the shared header; explicit selection persists locally across routes and reloads. Semantic canvas/surface/ink tokens plus dark component surfaces cover the keyboard, typing pad, privacy demo, install prompt, FAQ, release page and settings dialog. Mobile navigation remains within 320px, and code previews scroll horizontally inside the dialog.

Keyboard sizing is capped at 1320px / 90vw (92vw mobile), with a short upward entrance from 32px below and bottom alignment inside the hero. Row spacing resolves inside the same keyboard container as column spacing; arrow keys share the same gap. Reduced motion omits the entrance.

The agent section now derives its wash and glow directly from the #254acb brand blue using color-mix. A broad diagonal blue-to-white glow replaces cyan/teal mesh hues; dark mode mixes the same brand pigment into the canvas.

Keyboard legends use Mac modifier glyphs (⇧ ⇪ ⌃ ⌥ ⌘ ⇥ ↩ ⌫), filled directional triangles, and dedicated keycap SVGs for function symbols. F8 includes play/pause and F10 uses the unadorned speaker. Reference: https://support.apple.com/ko-kr/guide/macbook-pro/apdab672d5e9/2026/mac/26 . Site navigation icons remain Lucide.

Karabiner dialog uses a dimmed blurred backdrop, compact left-aligned instructions, ghost icon-only copy/close actions with accessible names, and theme-aware JSON token colors. Copy uses the original JSON source, not rendered markup.

The hero keyboard crops part of the bottom modifier/arrow row at its section boundary (3.6% of keyboard width). Hero copy sits 40px lower on desktop and 28px lower on mobile. Keyboard focus reveals the complete keys so cropped controls remain usable with Tab.

The typing practice textarea keeps its visible caret but does not draw an additional focus outline or focus animation, preserving the borderless input surface requested for this demo.

## 다크 테마 대비와 전환
조합 데모의 편집 글자는 항상 `--ink`를 사용한다. 조합 중인 음절은 라이트에서 옅은 코발트,
다크에서 짙은 코발트 표면과 밝은 잉크를 사용해 배경과 글자가 함께 보이게 한다.
메모리 셀은 테마별 팔레트를 사용한다. 다크 팔레트는 회색 빈 셀에서 브랜드 블루 계열의
다섯 단계로 밝아져 조합 진행을 표현하며, 전체 격자의 불투명도를 낮추지 않는다.
방향키 데모의 실행 버튼은 텍스트만 사용하고 완료 후 다시 보기에는 RotateCcw 아이콘을 유지한다.

테마 토글은 배경·표면·테두리 색을 300ms 동안 선형 보간한다. 글자와 아이콘 색은 전환 방향별
명도 교차점에서 교체해 양쪽 테마의 대비를 유지한다. 전체 화면 스냅샷 교차 페이드, 원형 확산,
방향성이 드러나는 마스크는 사용하지 않는다. 아이콘은 opacity와 transform으로 교체하고,
`prefers-reduced-motion`에서는 모든 테마 전환을 즉시 적용한다.
