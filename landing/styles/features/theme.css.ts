import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { localVars } from "../local-vars.css";
import { classScopes } from "../class-scopes.css";

globalStyle(':root[data-theme="dark"]', {
	colorScheme: "dark",
});

globalStyle(
	`:root[data-theme="dark"]
	:is(
		${classScopes.secondary},
		${classScopes.textLink},
		${classScopes.textButton},
		${classScopes.faqItem} h3 button,
		${classScopes.compositionDemo},
		${classScopes.typingInput},
		${classScopes.padToolbar},
		${classScopes.padFooter},
		${classScopes.codePreview},
		${classScopes.codeToolbar},
		${classScopes.closeDialog}
	)`,
	{
		background: `${tokens.color.surface}`,
		color: `${tokens.color.ink}`,
	},
);

globalStyle(
	`:root[data-theme="dark"] :is(${classScopes.contentDialog}, ${classScopes.dialogHeader}, ${classScopes.memoryOutput})`,
	{
		background: `${tokens.palette.neutral925}`,
	},
);

globalStyle(
	`:root[data-theme="dark"]
	:is(
		${classScopes.siteHeader} nav a:hover,
		${classScopes.textLink}:hover,
		${classScopes.textButton}:hover,
		${classScopes.codeToolbar} button,
		${classScopes.memoryFooter} button
	)`,
	{
		background: `${tokens.color.controlSurfaceHover}`,
		color: `${tokens.color.ink}`,
	},
);

const keyboardDeckSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] &`]: {
			background: `${tokens.palette.neutral950}`,
			boxShadow: "none",
			vars: {
				[localVars.keyFaceStart]: tokens.palette.neutral825,
				[localVars.keyFaceMid]: tokens.palette.neutral850,
				[localVars.keyFaceEnd]: tokens.palette.neutral900,
			},
		},
	},
});

const keycapSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.keyboardDeck} &`]: {
			background: `${tokens.palette.neutral800}`,
			boxShadow: "none",
		},
	},
});

const keycapFaceSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.keyboardDeck} ${classScopes.keycap} &`]: {
			background: `linear-gradient(\n\t\t155deg,\n\t\t${localVars.keyFaceStart} 20%,\n\t\t${localVars.keyFaceMid} 70%,\n\t\t${localVars.keyFaceEnd}\n\t)`,
			color: `${tokens.palette.darkKeyInk}`,
			boxShadow: `inset 0 -1px 0 ${tokens.palette.whiteAlpha02}`,
		},
	},
});

globalStyle(
	`:root[data-theme="dark"] ${classScopes.keyboardDeck} :is(${classScopes.keycapHangul}, ${classScopes.keycapFunction})`,
	{
		color: `${tokens.palette.darkKeyText}`,
	},
);

const keycapFaceSelectorFragment2 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.keyboardDeck} ${classScopes.keycap}[data-pressed="true"] &`]:
			{
				background: `${tokens.palette.neutral750}`,
				color: `${tokens.palette.darkInk}`,
				boxShadow: `inset 0 1px 2px ${tokens.palette.blackAlpha20}`,
			},
	},
});
const keycapFaceSelectorFragment3 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.keyboardDeck} ${classScopes.keycap}:active &`]: {
			background: `${tokens.palette.neutral750}`,
			color: `${tokens.palette.darkInk}`,
			boxShadow: `inset 0 1px 2px ${tokens.palette.blackAlpha20}`,
		},
	},
});

const agentInstallSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] &`]: {
			background: localVars.agentWash,
			color: `${tokens.palette.darkAgentHeading}`,
			vars: {
				[localVars.agentWash]: `color-mix(in srgb, ${tokens.brand.blue} 22%, ${tokens.palette.neutral975})`,
				[localVars.agentGlow]: `color-mix(in srgb, ${tokens.brand.blue} 48%, ${tokens.palette.neutral975})`,
				[localVars.agentHighlight]: tokens.palette.darkBlueText,
			},
		},
	},
});

const agentInstallSelectorFragment2 = style({
	selectors: {
		[`:root[data-theme="dark"] &::before`]: {
			opacity: "1",
		},
	},
});

globalStyle(
	`:root[data-theme="dark"] ${classScopes.agentInstall} :is(p, ${classScopes.copyStatus}, ${classScopes.installPrompt})`,
	{
		color: `${tokens.palette.darkAgentText}`,
	},
);

const installPromptSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.agentInstall} &`]: {
			background: `${tokens.palette.whiteAlpha03}`,
		},
	},
});

const buttonSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.agentInstall} &`]: {
			background: `${tokens.palette.whiteAlpha09}`,
			color: `${tokens.palette.darkAgentAction}`,
		},
	},
});

const buttonSelectorFragment2 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.agentInstall} &:hover`]: {
			background: `${tokens.palette.whiteAlpha15}`,
		},
	},
});

const jsonKeySelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.codePreview} &`]: {
			color: `${tokens.palette.blue300}`,
		},
	},
});

const jsonStringSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.codePreview} &`]: {
			color: `${tokens.palette.green300}`,
		},
	},
});

const jsonLiteralSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.codePreview} &`]: {
			color: `${tokens.palette.purple300}`,
		},
	},
});

const jsonNumberSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] ${classScopes.codePreview} &`]: {
			color: `${tokens.palette.orange300}`,
		},
	},
});

globalStyle(
	`:root[data-theme="dark"] ${classScopes.contentDialog} ${classScopes.closeDialog},
:root[data-theme="dark"] ${classScopes.contentDialog} ${classScopes.codeToolbar} button`,
	{
		background: "transparent",
	},
);

globalStyle(
	`:root[data-theme="dark"] ${classScopes.contentDialog} ${classScopes.closeDialog}:hover,
:root[data-theme="dark"] ${classScopes.contentDialog} ${classScopes.codeToolbar} button:hover`,
	{
		background: `${tokens.color.controlSurfaceHover}`,
	},
);

globalStyle(
	`:root[data-theme="dark"] ${classScopes.contentDialog} ${classScopes.codeToolbar} button[type="button"]`,
	{
		background: "transparent",
	},
);

globalStyle(
	`:root[data-theme="dark"] ${classScopes.contentDialog} ${classScopes.codeToolbar} button[type="button"]:hover`,
	{
		background: `${tokens.color.controlSurfaceHover}`,
	},
);

const memoryGridSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] &`]: {
			opacity: "1",
		},
	},
});

const themeSunSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] &`]: {
			display: "block",
			opacity: "1",
			transform: "rotate(0) scale(1)",
		},
	},
});

const themeMoonSelectorFragment1 = style({
	selectors: {
		[`:root[data-theme="dark"] &`]: {
			display: "block",
			opacity: "0",
			transform: "rotate(24deg) scale(0.72)",
		},
	},
});

globalStyle(':root[data-theme-transition="to-dark"]', {
	vars: {
		[localVars.themeInkDelay]: tokens.motion.inkToDark,
	},
});

globalStyle(':root[data-theme-transition="to-light"]', {
	vars: {
		[localVars.themeInkDelay]: tokens.motion.inkToLight,
	},
});

globalStyle(
	':root[data-theme-transition^="to-"] body,\n:root[data-theme-transition^="to-"] body *,\n:root[data-theme-transition^="to-"] body *::before,\n:root[data-theme-transition^="to-"] body *::after',
	{
		transition: `background-color ${tokens.motion.base} ${tokens.motion.linear},\n\t\tborder-color ${tokens.motion.base} ${tokens.motion.linear},\n\t\tbox-shadow ${tokens.motion.base} ${tokens.motion.linear},\n\t\tcolor 0s ${tokens.motion.linear} ${localVars.themeInkDelay},\n\t\tfill 0s ${tokens.motion.linear} ${localVars.themeInkDelay},\n\t\tstroke 0s ${tokens.motion.linear} ${localVars.themeInkDelay}`,
	},
);

globalStyle(
	`:root[data-theme-transition^="to-"] ${classScopes.themeToggle} :is(${classScopes.themeSun}, ${classScopes.themeMoon})`,
	{
		transition: `opacity ${tokens.motion.icon} ${tokens.motion.ease},\n\t\ttransform ${tokens.motion.icon} ${tokens.motion.emphasized}`,
	},
);

const keyboardDeckSelectorFragment2 = style({
	selectors: {
		[`:root[data-theme-transition^="to-"] &`]: {
			transition: `${localVars.keyFaceStart.slice(4, -1)} ${tokens.motion.base} ${tokens.motion.linear},\n\t\t${localVars.keyFaceMid.slice(4, -1)} ${tokens.motion.base} ${tokens.motion.linear},\n\t\t${localVars.keyFaceEnd.slice(4, -1)} ${tokens.motion.base} ${tokens.motion.linear},\n\t\tbackground-color ${tokens.motion.base} ${tokens.motion.linear},\n\t\tbox-shadow ${tokens.motion.base} ${tokens.motion.linear}`,
		},
	},
});

const agentInstallSelectorFragment3 = style({
	selectors: {
		[`:root[data-theme-transition^="to-"] &`]: {
			transition: `${localVars.agentWash.slice(4, -1)} ${tokens.motion.base} ${tokens.motion.linear},\n\t\t${localVars.agentGlow.slice(4, -1)} ${tokens.motion.base} ${tokens.motion.linear},\n\t\t${localVars.agentHighlight.slice(4, -1)} ${tokens.motion.base} ${tokens.motion.linear},\n\t\tbackground-color ${tokens.motion.base} ${tokens.motion.linear},\n\t\tcolor 0s ${tokens.motion.linear} ${localVars.themeInkDelay}`,
		},
	},
});

globalStyle(
	`${classScopes.memoryGrid} > span,
	${classScopes.themeToggle} :is(${classScopes.themeSun}, ${classScopes.themeMoon}),
	:root[data-theme-transition^="to-"] body,
	:root[data-theme-transition^="to-"] body *,
	:root[data-theme-transition^="to-"] body *::before,
	:root[data-theme-transition^="to-"] body *::after,
	:root[data-theme-transition^="to-"] ${classScopes.keyboardDeck},
	:root[data-theme-transition^="to-"] ${classScopes.agentInstall}`,
	{
		"@media": {
			"(prefers-reduced-motion: reduce)": {
				transition: "none",
			},
		},
	},
);

export const styleFragments = {} as const;

export const selectorFragments = {
	keyboardDeck: [keyboardDeckSelectorFragment1, keyboardDeckSelectorFragment2],
	keycap: [keycapSelectorFragment1],
	keycapFace: [
		keycapFaceSelectorFragment1,
		keycapFaceSelectorFragment2,
		keycapFaceSelectorFragment3,
	],
	agentInstall: [
		agentInstallSelectorFragment1,
		agentInstallSelectorFragment2,
		agentInstallSelectorFragment3,
	],
	installPrompt: [installPromptSelectorFragment1],
	button: [buttonSelectorFragment1, buttonSelectorFragment2],
	jsonKey: [jsonKeySelectorFragment1],
	jsonString: [jsonStringSelectorFragment1],
	jsonLiteral: [jsonLiteralSelectorFragment1],
	jsonNumber: [jsonNumberSelectorFragment1],
	memoryGrid: [memoryGridSelectorFragment1],
	themeSun: [themeSunSelectorFragment1],
	themeMoon: [themeMoonSelectorFragment1],
} as const;
