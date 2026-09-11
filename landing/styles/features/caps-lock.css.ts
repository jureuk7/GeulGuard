import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const capsNoteFragment1 = style({
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	alignItems: "center",
	width: "100%",
	maxWidth: "none",
	margin: `${tokens.space["24"]} auto 80px`,
	padding: `${tokens.space["16"]} 0`,
	gap: `${tokens.space["24"]}`,
});

const capsCopyFragment1 = style({
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.label}`,
});

const capsEyebrowSelectorFragment1 = style({
	selectors: {
		[`${classScopes.capsNote} &`]: {
			marginBottom: `${tokens.layout.inlineGap}`,
			color: `${tokens.color.muted}`,
			fontSize: `${tokens.type.size.caption}`,
		},
	},
});

globalStyle(`${classScopes.capsCopy} h3`, {
	color: `${tokens.color.ink}`,
	fontSize: `${tokens.type.fluid.capsTitle}`,
	fontWeight: `${tokens.type.weightMedium}`,
	lineHeight: "1.3",
	letterSpacing: "-0.045em",
});

const capsDescriptionSelectorFragment1 = style({
	selectors: {
		[`${classScopes.capsNote} &`]: {
			maxWidth: `${tokens.layout.capsCopyMax}`,
			margin: `20px 0 ${tokens.space["6"]}`,
			color: `${tokens.color.muted}`,
			fontSize: `${tokens.type.size.control}`,
			lineHeight: "1.75",
		},
	},
});

const textButtonSelectorFragment1 = style({
	selectors: {
		[`${classScopes.capsCopy} &`]: {
			padding: `${tokens.space["3"]} 20px`,
			background: `${tokens.color.primaryAction}`,
			color: `${tokens.color.onPrimary}`,
			fontSize: `${tokens.type.size.control}`,
		},
	},
});

const textButtonSelectorFragment2 = style({
	selectors: {
		[`${classScopes.capsCopy} &:hover`]: {
			background: `${tokens.color.primaryActionHover}`,
		},
	},
});

const capsIllustrationFragment1 = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: `${tokens.layout.mediumGap}`,
	flexDirection: "column",
});

const capsKeyBodyFragment1 = style({
	containerType: "inline-size",
	width: `${tokens.layout.capsVisualWidth}`,
	height: "auto",
	padding: "0",
	borderRadius: `${tokens.radius.action}`,
	aspectRatio: "25 / 14",
	background: `${tokens.palette.neutral1000}`,
	boxShadow: `0 3px 6px ${tokens.palette.blackAlpha07}`,
});

const capsKeyFaceFragment1 = style({
	position: "relative",
	display: "block",
	width: "100%",
	height: "auto",
	padding: "0",
	borderRadius: "13px",
	aspectRatio: "25 / 14",
	background: `${tokens.palette.neutral875}`,
	color: `${tokens.palette.neutral250}`,
	boxShadow: `inset 0 1px 0 ${tokens.palette.whiteAlpha07}`,
});

globalStyle(`${classScopes.capsKeyFace} svg`, {
	position: "absolute",
	top: "33%",
	left: "9.333%",
	width: "16%",
	height: "28.571%",
});

globalStyle(`${classScopes.capsKeyFace} span:not(${classScopes.capsIndicator})`, {
	position: "absolute",
	bottom: "12%",
	left: "9.333%",
	fontSize: "8.2cqw",
	fontWeight: `${tokens.type.weightRegular}`,
	lineHeight: "1",
	letterSpacing: "-0.02em",
});

const capsIndicatorSelectorFragment1 = style({
	selectors: {
		[`${classScopes.capsKeyFace} &`]: {
			position: "absolute",
			top: "13.095%",
			left: "9.333%",
			width: "2.4%",
			height: "4.286%",
			borderRadius: "50%",
			background: `${tokens.palette.neutral575}`,
		},
	},
});

const capsLanguagesFragment1 = style({
	display: "flex",
	alignItems: "center",
	gap: `${tokens.layout.inlineGap}`,
	color: `${tokens.palette.neutral525}`,
});

globalStyle(`${classScopes.capsLanguages} span`, {
	color: `${tokens.color.ink}`,
	fontSize: `${tokens.type.size.bodyLarge}`,
	fontWeight: `${tokens.type.weightMedium}`,
});

globalStyle(`${classScopes.capsLanguages} span:last-child`, {
	color: `${tokens.color.accent}`,
});

const capsNoteFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			gridTemplateColumns: "1fr",
			marginBlock: `${tokens.space["16"]}`,
			padding: "40px 0",
			gap: `${tokens.layout.wideGap}`,
			textAlign: "center",
		},
	},
});

globalStyle(`${classScopes.capsNote} ${classScopes.capsDescription}`, {
	"@media": {
		"(max-width: 640px)": {
			margin: `${tokens.space["4"]} auto ${tokens.space["6"]}`,
		},
	},
});

const capsIllustrationFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			gridRow: "1",
			gap: "22px",
		},
	},
});

const capsKeyBodyFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			width: `${tokens.layout.capsVisualWidthMobile}`,
			borderRadius: `${tokens.radius.action}`,
		},
	},
});

const capsKeyFaceFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			borderRadius: "11px",
		},
	},
});

export const styleFragments = {
	capsNote: [capsNoteFragment1, capsNoteFragment2],
	capsCopy: [capsCopyFragment1],
	capsIllustration: [capsIllustrationFragment1, capsIllustrationFragment2],
	capsKeyBody: [capsKeyBodyFragment1, capsKeyBodyFragment2],
	capsKeyFace: [capsKeyFaceFragment1, capsKeyFaceFragment2],
	capsLanguages: [capsLanguagesFragment1],
} as const;

export const selectorFragments = {
	capsEyebrow: [capsEyebrowSelectorFragment1],
	capsDescription: [capsDescriptionSelectorFragment1],
	textButton: [textButtonSelectorFragment1, textButtonSelectorFragment2],
	capsIndicator: [capsIndicatorSelectorFragment1],
} as const;
