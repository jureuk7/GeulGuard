"use client";

import { styles } from "@/styles/styles.css.ts";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

function splitInsertion(previous: string, next: string) {
	const before = Array.from(previous);
	const after = Array.from(next);
	let start = 0;
	while (start < before.length && start < after.length && before[start] === after[start]) start++;
	let tail = 0;
	while (
		tail < before.length - start &&
		tail < after.length - start &&
		before[before.length - 1 - tail] === after[after.length - 1 - tail]
	)
		tail++;
	return {
		prefix: after.slice(0, start).join(""),
		inserted: after.slice(start, after.length - tail).join(""),
		suffix: tail ? after.slice(-tail).join("") : "",
	};
}

function getInputStatus(composing: boolean, focused: boolean) {
	if (composing) return "한글 조합 중";
	if (focused) return "입력 중";
	return "입력 준비됨";
}

export function TypingPad() {
	const inputId = useId();
	const helpId = useId();
	const reduceMotion = useReducedMotion();
	const [content, setContent] = useState({
		value: "",
		prefix: "",
		inserted: "",
		suffix: "",
		revision: 0,
	});
	const [composing, setComposing] = useState(false);
	const [focused, setFocused] = useState(false);
	const [scrollTop, setScrollTop] = useState(0);

	function updateText(value: string) {
		setContent((previous) => ({
			value,
			...splitInsertion(previous.value, value),
			revision: previous.revision + 1,
		}));
	}

	return (
		<div className={styles.typingPad} data-reveal>
			<div className={styles.padToolbar}>
				<label htmlFor={inputId}>한 문장 써 보세요</label>
			</div>
			<div className={styles.typingInput}>
				<div className={styles.typingMirror} aria-hidden="true">
					<div style={{ transform: `translateY(${-scrollTop}px)` }}>
						{content.prefix}
						<motion.span
							key={content.revision}
							className={styles.freshInk}
							initial={reduceMotion ? false : { color: "rgba(23, 29, 38, 0)" }}
							animate={{ color: "var(--ink)" }}
							transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
						>
							{content.inserted}
						</motion.span>
						{content.suffix}
						{"\n"}
					</div>
				</div>
				<textarea
					id={inputId}
					placeholder="여기에 자유롭게 입력해 보세요."
					value={content.value}
					spellCheck={false}
					onFocus={() => {
						setFocused(true);
					}}
					onBlur={() => setFocused(false)}
					onChange={(event) => {
						updateText(event.target.value);
					}}
					onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
					onCompositionStart={() => setComposing(true)}
					onCompositionEnd={() => setComposing(false)}
					aria-describedby={helpId}
				/>
			</div>
			<div className={styles.padFooter}>
				<span aria-live="polite">{getInputStatus(composing, focused)}</span>
			</div>
			<p id={helpId} className={styles.typingHelp}>
				<span>이 공간은 일반 입력창입니다. 글가드를 설치한 뒤 입력 소스를 바꿔 사용하세요.</span>
				<span>입력 내용은 저장하거나 전송하지 않습니다.</span>
			</p>
		</div>
	);
}
