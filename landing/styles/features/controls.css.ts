import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";

const buttonFragment1 = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: `${tokens.space["2"]}`,
	minHeight: `${tokens.layout.buttonHeight}`,
	padding: `${tokens.space["3"]} ${tokens.layout.buttonPaddingX}`,
	borderRadius: `${tokens.radius.base}`,
	border: `${tokens.layout.hairline} solid transparent`,
	fontSize: `${tokens.type.size.control}`,
	fontWeight: `${tokens.type.weightMedium}`,
	whiteSpace: "nowrap",
	transition: `background-color ${tokens.motion.quick},\n\t\ttransform ${tokens.motion.quick}`,
});

const buttonSelectorFragment1 = style({
	selectors: {
		[`&:hover`]: {
			textDecoration: "none",
		},
	},
});

const buttonSelectorFragment2 = style({
	selectors: {
		[`&:active`]: {
			transform: "translateY(1px)",
		},
	},
});

const primaryFragment1 = style({
	background: `${tokens.color.primaryAction}`,
	color: `${tokens.color.onPrimary}`,
});

const primarySelectorFragment1 = style({
	selectors: {
		[`&:hover`]: {
			background: `${tokens.color.primaryActionHover}`,
		},
	},
});

const secondaryFragment1 = style({
	border: "0",
	background: `${tokens.palette.neutral175}`,
	color: `${tokens.color.ink}`,
});

const secondarySelectorFragment1 = style({
	selectors: {
		[`&:hover`]: {
			background: `${tokens.color.controlSurfaceHover}`,
		},
	},
});

const downloadNoteFragment1 = style({
	fontSize: `${tokens.type.size.caption}`,
	marginTop: `${tokens.space["4"]}`,
});

globalStyle("dt", {
	fontWeight: `${tokens.type.weightMedium}`,
	fontSize: `${tokens.type.size.control}`,
});

globalStyle("dd", {
	margin: "0",
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.control}`,
});

const skipLinkFragment1 = style({
	position: "absolute",
	top: "8px",
	left: `${tokens.space["6"]}`,
	transform: "translateY(-200%)",
	background: `${tokens.color.surface}`,
	padding: `${tokens.space["3"]}`,
	zIndex: "10",
});

const skipLinkSelectorFragment1 = style({
	selectors: {
		[`&:focus`]: {
			transform: "none",
		},
	},
});

const shellFragment1 = style({
	"@media": {
		"(max-width: 640px)": {
			paddingInline: `${tokens.layout.pageGutterMobile}`,
		},
	},
});

const platformFragment1 = style({
	"@media": {
		"(max-width: 640px)": {
			marginBottom: `${tokens.layout.pageGutterMobile}`,
		},
	},
});

const downloadNoteFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			fontSize: `${tokens.type.size.fine}`,
		},
	},
});

globalStyle("h2", {
	"@media": {
		"(max-width: 640px)": {
			fontSize: `${tokens.type.size.section}`,
		},
	},
});

globalStyle("html", {
	"@media": {
		"(prefers-reduced-motion: reduce)": {
			scrollBehavior: "auto",
		},
	},
});

globalStyle("*", {
	"@media": {
		"(prefers-reduced-motion: reduce)": {
			transition: "none !important",
		},
	},
});

globalStyle("a svg,\nbutton svg", {
	flexShrink: "0",
	verticalAlign: "middle",
});

const srOnlyFragment1 = style({
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clipPath: "inset(50%)",
	whiteSpace: "nowrap",
	border: "0",
});

const inlineArrowFragment1 = style({
	display: "inline-block",
	verticalAlign: "-0.15em",
	flexShrink: "0",
});

export const styleFragments = {
	button: [buttonFragment1],
	primary: [primaryFragment1],
	secondary: [secondaryFragment1],
	downloadNote: [downloadNoteFragment1, downloadNoteFragment2],
	skipLink: [skipLinkFragment1],
	shell: [shellFragment1],
	platform: [platformFragment1],
	srOnly: [srOnlyFragment1],
	inlineArrow: [inlineArrowFragment1],
} as const;

export const selectorFragments = {
	button: [buttonSelectorFragment1, buttonSelectorFragment2],
	primary: [primarySelectorFragment1],
	secondary: [secondarySelectorFragment1],
	skipLink: [skipLinkSelectorFragment1],
} as const;
