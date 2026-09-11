import { globalKeyframes, globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { localVars } from "../local-vars.css";
import { classScopes } from "../class-scopes.css";

globalKeyframes("copy-spin", {
	to: {
		transform: "rotate(360deg)",
	},
});

const agentInstallFragment1 = style({
	position: "relative",
	isolation: "isolate",
	display: "grid",
	gridTemplateColumns: "1fr auto",
	alignItems: "center",
	columnGap: `${tokens.space["8"]}`,
	width: "100%",
	marginTop: "0",
	padding: `80px max(${tokens.space["6"]}, calc((100% - 1160px) / 2))`,
	overflow: "hidden",
	background: localVars.agentWash,
	color: `${tokens.palette.blue850}`,
	vars: {
		[localVars.agentWash]: `color-mix(in srgb, ${tokens.brand.blue} 14%, white)`,
		[localVars.agentGlow]: `color-mix(in srgb, ${tokens.brand.blue} 28%, white)`,
		[localVars.agentHighlight]: tokens.palette.white,
	},
});

const agentInstallSelectorFragment1 = style({
	selectors: {
		[`&::before`]: {
			content: '""',
			position: "absolute",
			zIndex: "-1",
			inset: "-72px",
			background: `radial-gradient(ellipse at 88% 0%, ${localVars.agentHighlight} 0%, transparent 65%),\n\t\tradial-gradient(ellipse at 18% 110%, ${localVars.agentGlow} 0%, transparent 72%), ${localVars.agentWash}`,
			filter: "blur(52px)",
			pointerEvents: "none",
		},
	},
});

globalStyle(`${classScopes.agentInstall} h3`, {
	fontSize: `${tokens.type.fluid.agentTitle}`,
	fontWeight: `${tokens.type.weightMedium}`,
	letterSpacing: "-0.04em",
});

globalStyle(`${classScopes.agentInstall} p`, {
	marginTop: `${tokens.space["3"]}`,
	fontSize: `${tokens.type.size.label}`,
});

globalStyle(`${classScopes.agentInstall} > div > p`, {
	lineHeight: "1.8",
});

globalStyle(
	`${classScopes.agentInstall} p,
${classScopes.agentInstall} ${classScopes.copyStatus},
${classScopes.agentInstall} ${classScopes.installPrompt}`,
	{
		color: `${tokens.palette.blue850}`,
	},
);

const copyStatusSelectorFragment1 = style({
	selectors: {
		[`${classScopes.agentInstall} &`]: {
			gridColumn: "1 / -1",
		},
	},
});
const installPromptSelectorFragment1 = style({
	selectors: {
		[`${classScopes.agentInstall} &`]: {
			gridColumn: "1 / -1",
		},
	},
});

const copyStatusSelectorFragment2 = style({
	selectors: {
		[`${classScopes.agentInstall} &`]: {
			minHeight: "24px",
			margin: `${tokens.space["2"]} 0`,
		},
	},
});

const buttonSelectorFragment1 = style({
	selectors: {
		[`${classScopes.agentInstall} &`]: {
			minHeight: "40px",
			padding: `10px ${tokens.space["4"]}`,
			background: `${tokens.palette.whiteAlpha44}`,
			color: `${tokens.palette.blue850}`,
			fontSize: `${tokens.type.size.control}`,
			backdropFilter: "blur(12px)",
		},
	},
});

const buttonSelectorFragment2 = style({
	selectors: {
		[`${classScopes.agentInstall} &:hover`]: {
			background: `${tokens.palette.whiteAlpha65}`,
			color: `${tokens.palette.blue900}`,
		},
	},
});

const buttonSelectorFragment3 = style({
	selectors: {
		[`${classScopes.agentInstall} &:focus-visible`]: {
			outlineColor: `${tokens.palette.white}`,
		},
	},
});

const installPromptSelectorFragment2 = style({
	selectors: {
		[`${classScopes.agentInstall} &`]: {
			marginTop: "0",
			padding: `${tokens.space["6"]}`,
			border: "0",
			borderRadius: `${tokens.radius.medium}`,
			background: `${tokens.palette.whiteAlpha25}`,
			lineHeight: "1.8",
			overflowWrap: "anywhere",
		},
	},
});

globalStyle(`${classScopes.agentInstall} ::selection`, {
	background: `${tokens.palette.blue800}`,
	color: `${tokens.palette.white}`,
});

const promptTextFragment1 = style({
	padding: `${tokens.space["4"]}`,
	border: `1px solid ${tokens.color.line}`,
	background: `${tokens.color.surface}`,
	userSelect: "all",
});

globalStyle(
	`${classScopes.copyIcon},
${classScopes.copyIcon} > span`,
	{
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		width: "18px",
		height: "18px",
		flexShrink: "0",
	},
);

const copySpinnerFragment1 = style({
	flexShrink: "0",
});

globalStyle("#agent-install", {
	scrollMarginTop: "24px",
});

const copySpinnerFragment2 = style({
	"@media": {
		"(prefers-reduced-motion: no-preference)": {
			animation: `copy-spin ${tokens.motion.spin} ${tokens.motion.linear} infinite`,
		},
	},
});

const agentInstallFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			gridTemplateColumns: "1fr",
			gap: `${tokens.space["4"]}`,
			padding: `${tokens.space["12"]} 20px`,
			backgroundPosition: "center",
		},
	},
});

globalStyle(`${classScopes.agentInstall}::before`, {
	"@media": {
		"(max-width: 640px)": {
			inset: "-48px",
			backgroundPosition: "center",
			filter: "blur(36px)",
		},
	},
});

globalStyle(`${classScopes.agentInstall} ${classScopes.button}`, {
	"@media": {
		"(max-width: 640px)": {
			justifySelf: "start",
		},
	},
});

globalStyle(`${classScopes.agentInstall} p br`, {
	"@media": {
		"(max-width: 640px)": {
			display: "none",
		},
	},
});

globalStyle(`${classScopes.agentInstall} ${classScopes.copyStatus}`, {
	"@media": {
		"(max-width: 640px)": {
			margin: "0",
		},
	},
});

globalStyle(`${classScopes.agentInstall} ${classScopes.installPrompt}`, {
	"@media": {
		"(max-width: 640px)": {
			padding: "20px",
		},
	},
});

export const styleFragments = {
	agentInstall: [agentInstallFragment1, agentInstallFragment2],
	promptText: [promptTextFragment1],
	copySpinner: [copySpinnerFragment1, copySpinnerFragment2],
} as const;

export const selectorFragments = {
	agentInstall: [agentInstallSelectorFragment1],
	copyStatus: [copyStatusSelectorFragment1, copyStatusSelectorFragment2],
	installPrompt: [installPromptSelectorFragment1, installPromptSelectorFragment2],
	button: [buttonSelectorFragment1, buttonSelectorFragment2, buttonSelectorFragment3],
} as const;
