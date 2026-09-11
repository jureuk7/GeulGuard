import { globalKeyframes, globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { localVars } from "../local-vars.css";
import { classScopes } from "../class-scopes.css";

globalKeyframes("keyboard-rise", {
	from: {
		opacity: "0",
		transform: "translateY(32px)",
	},
	to: {
		opacity: "1",
		transform: "translateY(0)",
	},
});

const keyboardEntranceFragment1 = style({
	containerType: "inline-size",
	display: "flex",
	alignSelf: "center",
	justifyContent: "center",
	width: "min(1320px, 90vw)",
	marginTop: "auto",
	marginBottom: "0",
	paddingTop: `${tokens.space["6"]}`,
	overflow: "clip",
	flexShrink: "0",
});

const keyboardSceneFragment1 = style({
	width: "100%",
	height: "auto",
	margin: "0 0 -3.6cqw",
	padding: `${tokens.space["2"]}`,
	overflow: "visible",
	perspective: "none",
});

const keyboardDeckFragment1 = style({
	containerType: "inline-size",
	display: "flex",
	minInlineSize: "0",
	margin: "0",
	padding: "10px",
	border: "0",
	borderRadius: `${tokens.radius.action}`,
	background: `${tokens.palette.neutral225}`,
	boxShadow: `inset 0 1px 0 ${tokens.palette.white}`,
	flexDirection: "column",
	gap: "0",
	vars: {
		[localVars.keyFaceStart]: tokens.palette.white,
		[localVars.keyFaceMid]: tokens.palette.neutral25,
		[localVars.keyFaceEnd]: tokens.palette.neutral50,
	},
});

const keyboardRowSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			display: "flex",
			gap: localVars.keyGap,
			vars: {
				[localVars.keyGap]: "0.55cqw",
				[localVars.keyUnit]: `calc((100cqw - 14 * ${localVars.keyGap}) / 15)`,
			},
		},
	},
});

const keyboardRowSelectorFragment2 = style({
	selectors: {
		[`${classScopes.keyboardDeck} ${classScopes.keyboardRow} + &`]: {
			marginTop: localVars.keyGap,
		},
	},
});

globalStyle(`${classScopes.keyboardDeck} ${classScopes.keyboardRow0} [data-code="Power"]`, {
	flex: "none",
	width: localVars.keyUnit,
	height: localVars.keyUnit,
});

const arrowClusterSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			display: "grid",
			gridTemplateColumns: "repeat(3, 1fr)",
			gridTemplateRows: "repeat(2, 1fr)",
			width: `calc(3 * ${localVars.keyUnit} + 2 * ${localVars.keyGap})`,
			gap: localVars.keyGap,
			flex: "none",
		},
	},
});

const keycapSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} ${classScopes.arrowCluster} &`]: {
			width: "100%",
			height: `calc((${localVars.keyUnit} - ${localVars.keyGap}) / 2)`,
		},
	},
});

globalStyle(`${classScopes.arrowCluster} [data-code="ArrowLeft"]`, {
	gridColumn: "1",
	gridRow: "2",
});

globalStyle(`${classScopes.arrowCluster} [data-code="ArrowUp"]`, {
	gridColumn: "2",
	gridRow: "1",
});

globalStyle(`${classScopes.arrowCluster} [data-code="ArrowDown"]`, {
	gridColumn: "2",
	gridRow: "2",
});

globalStyle(`${classScopes.arrowCluster} [data-code="ArrowRight"]`, {
	gridColumn: "3",
	gridRow: "2",
});

const keyboardSceneSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardEntrance}:has(${classScopes.keycap}:focus-visible) &`]: {
			marginBottom: "0",
		},
	},
});

const keyboardSceneFragment2 = style({
	"@media": {
		"(prefers-reduced-motion: no-preference)": {
			animation: `keyboard-rise ${tokens.motion.entrance} ${tokens.motion.emphasized} both`,
		},
	},
});

const keyboardEntranceFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			width: "92vw",
			marginTop: "0",
			paddingTop: "0",
		},
	},
});

const keyboardSceneFragment3 = style({
	"@media": {
		"(max-width: 640px)": {
			padding: `${tokens.space["1"]}`,
		},
	},
});

const keyboardDeckFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			padding: "5px",
			borderRadius: `${tokens.radius.small}`,
		},
	},
});

export const styleFragments = {
	keyboardEntrance: [keyboardEntranceFragment1, keyboardEntranceFragment2],
	keyboardScene: [keyboardSceneFragment1, keyboardSceneFragment2, keyboardSceneFragment3],
	keyboardDeck: [keyboardDeckFragment1, keyboardDeckFragment2],
} as const;

export const selectorFragments = {
	keyboardRow: [keyboardRowSelectorFragment1, keyboardRowSelectorFragment2],
	arrowCluster: [arrowClusterSelectorFragment1],
	keycap: [keycapSelectorFragment1],
	keyboardScene: [keyboardSceneSelectorFragment1],
} as const;
