import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const trySectionFragment1 = style({
	display: "flex",
	padding: `144px 0 ${tokens.space["24"]}`,
	flexDirection: "column",
	alignItems: "center",
	gap: "36px",
});

const sectionIntroSelectorFragment1 = style({
	selectors: {
		[`${classScopes.trySection} &`]: {
			textAlign: "center",
		},
	},
});

globalStyle(`${classScopes.trySection} ${classScopes.sectionIntro} p`, {
	marginTop: `${tokens.space["4"]}`,
});

globalStyle(`${classScopes.trySection} ${classScopes.sectionIntro} br`, {
	display: "none",
});

const typingPadSelectorFragment1 = style({
	selectors: {
		[`${classScopes.trySection} &`]: {
			width: "min(100%, 760px)",
		},
	},
});

const typingPadFragment1 = style({
	minWidth: "0",
});

const padToolbarFragment1 = style({
	display: "flex",
	justifyContent: "space-between",
	padding: `${tokens.space["4"]} 20px`,
	border: "0",
	borderRadius: "12px 12px 0 0",
	background: `${tokens.palette.neutral100}`,
	fontSize: `${tokens.type.size.meta}`,
});

globalStyle(`${classScopes.padToolbar} label`, {
	fontWeight: `${tokens.type.weightMedium}`,
});

globalStyle(`${classScopes.typingInput} textarea`, {
	display: "block",
	resize: "vertical",
	minHeight: "156px",
	width: "100%",
	padding: `${tokens.space["6"]} 20px`,
	border: `1px solid ${tokens.color.line}`,
	borderBlock: "0",
	borderRadius: "0",
	background: `${tokens.color.surface}`,
	color: `${tokens.color.ink}`,
	fontSize: `${tokens.type.size.lead}`,
	lineHeight: "1.6",
});

globalStyle(`${classScopes.typingInput} textarea:focus-visible`, {
	outlineOffset: "-3px",
});

globalStyle(`${classScopes.typingInput} textarea`, {
	"@media": {
		"(max-width: 640px)": {
			fontSize: `${tokens.type.size.subtitle}`,
			padding: "20px 14px",
		},
	},
});

const typingInputFragment1 = style({
	position: "relative",
	background: `${tokens.palette.neutral100}`,
});

globalStyle(`${classScopes.typingInput} textarea`, {
	position: "relative",
	zIndex: "1",
	resize: "none",
	border: "0",
	background: "transparent",
	color: "transparent",
	caretColor: `${tokens.color.ink}`,
	outline: "none",
	boxShadow: "none",
	scrollbarGutter: "stable",
	wordBreak: "keep-all",
	overflowWrap: "break-word",
});

globalStyle(
	`${classScopes.typingInput} textarea:focus,
${classScopes.typingInput} textarea:focus-visible`,
	{
		outline: "none",
		boxShadow: "none",
		animation: "none",
	},
);

globalStyle(`${classScopes.typingInput} textarea::placeholder`, {
	color: `${tokens.color.muted}`,
	opacity: "1",
});

globalStyle(`${classScopes.typingInput} textarea::selection`, {
	background: `${tokens.palette.blueAlpha15}`,
	color: `${tokens.color.ink}`,
});

const typingMirrorFragment1 = style({
	position: "absolute",
	inset: "0",
	padding: `${tokens.space["6"]} 20px`,
	overflow: "hidden",
	scrollbarGutter: "stable",
	whiteSpace: "pre-wrap",
	overflowWrap: "break-word",
	wordBreak: "keep-all",
	pointerEvents: "none",
	font: "inherit",
	fontSize: `${tokens.type.size.lead}`,
	lineHeight: "1.6",
});

const freshInkSelectorFragment1 = style({
	selectors: {
		[`${classScopes.typingPad} &`]: {
			backgroundImage: `linear-gradient(108deg, ${tokens.color.accent} 0%, color-mix(in srgb, ${tokens.color.accent} 72%, ${tokens.palette.blue300}) 42%, color-mix(in srgb, ${tokens.color.accent} 38%, ${tokens.palette.purple300}) 74%, ${tokens.color.accent} 100%)`,
			backgroundClip: "text",
			WebkitBackgroundClip: "text",
		},
	},
});

const padFooterFragment1 = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	minHeight: "40px",
	padding: `${tokens.space["2"]} ${tokens.space["3"]} ${tokens.space["3"]} 20px`,
	border: "0",
	borderRadius: "0 0 12px 12px",
	background: `${tokens.palette.neutral100}`,
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.caption}`,
	lineHeight: "1.4",
});

const typingHelpSelectorFragment1 = style({
	selectors: {
		[`${classScopes.typingPad} &`]: {
			maxWidth: "none",
			marginTop: `${tokens.space["3"]}`,
			textAlign: "center",
			fontSize: `${tokens.type.size.caption}`,
			lineHeight: "1.8",
		},
	},
});

globalStyle(`${classScopes.typingHelp} span`, {
	display: "block",
	wordBreak: "keep-all",
});

globalStyle(`${classScopes.typingInput} textarea`, {
	"@media": {
		"(forced-colors: active)": {
			color: "CanvasText",
			caretColor: "CanvasText",
		},
	},
});

const typingMirrorFragment2 = style({
	"@media": {
		"(forced-colors: active)": {
			display: "none",
		},
	},
});

const trySectionFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			paddingBlock: "56px",
			gap: `${tokens.space["6"]}`,
		},
	},
});

globalStyle(`${classScopes.trySection} ${classScopes.sectionIntro} p`, {
	"@media": {
		"(max-width: 640px)": {
			marginTop: `${tokens.space["4"]}`,
		},
	},
});

const padToolbarFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			gap: `${tokens.space["2"]}`,
			padding: "14px",
			fontSize: `${tokens.type.size.caption}`,
		},
	},
});

const typingMirrorFragment3 = style({
	"@media": {
		"(max-width: 640px)": {
			padding: "20px 14px",
			fontSize: `${tokens.type.size.subtitle}`,
		},
	},
});

globalStyle(`${classScopes.typingHelp} span:first-child`, {
	"@media": {
		"(max-width: 640px)": {
			maxWidth: "34em",
			marginInline: "auto",
		},
	},
});

export const styleFragments = {
	trySection: [trySectionFragment1, trySectionFragment2],
	typingPad: [typingPadFragment1],
	padToolbar: [padToolbarFragment1, padToolbarFragment2],
	typingInput: [typingInputFragment1],
	typingMirror: [typingMirrorFragment1, typingMirrorFragment2, typingMirrorFragment3],
	padFooter: [padFooterFragment1],
} as const;

export const selectorFragments = {
	sectionIntro: [sectionIntroSelectorFragment1],
	typingPad: [typingPadSelectorFragment1],
	freshInk: [freshInkSelectorFragment1],
	typingHelp: [typingHelpSelectorFragment1],
} as const;
