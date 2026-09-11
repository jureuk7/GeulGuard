"use client";

import { styles } from "@/styles/styles.css.ts";
import { RotateCcw } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const phaseMessages = [
	"‘루’는 아직 조합 중입니다.",
	"먼저 ‘루’를 확정합니다.",
	"글자는 남고, 커서만 왼쪽으로 이동합니다.",
] as const;

export function CompositionDemo() {
	const [phase, setPhase] = useState(0);
	const demoRef = useRef<HTMLDivElement>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const reduced = useReducedMotion();
	const visible = useInView(demoRef, { once: true, amount: 0.35 });
	useEffect(() => () => clearTimeout(timer.current), []);
	useEffect(() => {
		if (!visible) return;
		clearTimeout(timer.current);
		if (reduced) {
			setPhase(2);
			return;
		}
		setPhase(0);
		timer.current = setTimeout(() => {
			setPhase(1);
			timer.current = setTimeout(() => setPhase(2), 450);
		}, 240);
		return () => clearTimeout(timer.current);
	}, [visible, reduced]);
	function play() {
		clearTimeout(timer.current);
		if (phase === 2) {
			setPhase(0);
			return;
		}
		setPhase(1);
		timer.current = setTimeout(() => setPhase(2), reduced ? 0 : 450);
	}
	return (
		<div className={styles.compositionDemo} data-reveal="graphic-strong" ref={demoRef}>
			<p className={styles.demoEyebrow}>방향키를 누르는 순간</p>
			<div className={styles.demoEditor} aria-hidden="true">
				좋은 하
				<span className={styles.demoSyllable} data-composing={phase === 0}>
					루
					<motion.i
						initial={false}
						animate={{ left: phase === 2 ? "0%" : "100%" }}
						transition={{ duration: reduced ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
					/>
				</span>
			</div>
			<p className={styles.demoStatus} aria-live="polite">
				{phaseMessages[phase] ?? phaseMessages[0]}
			</p>
			<button type="button" className={styles.textButton} onClick={play} disabled={phase === 1}>
				{phase === 2 && <RotateCcw size={16} strokeWidth={1.5} aria-hidden="true" />}
				{phase === 2 ? "다시 보기" : "방향키 눌러보기"}
			</button>
			<p className={styles.demoCaption}>조합 확정 순서를 보여주는 예시입니다.</p>
		</div>
	);
}
