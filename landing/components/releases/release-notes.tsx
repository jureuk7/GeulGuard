import { styles } from "@/styles/styles.css.ts";
import ky from "ky";
import Markdown from "react-markdown";
import { MotionLink } from "../shared/page-motion";

const changelogUrl = "https://raw.githubusercontent.com/jureuk7/GeulGuard/main/CHANGELOG.md";
const sourceUrl = "https://github.com/jureuk7/GeulGuard/blob/main/CHANGELOG.md";

export async function ReleaseNotes() {
	let markdown: string;
	try {
		markdown = await ky.get(changelogUrl, { timeout: 5000, retry: 1 }).text();
	} catch (error: unknown) {
		if (!(error instanceof Error)) throw error;
		return (
			<section aria-label="배포 기록 내용">
				<p>배포 기록을 불러오지 못했어요.</p>
				<MotionLink className={`${styles.button} ${styles.secondary}`} href={sourceUrl}>
					GitHub에서 확인하기
				</MotionLink>
			</section>
		);
	}
	return (
		<section aria-label="배포 기록 내용">
			<div className={styles.changelog} data-reveal>
				<Markdown skipHtml components={{ h1: () => null }}>
					{markdown}
				</Markdown>
			</div>
			<MotionLink className={`${styles.button} ${styles.secondary}`} href={sourceUrl}>
				GitHub 원문 보기
			</MotionLink>
		</section>
	);
}
