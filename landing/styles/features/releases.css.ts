import { globalKeyframes, globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

globalKeyframes("release-heading-in", {
	from: {
		opacity: "0",
		transform: "translateY(10px)",
	},
	to: {
		opacity: "1",
		transform: "none",
	},
});

const releaseLineFragment1 = style({
	display: "flex",
	fontSize: `${tokens.type.size.meta}`,
	color: `${tokens.color.muted}`,
});

globalStyle(`${classScopes.releaseLine} a`, {
	display: "inline-flex",
	alignItems: "center",
	gap: "6px",
});

const releaseLineFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			alignItems: "flex-start",
			gap: "20px",
			fontSize: `${tokens.type.size.caption}`,
		},
	},
});

globalStyle(`${classScopes.releaseLine} a`, {
	"@media": {
		"(max-width: 640px)": {
			whiteSpace: "nowrap",
		},
	},
});

const releaseLineFragment3 = style({
	paddingBlock: `${tokens.space["6"]}`,
});

const releaseLineFragment4 = style({
	justifyContent: "center",
});

globalStyle(`${classScopes.changelog} h2`, {
	fontSize: `${tokens.type.size.headingSmall}`,
	margin: `28px 0 ${tokens.space["4"]}`,
});

globalStyle(`${classScopes.changelog} h3`, {
	fontSize: `${tokens.type.size.bodyLarge}`,
	margin: `20px 0 ${tokens.space["3"]}`,
});

globalStyle(`${classScopes.changelog} ul`, {
	paddingLeft: "22px",
	color: `${tokens.color.muted}`,
});

globalStyle(`${classScopes.changelog} li`, {
	marginBottom: `${tokens.space["3"]}`,
	textWrap: "pretty",
});

globalStyle(`${classScopes.changelog} p`, {
	marginBottom: `${tokens.space["4"]}`,
});

const releasePageFragment1 = style({
	maxWidth: `${tokens.layout.releaseMaxWidth}`,
	paddingTop: `${tokens.space["16"]}`,
	paddingBottom: `${tokens.layout.releaseBottom}`,
});

const releasePageHeadingFragment1 = style({
	marginBottom: "56px",
});

globalStyle(`${classScopes.releasePage} h1`, {
	fontSize: `${tokens.type.fluid.releaseTitle}`,
	letterSpacing: "-0.05em",
});

globalStyle(`${classScopes.releasePageHeading} p`, {
	marginTop: `${tokens.space["4"]}`,
	color: `${tokens.color.muted}`,
});

globalStyle(`${classScopes.releasePage} ${classScopes.changelog} h2`, {
	marginTop: `${tokens.space["12"]}`,
});

globalStyle(`${classScopes.releasePage} ${classScopes.changelog} h3`, {
	marginTop: `${tokens.space["6"]}`,
});

const buttonSelectorFragment1 = style({
	selectors: {
		[`${classScopes.releasePage} &`]: {
			marginTop: "40px",
		},
	},
});

const releasePageFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			paddingTop: `${tokens.space["8"]}`,
		},
	},
});

const releaseProgressFragment1 = style({
	position: "fixed",
	top: "0",
	left: "0",
	right: "0",
	height: "3px",
	background: `${tokens.color.accent}`,
	transformOrigin: "left",
	zIndex: "50",
	pointerEvents: "none",
});

const releaseTopFragment1 = style({
	position: "fixed",
	bottom: "24px",
	right: "24px",
	display: "flex",
	alignItems: "center",
	gap: `${tokens.space["2"]}`,
	border: "0",
	padding: `${tokens.space["3"]} ${tokens.space["4"]}`,
	borderRadius: `${tokens.radius.action}`,
	background: `${tokens.color.primaryAction}`,
	color: `${tokens.color.onPrimary}`,
	font: "inherit",
	fontSize: `${tokens.type.size.control}`,
	fontWeight: `${tokens.type.weightRegular}`,
	zIndex: "20",
});

const releaseTopSelectorFragment1 = style({
	selectors: {
		[`&:hover`]: {
			background: `${tokens.color.primaryActionHover}`,
		},
	},
});

globalStyle(`${classScopes.releasePage} ${classScopes.changelog} a`, {
	color: `${tokens.color.accent}`,
	transition: `color ${tokens.motion.fast} ${tokens.motion.ease}`,
});

globalStyle(`${classScopes.releasePage} ${classScopes.changelog} a:hover`, {
	color: `${tokens.color.accentHover}`,
});

const releasePageHeadingFragment2 = style({
	"@media": {
		"(prefers-reduced-motion: no-preference)": {
			animation: `release-heading-in ${tokens.motion.slow} ${tokens.motion.emphasized} both`,
		},
	},
});

const releaseTopFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			right: "20px",
			bottom: "20px",
		},
	},
});

export const styleFragments = {
	releaseLine: [
		releaseLineFragment1,
		releaseLineFragment2,
		releaseLineFragment3,
		releaseLineFragment4,
	],
	releasePage: [releasePageFragment1, releasePageFragment2],
	releasePageHeading: [releasePageHeadingFragment1, releasePageHeadingFragment2],
	releaseProgress: [releaseProgressFragment1],
	releaseTop: [releaseTopFragment1, releaseTopFragment2],
} as const;

export const selectorFragments = {
	button: [buttonSelectorFragment1],
	releaseTop: [releaseTopSelectorFragment1],
} as const;
