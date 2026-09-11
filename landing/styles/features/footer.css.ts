import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const siteFooterFragment1 = style({
	display: "flex",
	alignItems: "center",
	border: "0",
	fontSize: `${tokens.type.size.caption}`,
	color: `${tokens.color.muted}`,
});

const brandSelectorFragment1 = style({
	selectors: {
		[`${classScopes.siteFooter} &`]: {
			color: `${tokens.color.ink}`,
		},
	},
});

const siteFooterFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			flexWrap: "wrap",
			gap: "20px",
		},
	},
});

const siteFooterFragment3 = style({
	justifyContent: "flex-start",
	gap: "20px",
	paddingBlock: "28px",
});

const brandSelectorFragment2 = style({
	selectors: {
		[`${classScopes.siteFooter} &`]: {
			fontSize: `${tokens.type.size.label}`,
			fontWeight: `${tokens.type.weightMedium}`,
		},
	},
});

globalStyle(`${classScopes.siteFooter} > a:last-child`, {
	padding: "0",
	minHeight: "0",
	background: "none",
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.caption}`,
	borderRadius: "0",
});

globalStyle(`${classScopes.siteFooter} > a:last-child:hover`, {
	color: `${tokens.color.ink}`,
});

export const styleFragments = {
	siteFooter: [siteFooterFragment1, siteFooterFragment2, siteFooterFragment3],
} as const;

export const selectorFragments = {
	brand: [brandSelectorFragment1, brandSelectorFragment2],
} as const;
