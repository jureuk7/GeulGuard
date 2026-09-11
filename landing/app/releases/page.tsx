import { styles } from "@/styles/styles.css.ts";
import { ReleaseInteractions } from "../../components/releases/release-interactions";
import { ReleaseNotes } from "../../components/releases/release-notes";
import { PageMotion } from "../../components/shared/page-motion";
import { SiteHeader } from "../../components/site/site-header";

export const revalidate = 3600;
export const metadata = { title: "배포 기록 — 글가드" };

export default function ReleasesPage() {
	return (
		<PageMotion>
			<a className={styles.skipLink} href="#main">
				본문으로 건너뛰기
			</a>
			<SiteHeader />
			<ReleaseInteractions />
			<main id="main" className={`${styles.releasePage} ${styles.shell}`}>
				<div data-reveal className={styles.releasePageHeading}>
					<h1 id="release-title" tabIndex={-1}>
						배포 기록
					</h1>
					<p>글가드가 달라진 점을 모았습니다.</p>
				</div>
				<ReleaseNotes />
			</main>
		</PageMotion>
	);
}
