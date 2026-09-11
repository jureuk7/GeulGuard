import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const heroFragment1 = style({
	display: "flex",
	minHeight: `calc(100svh - ${tokens.layout.headerHeight})`,
	paddingTop: `${tokens.layout.heroTop}`,
	paddingBottom: "0",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	gap: `${tokens.space["16"]}`,
	overflow: "visible",
});

const heroCopyFragment1 = style({
	width: "100%",
	minWidth: "0",
	maxWidth: `${tokens.layout.heroCopyMax}`,
	textAlign: "center",
});

globalStyle(`${classScopes.hero} h1`, {
	fontSize: `${tokens.type.size.displayLarge}`,
	fontWeight: `${tokens.type.weightMedium}`,
	lineHeight: "1.18",
	letterSpacing: "-0.055em",
});

globalStyle(
	`${classScopes.hero} h1 br,
${classScopes.heroDescription} ${classScopes.desktopBreak}`,
	{
		display: "none",
	},
);

const heroDescriptionFragment1 = style({
	maxWidth: "100%",
	marginTop: `${tokens.space["6"]}`,
	fontSize: `${tokens.type.size.bodyLarge}`,
	lineHeight: "1.75",
});

const heroActionsFragment1 = style({
	display: "flex",
	maxWidth: "100%",
	alignItems: "stretch",
	justifyContent: "center",
	gap: `${tokens.space["3"]}`,
	marginTop: `${tokens.layout.actionOffset}`,
});

const buttonSelectorFragment1 = style({
	selectors: {
		[`${classScopes.heroActions} &`]: {
			height: `${tokens.layout.controlHeight}`,
			minHeight: `${tokens.layout.controlHeight}`,
			padding: `9px ${tokens.space["4"]}`,
			fontSize: `${tokens.type.size.control}`,
			fontWeight: `${tokens.type.weightRegular}`,
			lineHeight: "1.4",
		},
	},
});
const textLinkSelectorFragment1 = style({
	selectors: {
		[`${classScopes.heroActions} &`]: {
			height: `${tokens.layout.controlHeight}`,
			minHeight: `${tokens.layout.controlHeight}`,
			padding: `9px ${tokens.space["4"]}`,
			fontSize: `${tokens.type.size.control}`,
			fontWeight: `${tokens.type.weightRegular}`,
			lineHeight: "1.4",
		},
	},
});

const primarySelectorFragment1 = style({
	selectors: {
		[`${classScopes.heroActions} &`]: {
			fontWeight: `${tokens.type.weightRegular}`,
		},
	},
});

const heroTypedFragment1 = style({
	position: "relative",
	display: "inline-block",
	whiteSpace: "pre",
});

const heroTypedSpaceFragment1 = style({
	visibility: "hidden",
});

const heroTypedCompositionFragment1 = style({
	position: "absolute",
	inset: "0",
	textAlign: "left",
});

const heroFinishFragment1 = style({
	display: "inline-block",
	whiteSpace: "nowrap",
});

const heroSpectrumWrapFragment1 = style({
	position: "relative",
});

const heroSpectrumSelectorFragment1 = style({
	selectors: {
		[`&`]: {
			display: "inline-block",
			maskImage: `linear-gradient(to right, ${tokens.palette.black} 40%, transparent 60%)`,
			maskSize: "250% 100%",
			maskRepeat: "no-repeat",
		},
	},
});
const heroInkLayerSelectorFragment1 = style({
	selectors: {
		[`&`]: {
			display: "inline-block",
			maskImage: `linear-gradient(to right, ${tokens.palette.black} 40%, transparent 60%)`,
			maskSize: "250% 100%",
			maskRepeat: "no-repeat",
		},
	},
});

const heroSpectrumFragment1 = style({
	position: "absolute",
	inset: "0",
	color: "transparent",
	backgroundSize: "180% 100%",
	backgroundClip: "text",
	WebkitBackgroundClip: "text",
	pointerEvents: "none",
});

const heroSpectrumFragment2 = style({
	"@media": {
		"(forced-colors: active)": {
			display: "none",
		},
	},
});

globalStyle(`${classScopes.hero} h1`, {
	"@media": {
		"(max-width: 1000px)": {
			fontSize: `${tokens.type.size.displayMedium}`,
		},
	},
});

const heroFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			minHeight: "auto",
			paddingTop: `${tokens.layout.sectionBlockTight}`,
			paddingBottom: `${tokens.space["6"]}`,
			gap: `${tokens.space["8"]}`,
		},
	},
});

globalStyle(`${classScopes.hero} h1`, {
	"@media": {
		"(max-width: 640px)": {
			fontSize: `${tokens.type.size.displaySmall}`,
		},
	},
});

globalStyle(`${classScopes.hero} h1 br`, {
	"@media": {
		"(max-width: 640px)": {
			display: "block",
		},
	},
});

const heroDescriptionFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			marginTop: `${tokens.space["6"]}`,
			fontSize: `${tokens.type.size.control}`,
		},
	},
});

const heroActionsFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			flexFlow: "row wrap",
			alignItems: "center",
			gap: "10px",
			marginTop: "28px",
		},
	},
});

globalStyle(
	`${classScopes.heroActions} ${classScopes.button},
	${classScopes.heroActions} ${classScopes.textLink}`,
	{
		"@media": {
			"(max-width: 640px)": {
				height: `${tokens.layout.controlHeightMobile}`,
				minHeight: `${tokens.layout.controlHeightMobile}`,
				padding: `10px ${tokens.space["3"]}`,
				fontSize: `${tokens.type.size.control}`,
			},
		},
	},
);

export const styleFragments = {
	hero: [heroFragment1, heroFragment2],
	heroCopy: [heroCopyFragment1],
	heroDescription: [heroDescriptionFragment1, heroDescriptionFragment2],
	heroActions: [heroActionsFragment1, heroActionsFragment2],
	heroTyped: [heroTypedFragment1],
	heroTypedSpace: [heroTypedSpaceFragment1],
	heroTypedComposition: [heroTypedCompositionFragment1],
	heroFinish: [heroFinishFragment1],
	heroSpectrumWrap: [heroSpectrumWrapFragment1],
	heroSpectrum: [heroSpectrumFragment1, heroSpectrumFragment2],
} as const;

export const selectorFragments = {
	button: [buttonSelectorFragment1],
	textLink: [textLinkSelectorFragment1],
	primary: [primarySelectorFragment1],
	heroSpectrum: [heroSpectrumSelectorFragment1],
	heroInkLayer: [heroInkLayerSelectorFragment1],
} as const;
