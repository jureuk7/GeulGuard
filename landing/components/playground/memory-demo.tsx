"use client";

import { styles } from "@/styles/styles.css.ts";
import { localVars } from "@/styles/local-vars.css.ts";
import { ArrowDown, Cpu, RotateCcw } from "lucide-react";
import { type MotionStyle, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const gridColumns = 18;
const groupColumns = 6;
const gridRows = 7;
const slotLabels = ["초성", "중성", "종성"] as const;
const cells = Array.from({ length: gridColumns * gridRows }, (_, index) => ({
	index,
	column: index % gridColumns,
	group: Math.floor((index % gridColumns) / groupColumns),
	intensity: (index * gridRows + Math.floor(index / gridColumns) * 3) % 5,
}));
const frames = [
	{ slots: ["", "", ""], text: "", label: "입력을 기다립니다." },
	{ slots: ["ㅎ", "", ""], text: "ㅎ", label: "초성을 메모리에 담습니다." },
	{ slots: ["ㅎ", "ㅏ", ""], text: "하", label: "모음이 더해져 ‘하’가 됩니다." },
	{ slots: ["ㅎ", "ㅏ", "ㄴ"], text: "한", label: "받침까지 모이면 ‘한’이 됩니다." },
	{ slots: ["", "", ""], text: "", label: "앱에 확정하고, 조합 상태를 비웁니다." },
] as const;

export function MemoryDemo() {
	const root = useRef<HTMLDivElement>(null);
	const visible = useInView(root, { once: true, amount: 0.5 });
	const reduced = useReducedMotion();
	const [phase, setPhase] = useState(0);
	const [replay, setReplay] = useState(0);
	useEffect(() => {
		if (!visible) return;
		if (reduced) {
			setPhase(4);
			return;
		}
		setPhase(0);
		const timers = [1, 2, 3, 4].map((step) => setTimeout(() => setPhase(step), step * 1100));
		return () => timers.forEach(clearTimeout);
	}, [visible, reduced, replay]);
	const frame = frames[phase] ?? frames[0];
	return (
		<div className={styles.memoryDemo} ref={root}>
			<div className={styles.memoryHeading}>
				<Cpu size={18} strokeWidth={1.5} />
				<span>내 Mac · 조합 메모리</span>
			</div>
			<div className={styles.memoryField} aria-hidden="true">
				<div className={styles.memoryFieldLabels}>
					<span>조합 버퍼</span>
					<span>{phase > 0 && phase < 4 ? "임시 보관 중" : "비어 있음"}</span>
				</div>
				<div className={styles.memoryGrid}>
					{cells.map((cell) => {
						const active = phase > cell.group && phase < 4;
						const delay =
							(cell.column % groupColumns) * 0.025 + Math.floor(cell.index / gridColumns) * 0.012;
						return (
							<motion.span
								key={cell.index}
								data-active={active}
								data-intensity={cell.intensity}
								style={{ [localVars.memoryDelay.slice(4, -1)]: `${delay}s` } as MotionStyle}
								animate={{ scale: active ? 1 : 0.92 }}
								transition={{
									duration: reduced ? 0 : 0.45,
									delay: reduced ? 0 : delay,
									ease: [0.22, 1, 0.36, 1],
								}}
							/>
						);
					})}
				</div>
				<div className={styles.memoryFieldLegend}>
					{frame.slots.map((value, index) => (
						<span key={index} data-filled={Boolean(value)}>
							{slotLabels[index]}
							<b>{value}</b>
						</span>
					))}
				</div>
			</div>
			<div className={styles.memoryOutput} aria-hidden="true">
				<span>조합 중</span>
				<strong>{frame.text}</strong>
				<ArrowDown size={16} strokeWidth={1.5} />
				<span>사용 중인 앱</span>
				<strong data-committed={phase === 4}>{phase === 4 ? "한" : ""}</strong>
			</div>
			<p className={styles.memoryStatus} role="status">
				{frame.label}
			</p>
			<div className={styles.memoryFooter}>
				<span>메모리 사용량이 아닌 조합 과정 예시</span>
				<button
					type="button"
					aria-label="메모리 조합 다시 보기"
					onClick={() => setReplay((value) => value + 1)}
				>
					<RotateCcw size={15} strokeWidth={1.5} />
				</button>
			</div>
		</div>
	);
}
