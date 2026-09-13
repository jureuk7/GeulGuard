import { styles } from "@/styles/styles.css.ts";
import { HeroTitle } from "./hero-title";
import { Keyboard } from "./keyboard";
import { PlatformDownload } from "./platform-download";

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
					<PlatformDownload href={downloadUrl} />
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
