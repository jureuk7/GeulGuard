import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const themeToggleFragment1 = style({
	display: "grid",
	placeItems: "center",
	width: `${tokens.layout.themeToggleSize}`,
	height: `${tokens.layout.themeToggleSize}`,
	flexShrink: "0",
	border: "0",
	borderRadius: `${tokens.radius.action}`,
	color: `${tokens.color.ink}`,
	background: "transparent",
});

const themeToggleSelectorFragment1 = style({
	selectors: {
		[`&:hover`]: {
			background: `${tokens.color.controlSurfaceHover}`,
		},
	},
});

const themeSunFragment1 = style({
	display: "none",
});

const themeToggleFragment2 = style({
	"@media": {
		"(max-width: 380px)": {
			width: `${tokens.layout.headerControlSize}`,
		},
	},
});

const themeToggleFragment3 = style({
	position: "relative",
});

globalStyle(`${classScopes.themeToggle} :is(${classScopes.themeSun}, ${classScopes.themeMoon})`, {
	display: "block",
	position: "absolute",
	transition: `opacity ${tokens.motion.icon} ${tokens.motion.ease},\n\t\ttransform ${tokens.motion.icon} ${tokens.motion.emphasized}`,
});

const themeSunFragment2 = style({
	opacity: "0",
	transform: "rotate(-24deg) scale(0.72)",
});

const themeMoonFragment1 = style({
	opacity: "1",
	transform: "rotate(0) scale(1)",
});

export const styleFragments = {
	themeToggle: [themeToggleFragment1, themeToggleFragment2, themeToggleFragment3],
	themeSun: [themeSunFragment1, themeSunFragment2],
	themeMoon: [themeMoonFragment1],
} as const;

export const selectorFragments = {
	themeToggle: [themeToggleSelectorFragment1],
} as const;
