import { style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";

const inlineKbdFragment1 = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	minHeight: "1.6em",
	marginInline: "0.12em",
	padding: "0.08em 0.42em",
	border: "0",
	borderRadius: "4px",
	background: `${tokens.color.keyBase}`,
	boxShadow: `0 1px 0 color-mix(in srgb, ${tokens.color.ink} 14%, transparent)`,
	color: `${tokens.color.ink}`,
	font: "inherit",
	fontSize: "0.86em",
	fontWeight: `${tokens.type.weightRegular}`,
	lineHeight: "1",
	verticalAlign: "baseline",
	whiteSpace: "nowrap",
});

export const styleFragments = {
	inlineKbd: [inlineKbdFragment1],
} as const;

export const selectorFragments = {} as const;
