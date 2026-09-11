import { globalKeyframes, globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

globalKeyframes("focus-ring-in", {
	from: {
		outlineColor: "transparent",
		outlineOffset: "2px",
	},
	to: {
		outlineColor: `${tokens.color.focusRing}`,
		outlineOffset: "4px",
	},
});

globalStyle("h1,\nh2,\nh3,\nh4,\nh5,\nh6,\nstrong,\nb", {
	fontWeight: `${tokens.type.weightMedium}`,
});

globalStyle(
	`${classScopes.textLink},
${classScopes.textButton},
${classScopes.siteHeader} nav a`,
	{
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: `${tokens.space["2"]}`,
		background: `${tokens.color.controlSurface}`,
		color: `${tokens.color.ink}`,
		border: "0",
		borderRadius: `${tokens.radius.small}`,
		minHeight: "44px",
		padding: `10px ${tokens.space["4"]}`,
		textDecoration: "none",
	},
);

const secondaryFragment1 = style({
	background: `${tokens.color.controlSurface}`,
});

globalStyle(
	`${classScopes.textLink}:hover,
${classScopes.textButton}:hover,
${classScopes.siteHeader} nav a:hover`,
	{
		background: `${tokens.color.controlSurfaceHover}`,
	},
);

globalStyle(`${classScopes.codeToolbar} button`, {
	background: `${tokens.color.controlSurface}`,
	border: "0",
	borderRadius: `${tokens.radius.base}`,
	padding: `${tokens.space["2"]} ${tokens.space["3"]}`,
	minHeight: `${tokens.layout.compactControlHeight}`,
	textDecoration: "none",
});

globalStyle("button:disabled", {
	cursor: "wait",
});

const buttonSelectorFragment1 = style({
	selectors: {
		[`&`]: {
			fontWeight: `${tokens.type.weightRegular}`,
		},
	},
});
const textButtonSelectorFragment1 = style({
	selectors: {
		[`&`]: {
			fontWeight: `${tokens.type.weightRegular}`,
		},
	},
});
const textLinkSelectorFragment1 = style({
	selectors: {
		[`&`]: {
			fontWeight: `${tokens.type.weightRegular}`,
		},
	},
});

const textLinkSelectorFragment2 = style({
	selectors: {
		[`&`]: {
			minHeight: `${tokens.layout.textControlHeight}`,
			padding: `${tokens.layout.textControlPaddingY} ${tokens.layout.textControlPaddingX}`,
			fontSize: `${tokens.type.size.control}`,
		},
	},
});
const textButtonSelectorFragment2 = style({
	selectors: {
		[`&`]: {
			minHeight: `${tokens.layout.textControlHeight}`,
			padding: `${tokens.layout.textControlPaddingY} ${tokens.layout.textControlPaddingX}`,
			fontSize: `${tokens.type.size.control}`,
		},
	},
});

globalStyle(
	`${classScopes.button},
${classScopes.textLink},
${classScopes.textButton},
${classScopes.siteHeader} nav a,
${classScopes.codeToolbar} button,
${classScopes.faqItem} h3 button,
${classScopes.capsCopy} ${classScopes.textButton}`,
	{
		borderRadius: `${tokens.radius.action}`,
	},
);

globalStyle(
	`a:focus-visible,
button:focus-visible,
${classScopes.agentInstall} ${classScopes.button}:focus-visible`,
	{
		outline: `2px solid ${tokens.color.focusRing}`,
		outlineOffset: "4px",
	},
);

globalStyle("a:focus-visible,\n\tbutton:focus-visible", {
	"@media": {
		"(prefers-reduced-motion: no-preference)": {
			animation: `focus-ring-in ${tokens.motion.fast} ${tokens.motion.standard}`,
		},
	},
});

export const styleFragments = {
	secondary: [secondaryFragment1],
} as const;

export const selectorFragments = {
	button: [buttonSelectorFragment1],
	textButton: [textButtonSelectorFragment1, textButtonSelectorFragment2],
	textLink: [textLinkSelectorFragment1, textLinkSelectorFragment2],
} as const;
