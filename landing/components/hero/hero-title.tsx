"use client";

import { classScopes, styles } from "@/styles/styles.css.ts";
import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { designTokens } from "../../styles/design-tokens";

const colors = designTokens.brand.spectrum;
const opening = "쓰던 한글,";
const compositionFrames = [
	"ㅆ",
	"쓰",
	"쓰ㄷ",
	"쓰더",
	"쓰던",
	"쓰던 ",
	"쓰던 ㅎ",
	"쓰던 하",
	"쓰던 한",
	"쓰던 한ㄱ",
	"쓰던 한그",
	"쓰던 한글",
	opening,
];
const compositionInterval = 110;
const finishDelay = 1.55;

export function HeroTitle() {
	const reduced = useReducedMotion();
	const title = useRef<HTMLHeadingElement>(null);
	const [typed, setTyped] = useState("");
	const [spectrum, setSpectrum] = useState(colors.join(", "));
	useEffect(() => {
		const shuffled = [...colors];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const value = shuffled.at(i);
			const selected = shuffled.at(j);
			if (value === undefined || selected === undefined) break;
			shuffled[i] = selected;
			shuffled[j] = value;
		}
		setSpectrum(shuffled.join(", "));
	}, []);
	useEffect(() => {
		if (reduced || !title.current) return;
		setTyped("");
		const timers = compositionFrames.map((frame, index) =>
			setTimeout(() => setTyped(frame), (index + 1) * compositionInterval),
		);
		const ink = title.current.querySelector(`.${classScopes.heroInkLayer}`);
		const finish = ink
			? animate(
					ink,
					{ maskPosition: ["100% 0%", "0% 0%"], opacity: [0, 1] },
					{
						maskPosition: { duration: 1.25, delay: finishDelay, ease: [0.25, 0.1, 0.25, 1] },
						opacity: { duration: 0.85, delay: finishDelay + 0.65, ease: "easeInOut" },
					},
				)
			: undefined;
		return () => {
			timers.forEach(clearTimeout);
			finish?.complete();
		};
	}, [reduced]);
	return (
		<h1 ref={title} id="hero-title" aria-label="쓰던 한글, 끝까지.">
			<span className={styles.heroTyped} aria-hidden="true">
				<span className={styles.heroTypedSpace}>{opening}</span>
				<span className={styles.heroTypedComposition}>{reduced ? opening : typed}</span>
			</span>{" "}
			<br />
			<span className={`${styles.heroFinish} ${styles.heroSpectrumWrap}`} aria-hidden="true">
				<span className={styles.heroInkLayer}>끝까지.</span>
				{!reduced && (
					<motion.span
						className={styles.heroSpectrum}
						style={{ backgroundImage: `linear-gradient(105deg, ${spectrum})` }}
						initial={{ opacity: 0, maskPosition: "100% 0%" }}
						animate={{
							opacity: [0, 1, 1, 0],
							maskPosition: "0% 0%",
							backgroundPosition: ["30% 50%", "65% 50%"],
						}}
						transition={{
							duration: 1.8,
							delay: finishDelay,
							ease: [0.25, 0.1, 0.25, 1],
							maskPosition: { duration: 1.25, delay: finishDelay, ease: [0.25, 0.1, 0.25, 1] },
							opacity: { duration: 1.8, delay: finishDelay, times: [0, 0.15, 0.5, 1] },
						}}
					>
						끝까지.
					</motion.span>
				)}
			</span>
		</h1>
	);
}
