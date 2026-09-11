import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const keycapLetterSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			position: "absolute",
			top: "50%",
			left: "50%",
			fontSize: "1.35cqw",
			lineHeight: "1",
			transform: "translate(-50%, -50%)",
		},
	},
});

const keycapLetterSelectorFragment2 = style({
	selectors: {
		[`${classScopes.keyboardDeck} [data-hangul="true"] &`]: {
			top: "22%",
			right: "20%",
			left: "auto",
			transform: "none",
		},
	},
});

const keycapHangulSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			position: "absolute",
			top: "auto",
			right: "auto",
			bottom: "17%",
			left: "18%",
			color: `${tokens.palette.neutral700}`,
			fontSize: "1.35cqw",
			lineHeight: "1",
		},
	},
});

const keycapShiftedSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			position: "absolute",
			top: "17%",
			left: "50%",
			fontSize: "1.25cqw",
			lineHeight: "1",
			transform: "translateX(-50%)",
		},
	},
});

const keycapLetterSelectorFragment3 = style({
	selectors: {
		[`${classScopes.keyboardDeck} [data-shifted="true"]:not([data-hangul="true"]) &`]: {
			top: "auto",
			bottom: "16%",
			transform: "translateX(-50%)",
		},
	},
});

const keycapShiftedSelectorFragment2 = style({
	selectors: {
		[`${classScopes.keyboardDeck} [data-hangul="true"] &`]: {
			top: "20%",
			left: "18%",
			fontSize: "1.2cqw",
			transform: "none",
		},
	},
});

globalStyle(`${classScopes.keyboardDeck} ${classScopes.keycap} svg`, {
	position: "absolute",
	top: "50%",
	left: "50%",
	width: "1.3cqw",
	height: "1.3cqw",
	transform: "translate(-50%, -50%)",
});

globalStyle(`${classScopes.keyboardDeck} ${classScopes.keyboardRow0} ${classScopes.keycap} svg`, {
	top: "34%",
});

const keycapFunctionSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			position: "absolute",
			bottom: "16%",
			left: "50%",
			color: `${tokens.palette.neutral600}`,
			fontSize: "0.72cqw",
			transform: "translateX(-50%)",
		},
	},
});

globalStyle(`${classScopes.keyboardDeck} ${classScopes.keyboardRow0} [data-code="Power"] svg`, {
	top: "50%",
	width: "3.1cqw",
	height: "3.1cqw",
	color: `${tokens.palette.neutral500}`,
});

const keycapLetterSelectorFragment4 = style({
	selectors: {
		[`${classScopes.keyboardDeck} ${classScopes.keyboardRow0} [data-code="Escape"] &`]: {
			top: "auto",
			bottom: "16%",
			left: "16%",
			fontSize: "1cqw",
			transform: "none",
		},
	},
});

const keycapSymbolSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			position: "absolute",
			top: "50%",
			left: "50%",
			fontFamily: '"SF Pro Text", "Apple Symbols", -apple-system, sans-serif',
			fontSize: "1.65cqw",
			fontWeight: `${tokens.type.weightRegular}`,
			lineHeight: "1",
			transform: "translate(-50%, -50%)",
		},
	},
});

export const styleFragments = {} as const;

export const selectorFragments = {
	keycapLetter: [
		keycapLetterSelectorFragment1,
		keycapLetterSelectorFragment2,
		keycapLetterSelectorFragment3,
		keycapLetterSelectorFragment4,
	],
	keycapHangul: [keycapHangulSelectorFragment1],
	keycapShifted: [keycapShiftedSelectorFragment1, keycapShiftedSelectorFragment2],
	keycapFunction: [keycapFunctionSelectorFragment1],
	keycapSymbol: [keycapSymbolSelectorFragment1],
} as const;
