"use client";

import { styles } from "@/styles/styles.css.ts";
import { ArrowRight } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
} from "motion/react";
import { useRef, useState } from "react";

const steps = [
	{
		title: "설치 파일 실행",
		description: "GeulGuard.pkg를 열고 설치를 진행하세요. 관리자 인증이 필요합니다.",
	},
	{
		title: "다시 로그인",
		description: "작업을 저장하고 로그아웃한 뒤 다시 로그인하세요.",
	},
	{
		title: "글가드 입력 방식 추가",
		description: (
			<>
				시스템 설정{" "}
				<ArrowRight className={styles.inlineArrow} size={14} strokeWidth={1.5} aria-hidden="true" />{" "}
				키보드{" "}
				<ArrowRight className={styles.inlineArrow} size={14} strokeWidth={1.5} aria-hidden="true" />{" "}
				텍스트 입력{" "}
				<ArrowRight className={styles.inlineArrow} size={14} strokeWidth={1.5} aria-hidden="true" />{" "}
				편집에서 추가하세요.
			</>
		),
	},
];
const stepCount = steps.length;
const lastStepIndex = stepCount - 1;

export function InstallStory() {
	const container = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(0);
	const reduced = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	useMotionValueEvent(scrollYProgress, "change", (value) =>
		setActive(Math.min(lastStepIndex, Math.floor(value * stepCount))),
	);
	function selectStep(index: number) {
		const element = container.current;
		if (!element) return;
		const top = window.scrollY + element.getBoundingClientRect().top;
		window.scrollTo({
			top: top + (element.offsetHeight - window.innerHeight) * ((index + 0.5) / stepCount),
			behavior: reduced ? "instant" : "smooth",
		});
	}
	return (
		<div className={styles.installStory} ref={container}>
			<div className={styles.installStage}>
				<div className={styles.installStoryCopy} data-reveal>
					<p className={styles.installEyebrow}>설치는 세 단계면 끝.</p>
					<ol className={styles.storySteps}>
						{steps.map((step, index) => (
							<li key={step.title} data-active={index === active}>
								<button
									type="button"
									onClick={() => selectStep(index)}
									aria-current={index === active ? "step" : undefined}
								>
									<span className={styles.storyLabel}>{step.title}</span>
								</button>
								<p>{step.description}</p>
							</li>
						))}
					</ol>
					<a
						className={`${styles.textLink} ${styles.storyDownload}`}
						href="https://github.com/jureuk7/GeulGuard/releases/latest/download/GeulGuard.pkg"
					>
						설치 파일 다운로드
					</a>
				</div>
				<div className={styles.installArt} aria-hidden="true">
					<AnimatePresence initial={false} mode="popLayout">
						<motion.div
							className={styles.installArtScene}
							key={active}
							initial={{
								opacity: 0,
								y: reduced ? 0 : 24,
								scale: reduced ? 1 : 0.96,
							}}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: reduced ? 0 : -16 }}
							transition={{ duration: reduced ? 0 : 0.32 }}
						>
							{active === 0 && (
								<>
									<img
										className={styles.installPackageImage}
										src="/images/installer.png"
										alt=""
										width={1024}
										height={1024}
									/>
									<div className={styles.artCaption}>GeulGuard.pkg</div>
								</>
							)}
							{active === 1 && (
								<>
									<img
										className={styles.loginScreenshot}
										src="https://cdsassets.apple.com/live/7WUAS350/images/macos/sequoia/macos-sequoia-login-window-password-entry.png"
										alt=""
										width={1016}
										height={640}
									/>
									<div className={styles.artCaption}>다시 로그인하면 글가드를 불러옵니다</div>
								</>
							)}
							{active === 2 && (
								<div className={styles.sourceScene}>
									<img
										className={styles.sourceDesktop}
										src="/images/input-source.png"
										alt=""
										width={512}
										height={512}
									/>
								</div>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
