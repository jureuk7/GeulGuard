import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const securitySectionFragment1 = style({
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gap: `${tokens.space["24"]}`,
	paddingBlock: `${tokens.layout.sectionBlock}`,
});

const securityEyebrowSelectorFragment1 = style({
	selectors: {
		[`${classScopes.securityHeading} &`]: {
			fontSize: `${tokens.type.size.meta}`,
			marginBottom: `${tokens.layout.controlInset}`,
		},
	},
});

globalStyle(`${classScopes.securityHeading} h2`, {
	fontSize: `${tokens.type.fluid.securityTitle}`,
	lineHeight: "1.3",
	letterSpacing: "-0.045em",
	fontWeight: `${tokens.type.weightMedium}`,
});

const textLinkSelectorFragment1 = style({
	selectors: {
		[`${classScopes.securityHeading} &`]: {
			marginTop: "28px",
			fontSize: `${tokens.type.size.control}`,
		},
	},
});

const securityDetailsFragment1 = style({
	display: "grid",
	margin: "0",
});

globalStyle(`${classScopes.securityDetails} dt`, {
	fontSize: `${tokens.type.size.bodyLarge}`,
	fontWeight: `${tokens.type.weightMedium}`,
	marginBottom: "10px",
});

globalStyle(`${classScopes.securityDetails} dd`, {
	margin: "0",
	maxWidth: "30rem",
	fontSize: `${tokens.type.size.control}`,
	lineHeight: "1.8",
	color: `${tokens.color.muted}`,
});

const securitySectionFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			gridTemplateColumns: "1fr",
			gap: `${tokens.layout.contentGap}`,
			paddingBlock: `${tokens.layout.sectionBlockSecurityMobile}`,
		},
	},
});

const securityDetailsFragment2 = style({
	alignContent: "center",
	gap: `${tokens.layout.contentGap}`,
});

const securityDetailIconFragment1 = style({
	display: "grid",
	placeItems: "center",
	width: "42px",
	height: "42px",
	marginBottom: `${tokens.space["4"]}`,
	borderRadius: "11px",
	background: `color-mix(in srgb, ${tokens.color.accent} 9%, ${tokens.color.surface})`,
	color: `color-mix(in srgb, ${tokens.color.accent} 72%, ${tokens.color.muted})`,
});

globalStyle(`${classScopes.securityDetail} dt`, {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	marginBottom: `${tokens.space["2"]}`,
});

const securityDetailIconFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			width: "40px",
			height: "40px",
			marginBottom: "14px",
			borderRadius: `${tokens.radius.medium}`,
		},
	},
});

export const styleFragments = {
	securitySection: [securitySectionFragment1, securitySectionFragment2],
	securityDetails: [securityDetailsFragment1, securityDetailsFragment2],
	securityDetailIcon: [securityDetailIconFragment1, securityDetailIconFragment2],
} as const;

export const selectorFragments = {
	securityEyebrow: [securityEyebrowSelectorFragment1],
	textLink: [textLinkSelectorFragment1],
} as const;
