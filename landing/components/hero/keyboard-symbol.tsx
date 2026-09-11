import type { ReactNode } from "react";
import { styles } from "@/styles/styles.css.ts";

const glyphs: Record<string, string> = {
	ShiftLeft: "⇧",
	ShiftRight: "⇧",
	CapsLock: "⇪",
	ControlLeft: "⌃",
	AltLeft: "⌥",
	AltRight: "⌥",
	MetaLeft: "⌘",
	MetaRight: "⌘",
	Tab: "⇥",
	Enter: "↩",
	Backspace: "⌫",
	ArrowLeft: "◀",
	ArrowRight: "▶",
	ArrowUp: "▲",
	ArrowDown: "▼",
};
const speaker = <path d="M3 10h4l5-4v12l-5-4H3z" fill="currentColor" stroke="none" />;
const symbols: Record<string, ReactNode> = {
	F1: (
		<>
			<circle cx="12" cy="12" r="3" />
			<path d="M12 4v2m0 12v2M4 12h2m12 0h2M6.3 6.3l1.4 1.4m8.6 8.6 1.4 1.4M6.3 17.7l1.4-1.4m8.6-8.6 1.4-1.4" />
		</>
	),
	F2: (
		<>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
		</>
	),
	F3: (
		<>
			<rect x="2" y="4" width="20" height="16" rx="1" />
			<path d="M2 11h20M10 4v7m4 0v9" />
		</>
	),
	F4: (
		<>
			<circle cx="10" cy="10" r="6" />
			<path d="m14.5 14.5 6 6" />
		</>
	),
	F5: (
		<>
			<rect x="9" y="2" width="6" height="12" rx="3" />
			<path d="M6 10v1a6 6 0 0 0 12 0v-1m-6 7v5m-3 0h6" />
		</>
	),
	F6: <path d="M19 16A9 9 0 0 1 8 5a9 9 0 1 0 11 11Z" />,
	F7: <path d="m2 12 9-6v12zm10 0 9-6v12z" fill="currentColor" stroke="none" />,
	F8: (
		<>
			<path d="m3 5 10 7-10 7z" fill="currentColor" stroke="none" />
			<path d="M16 5v14m5-14v14" strokeWidth="2.5" />
		</>
	),
	F9: <path d="m22 12-9-6v12zm-10 0L3 6v12z" fill="currentColor" stroke="none" />,
	F10: speaker,
	F11: (
		<>
			{speaker}
			<path d="M15 9a5 5 0 0 1 0 6" />
		</>
	),
	F12: (
		<>
			{speaker}
			<path d="M15 9a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12m3-15a13 13 0 0 1 0 18" />
		</>
	),
	Fn: (
		<>
			<circle cx="12" cy="12" r="9" />
			<ellipse cx="12" cy="12" rx="4" ry="9" />
			<path d="M3 12h18M5 6.5h14M5 17.5h14" />
		</>
	),
	Power: <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />,
};

export function KeyboardSymbol({ code }: { readonly code: string }) {
	const glyph = glyphs[code];
	if (glyph)
		return (
			<span
				className={
					code.startsWith("Arrow")
						? `${styles.keycapSymbol} ${styles.keycapDirection}`
						: styles.keycapSymbol
				}
				aria-hidden="true"
			>
				{glyph}
			</span>
		);
	const symbol = symbols[code];
	if (!symbol) return null;
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{symbol}
		</svg>
	);
}

export function hasKeyboardSymbol(code: string) {
	return code in glyphs || code in symbols;
}
