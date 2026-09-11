import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

const installSectionFragment1 = style({
	paddingBlock: `${tokens.layout.sectionBlockCompact}`,
	border: "0",
});

const installStoryFragment1 = style({
	position: "relative",
	height: "240svh",
});

const installStageFragment1 = style({
	position: "sticky",
	top: "0",
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	alignItems: "center",
	minHeight: "100svh",
	gap: `${tokens.space["16"]}`,
});

const installEyebrowFragment1 = style({
	marginBottom: `${tokens.layout.contentGap}`,
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.label}`,
});

const storyStepsFragment1 = style({
	display: "grid",
	margin: "0",
	padding: "0",
	gap: `${tokens.space["8"]}`,
	listStyle: "none",
});

globalStyle(`${classScopes.storySteps} button`, {
	display: "flex",
	alignItems: "baseline",
	width: "100%",
	padding: `${tokens.space["2"]} 0`,
	gap: `${tokens.layout.inlineGap}`,
	border: "0",
	borderRadius: "0",
	background: "transparent",
	color: `${tokens.color.muted}`,
	textAlign: "left",
});

const storyLabelFragment1 = style({
	display: "block",
	fontSize: `${tokens.type.fluid.storyLabel}`,
	fontWeight: `${tokens.type.weightMedium}`,
	letterSpacing: "-0.055em",
	transform: "scale(0.77)",
	transformOrigin: "left center",
	transition: `transform ${tokens.motion.expand},\n\t\tcolor ${tokens.motion.expand}`,
});

const storyLabelSelectorFragment1 = style({
	selectors: {
		[`${classScopes.storySteps} [data-active="true"] &`]: {
			color: `${tokens.color.ink}`,
			transform: "scale(1)",
		},
	},
});

globalStyle(`${classScopes.storySteps} p`, {
	maxWidth: `${tokens.layout.copyNarrow}`,
	margin: "10px 0 0",
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.label}`,
	lineHeight: "1.7",
});

const storyDownloadFragment1 = style({
	margin: "36px 0 0",
	fontSize: `${tokens.type.size.control}`,
});

const installArtFragment1 = style({
	position: "relative",
	minWidth: "0",
});

const installArtSceneFragment1 = style({
	display: "flex",
	minHeight: `${tokens.layout.artMinHeight}`,
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: `${tokens.layout.contentGap}`,
});

const artCaptionFragment1 = style({
	display: "flex",
	alignItems: "center",
	gap: `${tokens.space["2"]}`,
	color: `${tokens.color.muted}`,
	fontSize: `${tokens.type.size.meta}`,
	textAlign: "center",
});

const installPackageImageFragment1 = style({
	width: `min(85%, ${tokens.layout.copyNarrow})`,
	height: "auto",
	objectFit: "contain",
	filter: `drop-shadow(0 18px 20px ${tokens.palette.brownAlpha08})`,
});

const sourceSceneFragment1 = style({
	position: "relative",
	width: `min(100%, ${tokens.layout.artMaxWidth})`,
	aspectRatio: "1",
});

const sourceDesktopFragment1 = style({
	display: "block",
	width: "100%",
	height: "100%",
	borderRadius: "0",
	objectFit: "cover",
});

const loginScreenshotFragment1 = style({
	display: "block",
	width: `min(100%, ${tokens.layout.artMaxWidth})`,
	height: "auto",
	objectFit: "contain",
});

const storyLabelFragment2 = style({
	"@media": {
		"(prefers-reduced-motion: reduce)": {
			transition: "none",
		},
	},
});

const installStageFragment2 = style({
	"@media": {
		"(max-width: 700px)": {
			gridTemplateColumns: "1fr",
			alignContent: "center",
			gap: "20px",
			paddingBlock: `${tokens.space["6"]}`,
		},
	},
});

const installEyebrowFragment2 = style({
	"@media": {
		"(max-width: 700px)": {
			marginBottom: "20px",
		},
	},
});

const storyStepsFragment2 = style({
	"@media": {
		"(max-width: 700px)": {
			gap: `${tokens.space["3"]}`,
		},
	},
});

const storyLabelFragment3 = style({
	"@media": {
		"(max-width: 700px)": {
			fontSize: `${tokens.type.size.headingMedium}`,
		},
	},
});

globalStyle(`${classScopes.storySteps} p`, {
	"@media": {
		"(max-width: 700px)": {
			marginTop: "3px",
			fontSize: `${tokens.type.size.caption}`,
		},
	},
});

const storyDownloadFragment2 = style({
	"@media": {
		"(max-width: 700px)": {
			marginTop: "18px",
		},
	},
});

const installArtSceneFragment2 = style({
	"@media": {
		"(max-width: 700px)": {
			minHeight: "250px",
			gap: `${tokens.space["6"]}`,
		},
	},
});

const sourceSceneFragment2 = style({
	"@media": {
		"(max-width: 700px)": {
			width: "min(100%, 300px)",
		},
	},
});

const installPackageImageFragment2 = style({
	"@media": {
		"(max-width: 700px)": {
			width: "190px",
		},
	},
});

const installSectionFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			paddingBlock: `${tokens.layout.sectionBlockMobile}`,
		},
	},
});

const loginScreenshotFragment2 = style({
	"@media": {
		"(max-width: 640px)": {
			maxWidth: `${tokens.layout.copyNarrow}`,
		},
	},
});

export const styleFragments = {
	installSection: [installSectionFragment1, installSectionFragment2],
	installStory: [installStoryFragment1],
	installStage: [installStageFragment1, installStageFragment2],
	installEyebrow: [installEyebrowFragment1, installEyebrowFragment2],
	storySteps: [storyStepsFragment1, storyStepsFragment2],
	storyLabel: [storyLabelFragment1, storyLabelFragment2, storyLabelFragment3],
	storyDownload: [storyDownloadFragment1, storyDownloadFragment2],
	installArt: [installArtFragment1],
	installArtScene: [installArtSceneFragment1, installArtSceneFragment2],
	artCaption: [artCaptionFragment1],
	installPackageImage: [installPackageImageFragment1, installPackageImageFragment2],
	sourceScene: [sourceSceneFragment1, sourceSceneFragment2],
	sourceDesktop: [sourceDesktopFragment1],
	loginScreenshot: [loginScreenshotFragment1, loginScreenshotFragment2],
} as const;

export const selectorFragments = {
	storyLabel: [storyLabelSelectorFragment1],
} as const;
