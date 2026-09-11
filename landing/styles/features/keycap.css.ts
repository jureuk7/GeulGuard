import { style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { localVars } from "../local-vars.css";
import { classScopes } from "../class-scopes.css";

const keycapSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			position: "relative",
			flex: "none",
			width: `calc(${localVars.keyUnits} * ${localVars.keyUnit} + (${localVars.keyUnits} - 1) * ${localVars.keyGap})`,
			height: localVars.keyUnit,
			minWidth: "0",
			padding: "0",
			border: "0",
			borderRadius: "0.65cqw",
			background: `${tokens.palette.neutral375}`,
			color: `${tokens.palette.neutral700}`,
			boxShadow: `0 1px 1px ${tokens.palette.slateAlpha03}`,
			touchAction: "manipulation",
			WebkitUserSelect: "none",
			userSelect: "none",
		},
	},
});

const keycapSelectorFragment2 = style({
	selectors: {
		[`${classScopes.keyboardDeck} ${classScopes.keyboardRow0} &`]: {
			flex: localVars.keyUnits,
			width: "auto",
		},
	},
});

const keycapFaceSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} ${classScopes.keycap} &`]: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: "100%",
			height: "100%",
			padding: "0",
			borderRadius: "0.6cqw",
			background: `linear-gradient(\n\t\t155deg,\n\t\t${localVars.keyFaceStart} 20%,\n\t\t${localVars.keyFaceMid} 70%,\n\t\t${localVars.keyFaceEnd}\n\t)`,
			color: `${tokens.palette.neutral700}`,
			boxShadow: `inset 0 1px 0 ${tokens.palette.white},\n\t\tinset 0 -1px 0 ${tokens.palette.neutral275}`,
		},
	},
});

const keycapFaceSelectorFragment2 = style({
	selectors: {
		[`${classScopes.keyboardDeck} ${classScopes.keycap}:hover &`]: {
			filter: "brightness(0.98)",
		},
	},
});

const keycapFaceSelectorFragment3 = style({
	selectors: {
		[`${classScopes.keyboardDeck} ${classScopes.keycap}[data-pressed="true"] &`]: {
			background: `${tokens.palette.neutral250}`,
			color: `${tokens.palette.neutral700}`,
			boxShadow: `inset 0 1px 2px ${tokens.palette.inkAlpha06}`,
			filter: "none",
		},
	},
});
const keycapFaceSelectorFragment4 = style({
	selectors: {
		[`${classScopes.keyboardDeck} ${classScopes.keycap}:active &`]: {
			background: `${tokens.palette.neutral250}`,
			color: `${tokens.palette.neutral700}`,
			boxShadow: `inset 0 1px 2px ${tokens.palette.inkAlpha06}`,
			filter: "none",
		},
	},
});

const keycapSelectorFragment3 = style({
	selectors: {
		[`&:focus-visible`]: {
			outlineOffset: "5px",
		},
	},
});

const keycapDirectionSelectorFragment1 = style({
	selectors: {
		[`${classScopes.keyboardDeck} &`]: {
			fontSize: "0.8cqw",
		},
	},
});

const keycapFaceFragment1 = style({
	"@media": {
		"(prefers-reduced-motion: reduce)": {
			transition: "none",
		},
	},
});

export const styleFragments = {
	keycapFace: [keycapFaceFragment1],
} as const;

export const selectorFragments = {
	keycap: [keycapSelectorFragment1, keycapSelectorFragment2, keycapSelectorFragment3],
	keycapFace: [
		keycapFaceSelectorFragment1,
		keycapFaceSelectorFragment2,
		keycapFaceSelectorFragment3,
		keycapFaceSelectorFragment4,
	],
	keycapDirection: [keycapDirectionSelectorFragment1],
} as const;
