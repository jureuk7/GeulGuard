import { styles } from "@/styles/styles.css.ts";
import { ArrowBigUpDash, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { FaqItem, FaqList } from "../components/faq/faq-item";
import { HeroSection } from "../components/hero/hero-section";
import { AgentInstall } from "../components/install/agent-install";
import { InstallStory } from "../components/install/install-story";
import { KarabinerPreview } from "../components/install/karabiner-preview";
import { CompositionDemo } from "../components/playground/composition-demo";
import { MemoryDemo } from "../components/playground/memory-demo";
import { TypingPad } from "../components/playground/typing-pad";
import { SecurityDetails } from "../components/privacy/security-details";
import { Kbd } from "../components/shared/kbd";
import { PageMotion } from "../components/shared/page-motion";
import { SiteHeader } from "../components/site/site-header";

export const revalidate = 3600;

const repository = "https://github.com/jureuk7/GeulGuard";
export default function Home() {
	return (
		<PageMotion>
			<a className={styles.skipLink} href="#main">
				본문으로 건너뛰기
			</a>
			<SiteHeader />
			<main id="main">
				<div className={styles.shell}>
					<HeroSection />
					<div className={styles.releaseLine} data-reveal>
						<Link className={`${styles.button} ${styles.secondary}`} href="/releases">
							배포 기록 보기
						</Link>
					</div>
					<section className={styles.trySection} aria-labelledby="try-title">
						<div className={styles.sectionIntro} data-reveal>
							<h2 id="try-title">익숙한 문장으로 확인해 보세요.</h2>
							<p>설치 후 한글을 쓰고, 지우고, 커서를 옮겨 보세요.</p>
						</div>
						<TypingPad />
					</section>
					<section id="how-it-works" className={styles.explanation} aria-labelledby="how-title">
						<div className={styles.explanationHeading}>
							<h2 id="how-title" data-reveal>
								다음 동작 전에,
								<br />
								한글부터 확정합니다.
							</h2>
							<CompositionDemo />
						</div>
						<div className={styles.explanationBody} data-reveal>
							<p className={styles.explanationLead}>
								<span>“좋은 하루”를 쓴 뒤 커서를 옮기면, 마지막 ‘루’는 조합 중일 수 있습니다.</span>
								<span>글가드는 ‘루’를 먼저 확정한 뒤 방향키 동작을 앱에 넘깁니다.</span>
							</p>
							<dl>
								<div>
									<dt>커서를 옮길 때</dt>
									<dd>
										<Kbd>방향키</Kbd>·<Kbd>Tab</Kbd>·<Kbd>Return</Kbd>으로 이동하기 전에 마지막 조합
										글자를 확정합니다.
									</dd>
								</div>
								<div>
									<dt>단축키를 누를 때</dt>
									<dd>
										<Kbd>Command</Kbd>·<Kbd>Control</Kbd>·<Kbd>Option</Kbd> 조합은 글자를 확정한 뒤
										원래 앱이 처리하도록 넘깁니다.
									</dd>
								</div>
								<div>
									<dt>한 글자를 고칠 때</dt>
									<dd>
										조합 중 <Kbd>Backspace</Kbd>를 누르면 자소를 하나씩 지웁니다. 예를 들어 ‘루’는
										‘ㄹ’로 돌아갑니다.
									</dd>
								</div>
							</dl>
							<a className={styles.textLink} href={`${repository}/blob/main/docs/compatibility.md`}>
								앱별 검증 결과와 현재 한계{" "}
							</a>
						</div>
					</section>
					<section className={styles.securitySection} aria-labelledby="security-title">
						<div className={styles.securityHeading} data-reveal>
							<p className={styles.securityEyebrow}>개인정보 보호</p>
							<h2 id="security-title">
								글가드는 문장을
								<br />
								수집하지 않습니다.
							</h2>
							<MemoryDemo />
							<a className={styles.textLink} href={`${repository}/tree/main/Sources`}>
								소스 코드 보기
							</a>
						</div>
						<SecurityDetails />
					</section>
					<section id="install" className={styles.installSection} aria-labelledby="install-title">
						<h2 id="install-title" className={styles.srOnly}>
							글가드 설치 방법
						</h2>
						<InstallStory />
						<section className={styles.capsNote} aria-labelledby="caps-title">
							<div className={styles.capsCopy} data-reveal>
								<p className={styles.capsEyebrow}>선택 설정 · Karabiner</p>
								<h3 id="caps-title">
									한·영 전환은
									<br />
									Caps Lock 하나로.
								</h3>
								<p className={styles.capsDescription}>
									대문자 고정 대신, 한글과 영어를 오가는 키로 쓰세요.
								</p>
								<KarabinerPreview />
							</div>
							<div className={styles.capsIllustration} data-reveal="visual" aria-hidden="true">
								<div className={styles.capsKeyBody}>
									<div className={styles.capsKeyFace}>
										<span className={styles.capsIndicator} />
										<ArrowBigUpDash size={32} strokeWidth={1.5} />
										<span>caps lock</span>
									</div>
								</div>
								<div className={styles.capsLanguages}>
									<span>ABC</span>
									<ArrowLeftRight size={16} strokeWidth={1.5} />
									<span>한글</span>
								</div>
							</div>
						</section>
					</section>
				</div>
				<AgentInstall />
				<div className={styles.shell}>
					<section className={styles.faqSection} aria-labelledby="faq-title">
						<h2 id="faq-title" data-reveal>
							설치 전에 궁금한 점
						</h2>
						<FaqList>
							<FaqItem title="두벌식 외 배열도 지원하나요?">
								<p>현재는 표준 두벌식만 지원합니다. 다른 한글 자판 배열도 지원할 예정입니다.</p>
							</FaqItem>
							<FaqItem title="모든 앱에서 사용할 수 있나요?">
								<p>
									VS Code 등 일부 환경에서 테스트했어요. 확인한 환경은{" "}
									<a href={`${repository}/blob/main/docs/compatibility.md`}>검증 기록</a>
									에서 볼 수 있어요.
								</p>
							</FaqItem>
							<FaqItem title="카라비너도 꼭 설치해야 하나요?">
								<p>
									아니요. 글가드는 macOS 입력 소스 전환 단축키로 사용할 수 있습니다. Caps Lock을
									대문자 고정 없이 전환 전용으로 쓰고 싶을 때 카라비너를 함께 사용합니다.
								</p>
							</FaqItem>
							<FaqItem title="이전 입력기로 돌아갈 수 있나요?">
								<p>
									메뉴 막대에서 기존 입력 소스를 선택하면 됩니다. 제거하려면 ABC로 전환한 뒤 시스템
									설정의 입력 소스 목록에서 글가드를 삭제하세요. 자세한 제거 절차는{" "}
									<a href={`${repository}/blob/main/docs/agent-setup.md#복구`}>설치 가이드</a>
									에서 확인할 수 있습니다.
								</p>
							</FaqItem>
							<FaqItem title="사용 중 문제가 생기면 어디에 알려야 하나요?">
								<p>
									<a href={`${repository}/issues`}>GitHub Issues</a>에 macOS 버전, 앱 이름과 버전,
									문제가 생기는 입력 순서를 남겨 주세요. 실제 환경에서의 재현 사례가 개선에 도움이
									됩니다.
								</p>
							</FaqItem>
						</FaqList>
					</section>
				</div>
			</main>
			<footer className={`${styles.siteFooter} ${styles.shell}`}>
				<Link className={styles.brand} href="/">
					글가드
				</Link>
				<a href={`${repository}/blob/main/LICENSE`}>MIT License </a>
			</footer>
		</PageMotion>
	);
}
