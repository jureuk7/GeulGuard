import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const explanationFragment1 = style({
	display: "grid",
	paddingBlock: `${tokens.layout.sectionBlock}`,
});

globalStyle(`${classScopes.explanationBody} > p`, {
	fontSize: `${tokens.type.size.bodyEmphasis}`,
	maxWidth: `${tokens.layout.explanationCopyMax}`,
});

globalStyle(`${classScopes.explanation} dl`, {
	marginBlock: `${tokens.space["8"]}`,
});

globalStyle(`${classScopes.explanation} dl > div`, {
	display: "grid",
	gridTemplateColumns: `${tokens.layout.explanationLabelColumn} 1fr`,
	gap: `${tokens.layout.controlInset}`,
	paddingBlock: `${tokens.layout.inlineGap}`,
	borderBottom: `${tokens.layout.hairline} solid ${tokens.color.line}`,
});

const explanationFragment2 = style({
	gridTemplateColumns: "1fr 1fr",
	gap: `${tokens.space["24"]}`,
});

globalStyle(`${classScopes.explanationHeading} h2`, {
	fontSize: `${tokens.type.fluid.explanationTitle}`,
	letterSpacing: "-0.045em",
	lineHeight: "1.3",
});

const compositionDemoFragment1 = style({
	marginTop: `${tokens.layout.contentGap}`,
	padding: `${tokens.layout.explanationInset}`,
	background: `${tokens.palette.neutral125}`,
	borderRadius: `${tokens.radius.action}`,
});

const demoEyebrowFragment1 = style({
	fontSize: `${tokens.type.size.caption}`,
});

const demoEditorFragment1 = style({
	paddingBlock: `${tokens.layout.mediumGap}`,
	fontSize: `${tokens.type.fluid.compositionWord}`,
	letterSpacing: "-0.035em",
});

const demoSyllableFragment1 = style({
	position: "relative",
	display: "inline-block",
});

globalStyle(`${classScopes.demoSyllable} i`, {
	position: "absolute",
	top: "12%",
	height: "80%",
	width: `calc(${tokens.layout.hairline} * 2)`,
	background: `${tokens.color.accent}`,
});

const demoStatusFragment1 = style({
	fontSize: `${tokens.type.size.label}`,
	lineHeight: "1.6",
	minHeight: `${tokens.layout.explanationStatusMin}`,
});

const textButtonSelectorFragment1 = style({
	selectors: {
		[`${classScopes.compositionDemo} &`]: {
			marginTop: `${tokens.space["4"]}`,
			background: `${tokens.palette.neutral350}`,
		},
	},
});

const demoCaptionSelectorFragment1 = style({
	selectors: {
		[`${classScopes.compositionDemo} &`]: {
			marginTop: `${tokens.space["4"]}`,
			fontSize: `${tokens.type.size.fine}`,
		},
	},
});

globalStyle(`${classScopes.explanationLead} span`, {
	display: "block",
});

const demoEditorFragment2 = style({
	color: `${tokens.color.ink}`,
});

const demoSyllableSelectorFragment1 = style({
	selectors: {
		[`&[data-composing="true"]`]: {
			background: `${tokens.color.compositionFill}`,
			color: `${tokens.color.compositionInk}`,
			boxShadow: `0 2px 0 ${tokens.color.compositionLine}`,
		},
	},
});

const explanationFragment3 = style({
	"@media": {
		"(max-width: 640px)": {
			gridTemplateColumns: "1fr",
			gap: `${tokens.layout.contentGap}`,
			paddingBlock: `${tokens.layout.sectionBlockSecurityMobile}`,
		},
	},
});

globalStyle(`${classScopes.explanationBody} > p`, {
	"@media": {
		"(max-width: 640px)": {
			fontSize: `${tokens.type.size.body}`,
		},
	},
});

globalStyle(`${classScopes.explanation} dl > div`, {
	"@media": {
		"(max-width: 640px)": {
			gridTemplateColumns: "1fr",
			gap: `${tokens.space["2"]}`,
			paddingBlock: `${tokens.layout.controlInset}`,
		},
	},
});

const compositionDemoFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			padding: `${tokens.space["6"]}`,
		},
	},
});

export const styleFragments = {
	explanation: [explanationFragment1, explanationFragment2, explanationFragment3],
	compositionDemo: [compositionDemoFragment1, compositionDemoFragment2],
	demoEyebrow: [demoEyebrowFragment1],
	demoEditor: [demoEditorFragment1, demoEditorFragment2],
	demoSyllable: [demoSyllableFragment1],
	demoStatus: [demoStatusFragment1],
} as const;

export const selectorFragments = {
	textButton: [textButtonSelectorFragment1],
	demoCaption: [demoCaptionSelectorFragment1],
	demoSyllable: [demoSyllableSelectorFragment1],
} as const;
