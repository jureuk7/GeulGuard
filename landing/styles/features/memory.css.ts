import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { localVars } from "../local-vars.css";
import { classScopes } from "../class-scopes.css";

const memoryDemoFragment1 = style({
	marginTop: "36px",
	borderRadius: `${tokens.radius.action}`,
});

const memoryHeadingFragment1 = style({
	display: "flex",
	alignItems: "center",
	gap: `${tokens.space["2"]}`,
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.caption}`,
});

const memoryOutputFragment1 = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: `${tokens.space["3"]}`,
});

globalStyle(`${classScopes.memoryOutput} span`, {
	fontSize: `${tokens.type.size.fine}`,
	color: `${tokens.color.muted}`,
});

globalStyle(`${classScopes.memoryOutput} strong`, {
	fontSize: `${tokens.type.size.subtitle}`,
	fontWeight: `${tokens.type.weightRegular}`,
	minWidth: "22px",
});

globalStyle(`${classScopes.memoryOutput} svg`, {
	transform: "rotate(-90deg)",
	color: `${tokens.palette.neutral550}`,
});

const memoryStatusFragment1 = style({
	fontSize: `${tokens.type.size.meta}`,
	minHeight: "42px",
	lineHeight: "1.6",
});

const memoryFooterFragment1 = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: `${tokens.space["3"]}`,
});

globalStyle(`${classScopes.memoryFooter} > span`, {
	fontSize: `${tokens.type.size.micro}`,
	color: `${tokens.color.muted}`,
});

globalStyle(`${classScopes.memoryFooter} button`, {
	display: "grid",
	placeItems: "center",
	width: "36px",
	height: "36px",
	border: "0",
	borderRadius: `${tokens.radius.action}`,
	color: `${tokens.color.ink}`,
	flexShrink: "0",
});

const memoryOutputFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			gap: `${tokens.space["2"]}`,
		},
	},
});

const memoryDemoFragment2 = style({
	background: `${tokens.color.memorySurface}`,
	padding: "28px",
});

const memoryFieldFragment1 = style({
	marginBlock: `28px ${tokens.space["6"]}`,
});

const memoryFieldLabelsFragment1 = style({
	display: "flex",
	justifyContent: "space-between",
	fontSize: `${tokens.type.size.fine}`,
	color: `${tokens.color.memoryText}`,
	marginBottom: `${tokens.space["3"]}`,
});

const memoryGridFragment1 = style({
	display: "grid",
	gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
	gap: `${tokens.space["1"]}`,
});

globalStyle(`${classScopes.memoryGrid} > span`, {
	aspectRatio: "1",
	borderRadius: "3px",
});

const memoryFieldLegendFragment1 = style({
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gap: `${tokens.space["3"]}`,
	marginTop: "14px",
});

globalStyle(`${classScopes.memoryFieldLegend} > span`, {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	color: `${tokens.color.memoryText}`,
	fontSize: `${tokens.type.size.fine}`,
});

globalStyle(`${classScopes.memoryFieldLegend} b`, {
	fontSize: `${tokens.type.size.bodyLarge}`,
	fontWeight: `${tokens.type.weightRegular}`,
	minWidth: "20px",
	textAlign: "center",
});

globalStyle(`${classScopes.memoryFieldLegend} [data-filled="true"]`, {
	color: `${tokens.color.memoryTextActive}`,
});

const memoryOutputFragment3 = style({
	padding: `${tokens.space["4"]} ${tokens.space["3"]}`,
	borderRadius: `${tokens.radius.medium}`,
	background: `${tokens.palette.white}`,
});

globalStyle(`${classScopes.memoryOutput} strong[data-committed="true"]`, {
	color: `${tokens.color.memoryTextActive}`,
});

const memoryStatusFragment2 = style({
	marginTop: "20px",
});

globalStyle(`${classScopes.memoryFooter} button`, {
	background: `${tokens.palette.neutral300}`,
});

const memoryDemoFragment3 = style({
	"@media": {
		"(max-width: 640px)": {
			padding: "20px",
		},
	},
});

const memoryGridFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			gap: "3px",
		},
	},
});

globalStyle(`${classScopes.memoryGrid} > span`, {
	"@media": {
		"(max-width: 640px)": {
			borderRadius: "2px",
		},
	},
});

globalStyle(`${classScopes.memoryGrid} > span`, {
	background: `${tokens.color.memoryCellEmpty}`,
	transition: `background-color ${tokens.motion.deliberate} ${tokens.motion.emphasized}`,
	transitionDelay: localVars.memoryDelay,
});

globalStyle(`${classScopes.memoryGrid} > span[data-active="true"][data-intensity="0"]`, {
	background: `${tokens.color.memoryCell1}`,
});

globalStyle(`${classScopes.memoryGrid} > span[data-active="true"][data-intensity="1"]`, {
	background: `${tokens.color.memoryCell2}`,
});

globalStyle(`${classScopes.memoryGrid} > span[data-active="true"][data-intensity="2"]`, {
	background: `${tokens.color.memoryCell3}`,
});

globalStyle(`${classScopes.memoryGrid} > span[data-active="true"][data-intensity="3"]`, {
	background: `${tokens.color.memoryCell4}`,
});

globalStyle(`${classScopes.memoryGrid} > span[data-active="true"][data-intensity="4"]`, {
	background: `${tokens.color.memoryCell5}`,
});

export const styleFragments = {
	memoryDemo: [memoryDemoFragment1, memoryDemoFragment2, memoryDemoFragment3],
	memoryHeading: [memoryHeadingFragment1],
	memoryOutput: [memoryOutputFragment1, memoryOutputFragment2, memoryOutputFragment3],
	memoryStatus: [memoryStatusFragment1, memoryStatusFragment2],
	memoryFooter: [memoryFooterFragment1],
	memoryField: [memoryFieldFragment1],
	memoryFieldLabels: [memoryFieldLabelsFragment1],
	memoryGrid: [memoryGridFragment1, memoryGridFragment2],
	memoryFieldLegend: [memoryFieldLegendFragment1],
} as const;

export const selectorFragments = {} as const;
