import { styles } from "@/styles/styles.css.ts";
import { MotionLink } from "../shared/page-motion";
import { HeroTitle } from "./hero-title";
import { Keyboard } from "./keyboard";

const downloadUrl = "https://github.com/jureuk7/GeulGuard/releases/latest/download/GeulGuard.pkg";

export function HeroSection() {
	return (
		<section className={styles.hero} aria-labelledby="hero-title">
			<div className={styles.heroCopy} data-reveal>
				<p className={styles.platform}>macOS용 한글 입력기</p>
				<HeroTitle />
				<p className={styles.heroDescription}>
					문장을 고치다 한 글자가 사라졌나요?
					<br />
					글가드는 조합 중인 한글을 먼저 확정해
					<br className={styles.desktopBreak} /> 글자 누락을 줄입니다.
				</p>
				<div className={styles.heroActions}>
					<MotionLink className={`${styles.button} ${styles.primary}`} href={downloadUrl}>
						글가드 다운로드{" "}
						<svg
							width="18"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
							focusable="false"
						>
							<path d="M17.05 12.54c.03 3.19 2.8 4.25 2.83 4.26-.02.07-.44 1.52-1.46 3.02-.89 1.3-1.81 2.6-3.27 2.63-1.43.03-1.89-.85-3.53-.85-1.63 0-2.14.82-3.5.88-1.41.05-2.48-1.41-3.38-2.7-1.84-2.66-3.25-7.52-1.36-10.81a5.24 5.24 0 0 1 4.43-2.68c1.39-.03 2.7.93 3.54.93.84 0 2.42-1.15 4.08-.98.69.03 2.64.28 3.9 2.12-.1.06-2.33 1.36-2.28 4.18ZM14.37 4.42c.75-.9 1.25-2.15 1.11-3.4-1.08.04-2.39.72-3.16 1.62-.69.79-1.3 2.06-1.14 3.28 1.2.09 2.43-.61 3.19-1.5Z" />
						</svg>
					</MotionLink>
					<a className={styles.textLink} href="#agent-install">
						에이전트로 설치하기
					</a>
				</div>
				<p className={styles.downloadNote}>macOS 14 이상 · Apple Silicon 및 Intel</p>
			</div>
			<div className={styles.keyboardEntrance}>
				<Keyboard />
			</div>
		</section>
	);
}
