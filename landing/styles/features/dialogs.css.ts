import { globalKeyframes, globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

globalKeyframes("dialog-enter", {
	from: {
		opacity: "0",
		transform: "translateY(12px) scale(0.98)",
	},
	to: {
		opacity: "1",
		transform: "none",
	},
});

globalKeyframes("backdrop-enter", {
	from: {
		opacity: "0",
	},
	to: {
		opacity: "1",
	},
});

const contentDialogFragment1 = style({
	width: "min(720px, calc(100vw - 32px))",
	maxHeight: "85dvh",
	padding: "0",
	border: "0",
	borderRadius: `${tokens.radius.large}`,
	background: "white",
	color: `${tokens.color.ink}`,
	boxShadow: `0 24px 80px ${tokens.palette.inkAlpha20}`,
});

globalStyle(`body:has(${classScopes.contentDialog}[open])`, {
	overflow: "hidden",
});

const dialogHeaderFragment1 = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: "20px",
	padding: `${tokens.space["6"]} 28px ${tokens.space["4"]}`,
	position: "sticky",
	top: "0",
	background: "white",
	zIndex: "1",
});

globalStyle(`${classScopes.dialogHeader} h2`, {
	fontSize: `${tokens.type.size.lead}`,
});

const closeDialogFragment1 = style({
	display: "grid",
	placeItems: "center",
	width: "44px",
	height: "44px",
	border: "0",
	borderRadius: `${tokens.radius.base}`,
	background: `${tokens.palette.neutral150}`,
	color: `${tokens.color.ink}`,
	flexShrink: "0",
});

const dialogBodyFragment1 = style({
	padding: "0 28px 28px",
	fontSize: `${tokens.type.size.control}`,
});

globalStyle(`${classScopes.dialogBody} a`, {
	textDecoration: "underline",
	textUnderlineOffset: "4px",
});

const codeToolbarFragment1 = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: `${tokens.space["3"]}`,
	background: `${tokens.palette.neutral150}`,
	padding: `${tokens.space["2"]} ${tokens.space["4"]}`,
	marginTop: `${tokens.space["6"]}`,
	borderRadius: "8px 8px 0 0",
	fontSize: `${tokens.type.size.caption}`,
});

globalStyle(`${classScopes.codeToolbar} button`, {
	display: "flex",
	alignItems: "center",
	gap: `${tokens.space["2"]}`,
	border: "0",
	background: "none",
	minHeight: "44px",
	whiteSpace: "nowrap",
	color: `${tokens.color.ink}`,
});

const codePreviewFragment1 = style({
	margin: "0",
	padding: `${tokens.space["4"]}`,
	overflow: "auto",
	background: `${tokens.palette.neutral150}`,
	borderRadius: "0 0 8px 8px",
	fontSize: `${tokens.type.size.caption}`,
	lineHeight: "1.7",
	tabSize: "2",
});

const dialogHeaderFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			padding: `${tokens.space["4"]}`,
		},
	},
});

globalStyle(`${classScopes.dialogHeader} h2`, {
	"@media": {
		"(max-width: 640px)": {
			fontSize: `${tokens.type.size.headingCompact}`,
		},
	},
});

const dialogBodyFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			padding: `0 ${tokens.space["4"]} 20px`,
		},
	},
});

const codeToolbarFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			flexWrap: "wrap",
			gap: "0",
		},
	},
});

globalStyle(`${classScopes.contentDialog}[open]`, {
	"@media": {
		"(prefers-reduced-motion: no-preference)": {
			animation: `dialog-enter ${tokens.motion.dialog} ${tokens.motion.standard}`,
		},
	},
});

globalStyle(`${classScopes.contentDialog}[open]::backdrop`, {
	"@media": {
		"(prefers-reduced-motion: no-preference)": {
			animation: `backdrop-enter ${tokens.motion.dialog} ${tokens.motion.standard}`,
		},
	},
});

const codePreviewFragment2 = style({
	textAlign: "left",
});

const contentDialogSelectorFragment1 = style({
	selectors: {
		[`&::backdrop`]: {
			background: `${tokens.palette.slateAlpha50}`,
			backdropFilter: "blur(7px)",
			WebkitBackdropFilter: "blur(7px)",
		},
	},
});

const dialogBodyFragment3 = style({
	textAlign: "left",
	lineHeight: "1.5",
});

globalStyle(`${classScopes.dialogBody} > p`, {
	marginBottom: "10px",
});

globalStyle(
	`${classScopes.contentDialog} ${classScopes.closeDialog},
${classScopes.contentDialog} ${classScopes.codeToolbar} button`,
	{
		display: "grid",
		placeItems: "center",
		width: "36px",
		height: "36px",
		minHeight: "36px",
		padding: "0",
		borderRadius: `${tokens.radius.medium}`,
		background: "transparent",
		color: `${tokens.color.muted}`,
	},
);

globalStyle(
	`${classScopes.contentDialog} ${classScopes.closeDialog}:hover,
${classScopes.contentDialog} ${classScopes.codeToolbar} button:hover`,
	{
		background: `${tokens.color.keyBase}`,
		color: `${tokens.color.ink}`,
	},
);

const jsonKeySelectorFragment1 = style({
	selectors: {
		[`${classScopes.codePreview} &`]: {
			color: `${tokens.palette.blue700}`,
		},
	},
});

const jsonStringSelectorFragment1 = style({
	selectors: {
		[`${classScopes.codePreview} &`]: {
			color: `${tokens.palette.green700}`,
		},
	},
});

const jsonLiteralSelectorFragment1 = style({
	selectors: {
		[`${classScopes.codePreview} &`]: {
			color: `${tokens.palette.purple700}`,
		},
	},
});

const jsonNumberSelectorFragment1 = style({
	selectors: {
		[`${classScopes.codePreview} &`]: {
			color: `${tokens.palette.orange700}`,
		},
	},
});

export const styleFragments = {
	contentDialog: [contentDialogFragment1],
	dialogHeader: [dialogHeaderFragment1, dialogHeaderFragment2],
	closeDialog: [closeDialogFragment1],
	dialogBody: [dialogBodyFragment1, dialogBodyFragment2, dialogBodyFragment3],
	codeToolbar: [codeToolbarFragment1, codeToolbarFragment2],
	codePreview: [codePreviewFragment1, codePreviewFragment2],
} as const;

export const selectorFragments = {
	contentDialog: [contentDialogSelectorFragment1],
	jsonKey: [jsonKeySelectorFragment1],
	jsonString: [jsonStringSelectorFragment1],
	jsonLiteral: [jsonLiteralSelectorFragment1],
	jsonNumber: [jsonNumberSelectorFragment1],
} as const;
