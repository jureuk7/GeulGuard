import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const siteHeaderFragment1 = style({
	position: "sticky",
	top: "0",
	zIndex: "40",
	display: "flex",
	width: "100%",
	maxWidth: "none",
	minWidth: "0",
	margin: "0",
	padding: "0",
	alignItems: "center",
	backgroundColor: `color-mix(in srgb, ${tokens.color.canvas} 88%, transparent)`,
	WebkitBackdropFilter: `blur(${tokens.layout.headerBackdropBlur})`,
	backdropFilter: `blur(${tokens.layout.headerBackdropBlur})`,
});

const headerInnerFragment1 = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	maxWidth: `${tokens.layout.shellMaxWidth}`,
	height: "100%",
	marginInline: "auto",
	paddingInline: `${tokens.layout.pageGutter}`,
});

const brandFragment1 = style({
	display: "flex",
	gap: `${tokens.space["3"]}`,
	alignItems: "center",
	fontSize: `${tokens.type.size.brand}`,
	fontWeight: `${tokens.type.weightMedium}`,
	letterSpacing: "-0.04em",
});

globalStyle(`${classScopes.siteHeader} nav`, {
	display: "flex",
	alignItems: "center",
	minWidth: "0",
	marginLeft: "auto",
});

const brandFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			fontSize: `${tokens.type.size.headingCompact}`,
		},
	},
});

globalStyle(`${classScopes.siteHeader} ${classScopes.headerInner} nav a`, {
	background: "transparent",
});

globalStyle(`${classScopes.siteHeader} ${classScopes.headerInner} nav a:hover`, {
	background: `${tokens.color.controlSurfaceHover}`,
});

globalStyle(`${classScopes.siteHeader} nav a:hover svg`, {
	transform: "none",
});

const siteHeaderFragment2 = style({
	height: `${tokens.layout.headerHeight}`,
});

const brandWordmarkFragment1 = style({
	fontSize: `${tokens.type.size.brand}`,
	fontWeight: `${tokens.type.weightMedium}`,
	letterSpacing: "-0.07em",
	color: `${tokens.color.ink}`,
});

const brandDotFragment1 = style({
	color: `${tokens.color.accent}`,
});

globalStyle(`${classScopes.siteHeader} nav`, {
	gap: `${tokens.space["3"]}`,
});

globalStyle(`${classScopes.siteHeader} ${classScopes.headerInner} nav a`, {
	whiteSpace: "nowrap",
	fontSize: `${tokens.type.size.caption}`,
	minHeight: `${tokens.layout.headerControlSize}`,
	padding: `${tokens.layout.headerControlPaddingY} ${tokens.layout.headerControlPaddingX}`,
});

const githubLinkSelectorFragment1 = style({
	selectors: {
		[`${classScopes.siteHeader} &`]: {
			width: `${tokens.layout.headerControlSize}`,
			height: `${tokens.layout.headerControlSize}`,
			minHeight: `${tokens.layout.headerControlSize}`,
			padding: `${tokens.layout.headerControlPaddingY}`,
		},
	},
});

const siteHeaderFragment3 = style({
	"@media": {
		"(max-width: 640px)": {
			height: `${tokens.layout.headerHeightMobile}`,
		},
	},
});

const headerInnerFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			paddingInline: `${tokens.layout.pageGutterMobile}`,
		},
	},
});

globalStyle(`${classScopes.siteHeader} nav`, {
	"@media": {
		"(max-width: 640px)": {
			gap: `${tokens.space["1"]}`,
		},
	},
});

globalStyle(`${classScopes.siteHeader} ${classScopes.headerInner} nav a`, {
	"@media": {
		"(max-width: 640px)": {
			padding: `${tokens.layout.headerMobilePaddingY} ${tokens.layout.headerMobilePaddingX}`,
			fontSize: `${tokens.type.size.fine}`,
		},
	},
});

const headerInnerFragment3 = style({
	"@media": {
		"(max-width: 380px)": {
			paddingInline: `${tokens.space["4"]}`,
		},
	},
});

globalStyle(`${classScopes.siteHeader} nav`, {
	"@media": {
		"(max-width: 380px)": {
			gap: "0",
		},
	},
});

globalStyle(`${classScopes.siteHeader} ${classScopes.headerInner} nav a`, {
	"@media": {
		"(max-width: 380px)": {
			paddingInline: `${tokens.layout.headerControlPaddingY}`,
		},
	},
});

export const styleFragments = {
	siteHeader: [siteHeaderFragment1, siteHeaderFragment2, siteHeaderFragment3],
	headerInner: [headerInnerFragment1, headerInnerFragment2, headerInnerFragment3],
	brand: [brandFragment1, brandFragment2],
	brandWordmark: [brandWordmarkFragment1],
	brandDot: [brandDotFragment1],
} as const;

export const selectorFragments = {
	githubLink: [githubLinkSelectorFragment1],
} as const;
