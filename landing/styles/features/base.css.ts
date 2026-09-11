import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";

globalStyle(":root", {
	colorScheme: "light",
});

globalStyle("*", {
	boxSizing: "border-box",
});

globalStyle("html", {
	scrollBehavior: "smooth",
	scrollPaddingTop: `${tokens.space["8"]}`,
});

globalStyle("body", {
	margin: "0",
	background: `${tokens.color.canvas}`,
	color: `${tokens.color.ink}`,
	fontFamily: `${tokens.type.family}`,
	fontSize: `${tokens.type.size.body}`,
	lineHeight: "1.65",
	wordBreak: "keep-all",
	overflowWrap: "break-word",
});

globalStyle("button,\ninput,\ntextarea,\nselect", {
	fontFamily: `${tokens.type.family}`,
	fontSize: "inherit",
});

globalStyle("a", {
	color: "inherit",
	textDecoration: "none",
});

globalStyle("button,\na", {
	WebkitTapHighlightColor: "transparent",
});

globalStyle("button", {
	cursor: "pointer",
});

globalStyle("a:hover", {
	textDecoration: "underline",
	textUnderlineOffset: "5px",
});

globalStyle("h1,\nh2,\nh3,\np", {
	margin: "0",
});

globalStyle("h1,\nh2,\nh3", {
	fontFamily: `${tokens.type.family}`,
	lineHeight: "1.2",
});

globalStyle("h2", {
	fontSize: `${tokens.type.size.sectionLarge}`,
	letterSpacing: "-0.04em",
	fontWeight: `${tokens.type.weightMedium}`,
});

globalStyle("h3", {
	fontSize: `${tokens.type.size.subtitle}`,
	letterSpacing: "-0.025em",
});

globalStyle("p", {
	color: `${tokens.color.muted}`,
	textWrap: "pretty",
});

globalStyle("h1,\nh2,\nh3,\ndt", {
	textWrap: "balance",
});

globalStyle("dd", {
	textWrap: "pretty",
});

const shellFragment1 = style({
	maxWidth: `${tokens.layout.shellMaxWidth}`,
	margin: "auto",
	paddingInline: `${tokens.space["6"]}`,
});

const platformFragment1 = style({
	fontSize: `${tokens.type.size.label}`,
	color: `${tokens.color.muted}`,
	marginBottom: `${tokens.space["6"]}`,
});

export const styleFragments = {
	shell: [shellFragment1],
	platform: [platformFragment1],
} as const;

export const selectorFragments = {} as const;
