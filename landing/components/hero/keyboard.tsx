"use client";

import { styles } from "@/styles/styles.css.ts";
import { localVars } from "@/styles/local-vars.css.ts";
import { motion, useReducedMotion } from "motion/react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { hasKeyboardSymbol, KeyboardSymbol } from "./keyboard-symbol";

type Key = { code: string; label: string; hangul?: string; width?: number };
const letters = (latin: string, korean: string): Key[] =>
	Array.from(latin).map((letter, index) => ({
		code: `Key${letter}`,
		label: letter,
		hangul: Array.from(korean)[index] ?? "",
	}));
const rows: Key[][] = [
	[
		{ code: "Escape", label: "esc", width: 1.5 },
		...Array.from({ length: 12 }, (_, i) => ({ code: `F${i + 1}`, label: `F${i + 1}` })),
		{ code: "Power", label: "Touch ID", width: 1 },
	],
	[
		{ code: "Backquote", label: "`" },
		...Array.from("1234567890").map((n) => ({ code: `Digit${n}`, label: n })),
		{ code: "Minus", label: "−" },
		{ code: "Equal", label: "=" },
		{ code: "Backspace", label: "delete", width: 2 },
	],
	[
		{ code: "Tab", label: "tab", width: 1.5 },
		...letters("QWERTYUIOP", "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ"),
		{ code: "BracketLeft", label: "[" },
		{ code: "BracketRight", label: "]" },
		{ code: "Backslash", label: "\\", width: 1.5 },
	],
	[
		{ code: "CapsLock", label: "caps lock", width: 1.75 },
		...letters("ASDFGHJKL", "ㅁㄴㅇㄹㅎㅗㅓㅏㅣ"),
		{ code: "Semicolon", label: ";" },
		{ code: "Quote", label: "'" },
		{ code: "Enter", label: "return", width: 2.25 },
	],
	[
		{ code: "ShiftLeft", label: "shift", width: 2.25 },
		...letters("ZXCVBNM", "ㅋㅌㅊㅍㅠㅜㅡ"),
		{ code: "Comma", label: "," },
		{ code: "Period", label: "." },
		{ code: "Slash", label: "/" },
		{ code: "ShiftRight", label: "shift", width: 2.75 },
	],
	[
		{ code: "Fn", label: "fn" },
		{ code: "ControlLeft", label: "control" },
		{ code: "AltLeft", label: "option" },
		{ code: "MetaLeft", label: "command", width: 1.25 },
		{ code: "Space", label: "space", width: 5.5 },
		{ code: "MetaRight", label: "command", width: 1.25 },
		{ code: "AltRight", label: "option" },
	],
];
const shifted: Record<string, string> = {
	Backquote: "~",
	Digit1: "!",
	Digit2: "@",
	Digit3: "#",
	Digit4: "$",
	Digit5: "%",
	Digit6: "^",
	Digit7: "&",
	Digit8: "*",
	Digit9: "(",
	Digit0: ")",
	Minus: "_",
	Equal: "+",
	BracketLeft: "{",
	BracketRight: "}",
	Backslash: "|",
	Semicolon: ":",
	Quote: '"',
	Comma: "<",
	Period: ">",
	Slash: "?",
	KeyQ: "ㅃ",
	KeyW: "ㅉ",
	KeyE: "ㄸ",
	KeyR: "ㄲ",
	KeyT: "ㅆ",
	KeyO: "ㅒ",
	KeyP: "ㅖ",
};
const arrows: Key[] = [
	{ code: "ArrowLeft", label: "←" },
	{ code: "ArrowUp", label: "↑" },
	{ code: "ArrowDown", label: "↓" },
	{ code: "ArrowRight", label: "→" },
];

function getKeyLabel(key: Key) {
	if (key.code === "Space") return "";
	if (key.code === "CapsLock") return "⇪";
	return key.label;
}

export function Keyboard() {
	const reduceMotion = useReducedMotion();
	const [pressed, setPressed] = useState<ReadonlySet<string>>(new Set());
	const [clicked, setClicked] = useState("");
	const releaseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	useEffect(() => {
		function press(event: KeyboardEvent) {
			if (event.repeat) return;
			setPressed((previous) => new Set([...previous, event.code]));
		}
		function release(event: KeyboardEvent) {
			setPressed((previous) => {
				const next = new Set(previous);
				next.delete(event.code);
				return next;
			});
		}
		function reset() {
			setPressed(new Set());
			setClicked("");
		}
		window.addEventListener("keydown", press);
		window.addEventListener("keyup", release);
		window.addEventListener("blur", reset);
		document.addEventListener("visibilitychange", reset);
		return () => {
			window.removeEventListener("keydown", press);
			window.removeEventListener("keyup", release);
			window.removeEventListener("blur", reset);
			document.removeEventListener("visibilitychange", reset);
			clearTimeout(releaseTimer.current);
		};
	}, []);

	function animateKey(code: string) {
		clearTimeout(releaseTimer.current);
		setClicked(code);
		releaseTimer.current = setTimeout(() => setClicked(""), 160);
	}

	function renderKey(key: Key) {
		const active = pressed.has(key.code) || clicked === key.code;

		return (
			<button
				type="button"
				key={key.code}
				className={styles.keycap}
				style={{ [localVars.keyUnits.slice(4, -1)]: key.width ?? 1 } as CSSProperties}
				data-hangul={Boolean(key.hangul)}
				data-shifted={Boolean(shifted[key.code])}
				data-code={key.code}
				data-pressed={active}
				aria-label={`${key.label} 키 눌림 체험`}
				onPointerDown={() => {
					clearTimeout(releaseTimer.current);
					setClicked(key.code);
				}}
				onPointerLeave={() => setClicked("")}
				onPointerCancel={() => setClicked("")}
				onClick={() => animateKey(key.code)}
			>
				<motion.span
					className={styles.keycapFace}
					initial={false}
					animate={{ y: active ? 1 : 0 }}
					transition={
						reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 650, damping: 32 }
					}
				>
					{hasKeyboardSymbol(key.code) ? (
						<KeyboardSymbol code={key.code} />
					) : (
						<span className={styles.keycapLetter}>{getKeyLabel(key)}</span>
					)}
					{/^[F][0-9]+$/.test(key.code) && (
						<span className={styles.keycapFunction}>{key.label}</span>
					)}
					{shifted[key.code] && <span className={styles.keycapShifted}>{shifted[key.code]}</span>}
					{key.hangul && <span className={styles.keycapHangul}>{key.hangul}</span>}
				</motion.span>
			</button>
		);
	}
	return (
		<div className={styles.keyboardScene}>
			<fieldset className={styles.keyboardDeck}>
				<legend className={styles.srOnly}>눌러 보는 MacBook Pro 키보드</legend>
				{rows.map((row, index) => (
					<div
						className={
							index === 0 ? `${styles.keyboardRow} ${styles.keyboardRow0}` : styles.keyboardRow
						}
						key={index}
					>
						{row.map(renderKey)}
						{index === 5 && <div className={styles.arrowCluster}>{arrows.map(renderKey)}</div>}
					</div>
				))}
			</fieldset>
		</div>
	);
}
