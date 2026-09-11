import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const faqSectionFragment1 = style({
	display: "grid",
	gridTemplateColumns: "1fr 1.7fr",
	gap: `${tokens.space["16"]}`,
	padding: `${tokens.layout.sectionBlockCompact} 0 ${tokens.layout.sectionBlock}`,
});

globalStyle(`${classScopes.faqSection} h2`, {
	fontSize: `${tokens.type.size.headingLarge}`,
});

globalStyle(`${classScopes.faqList} a`, {
	textDecoration: "underline",
});

const faqItemFragment1 = style({
	marginBottom: `${tokens.space["3"]}`,
});

globalStyle(`${classScopes.faqItem} h3`, {
	margin: "0",
});

globalStyle(`${classScopes.faqItem} h3 button`, {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	padding: `${tokens.layout.controlInset}`,
	gap: `${tokens.layout.controlInset}`,
	border: "0",
	borderRadius: `${tokens.radius.medium}`,
	background: `${tokens.palette.neutral125}`,
	color: `${tokens.color.ink}`,
	font: "inherit",
	fontSize: `${tokens.type.size.control}`,
	fontWeight: `${tokens.type.weightMedium}`,
	textAlign: "left",
});

globalStyle(`${classScopes.faqItem} h3 button > span`, {
	display: "inline-flex",
	flexShrink: "0",
});

const faqAnswerFragment1 = style({
	overflow: "hidden",
});

globalStyle(`${classScopes.faqAnswer} p`, {
	margin: "0",
	padding: `${tokens.space["4"]} ${tokens.layout.controlInset} ${tokens.space["6"]}`,
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.control}`,
	lineHeight: "1.8",
});

globalStyle(`${classScopes.faqItem} h3 button`, {
	"@media": {
		"(prefers-reduced-motion: no-preference)": {
			transition: `color ${tokens.motion.fast} ${tokens.motion.ease}`,
		},
	},
});

globalStyle(`${classScopes.faqItem} h3 button:hover`, {
	"@media": {
		"(prefers-reduced-motion: no-preference)": {
			color: `${tokens.color.accent}`,
		},
	},
});

const faqSectionFragment2 = style({
	"@media": {
		"(max-width: 1000px)": {
			gridTemplateColumns: "1fr 1.4fr",
			gap: `${tokens.space["8"]}`,
		},
	},
});

globalStyle(`${classScopes.faqItem} h3 button`, {
	"@media": {
		"(max-width: 700px)": {
			fontSize: `${tokens.type.size.control}`,
		},
	},
});

const faqSectionFragment3 = style({
	"@media": {
		"(max-width: 640px)": {
			gridTemplateColumns: "1fr",
			gap: `${tokens.space["8"]}`,
			paddingBlock: `${tokens.layout.sectionBlockTight}`,
		},
	},
});

export const styleFragments = {
	faqSection: [faqSectionFragment1, faqSectionFragment2, faqSectionFragment3],
	faqItem: [faqItemFragment1],
	faqAnswer: [faqAnswerFragment1],
} as const;

export const selectorFragments = {} as const;
