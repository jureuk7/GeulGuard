import { styles } from "@/styles/styles.css.ts";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
	return (
		<header className={styles.siteHeader}>
			<div className={styles.headerInner}>
				<a className={styles.brand} href="/" aria-label="글가드 처음으로">
					<span className={styles.brandWordmark}>
						글가드<span className={styles.brandDot}>.</span>
					</span>
				</a>
				<nav aria-label="주 메뉴">
					<Link href="/releases">배포 기록</Link>
					<a href="/#install">설치 방법</a>
					<a href="https://github.com/jureuk7/GeulGuard" className={styles.githubLink}>
						<span className={styles.srOnly}>GitHub 저장소</span>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.419-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.553 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.431.372.815 1.102.815 2.222v3.293c0 .319.216.694.825.576A12.003 12.003 0 0 0 12 .297Z" />
						</svg>
					</a>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
