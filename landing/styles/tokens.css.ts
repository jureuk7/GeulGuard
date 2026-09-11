import { createGlobalTheme, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css";
import { designTokens } from "./design-tokens";

const colorContract = {
	canvas: "canvas",
	surface: "surface",
	ink: "ink",
	muted: "muted",
	line: "line",
	accent: "accent",
	accentHover: "accent-hover",
	primaryAction: "primary-action",
	primaryActionHover: "primary-action-hover",
	onPrimary: "on-primary",
	keyBase: "key-base",
	focusRing: "focus-ring",
	compositionFill: "composition-fill",
	compositionLine: "composition-line",
	compositionInk: "composition-ink",
	memoryCellEmpty: "memory-cell-empty",
	memoryCell1: "memory-cell-1",
	memoryCell2: "memory-cell-2",
	memoryCell3: "memory-cell-3",
	memoryCell4: "memory-cell-4",
	memoryCell5: "memory-cell-5",
	memoryText: "memory-text",
	memoryTextActive: "memory-text-active",
	memorySurface: "memory-surface",
	controlSurface: "control-surface",
	controlSurfaceHover: "control-surface-hover",
} as const;

const foundationContract = {
	brand: { blue: "brand-blue" },
	space: {
		1: "space-1",
		2: "space-2",
		3: "space-3",
		4: "space-4",
		6: "space-6",
		8: "space-8",
		12: "space-12",
		16: "space-16",
		24: "space-24",
	},
	layout: {
		headerHeight: "layout-header-height",
		headerHeightMobile: "layout-header-height-mobile",
		heroTop: "layout-hero-top",
		heroTopMobile: "layout-hero-top-mobile",
		heroCopyMax: "layout-hero-copy-max",
		sectionBlock: "layout-section-block",
		sectionBlockCompact: "layout-section-block-compact",
		sectionBlockMobile: "layout-section-block-mobile",
		sectionBlockTight: "layout-section-block-tight",
		sectionBlockSecurityMobile: "layout-section-block-security-mobile",
		contentGap: "layout-content-gap",
		actionOffset: "layout-action-offset",
		wideGap: "layout-wide-gap",
		mediumGap: "layout-medium-gap",
		inlineGap: "layout-inline-gap",
		controlInset: "layout-control-inset",
		controlHeight: "layout-control-height",
		controlHeightMobile: "layout-control-height-mobile",
		copyNarrow: "layout-copy-narrow",
		artMinHeight: "layout-art-min-height",
		artMaxWidth: "layout-art-max-width",
		releaseMaxWidth: "layout-release-max-width",
		releaseBottom: "layout-release-bottom",
		capsCopyMax: "layout-caps-copy-max",
		capsVisualWidth: "layout-caps-visual-width",
		capsVisualWidthMobile: "layout-caps-visual-width-mobile",
		shellMaxWidth: "layout-shell-max-width",
		headerContentMaxWidth: "layout-header-content-max-width",
		pageGutter: "layout-page-gutter",
		pageGutterMobile: "layout-page-gutter-mobile",
		headerControlSize: "layout-header-control-size",
		headerControlPaddingY: "layout-header-control-padding-y",
		headerControlPaddingX: "layout-header-control-padding-x",
		headerMobilePaddingY: "layout-header-mobile-padding-y",
		headerMobilePaddingX: "layout-header-mobile-padding-x",
		headerBackdropBlur: "layout-header-backdrop-blur",
		buttonHeight: "layout-button-height",
		buttonPaddingX: "layout-button-padding-x",
		hairline: "layout-hairline",
		explanationCopyMax: "layout-explanation-copy-max",
		explanationLabelColumn: "layout-explanation-label-column",
		explanationInset: "layout-explanation-inset",
		explanationStatusMin: "layout-explanation-status-min",
		compactControlHeight: "layout-compact-control-height",
		textControlHeight: "layout-text-control-height",
		textControlPaddingY: "layout-text-control-padding-y",
		textControlPaddingX: "layout-text-control-padding-x",
		themeToggleSize: "layout-theme-toggle-size",
	},
	radius: {
		base: "radius",
		small: "radius-small",
		medium: "radius-medium",
		large: "radius-large",
		action: "action-radius",
	},
	type: {
		family: "font-body",
		weightRegular: "font-weight-regular",
		weightMedium: "font-weight-medium",
		size: {
			micro: "font-size-micro",
			fine: "font-size-fine",
			caption: "font-size-caption",
			meta: "font-size-meta",
			label: "font-size-label",
			control: "font-size-control",
			compactBody: "font-size-compact-body",
			body: "font-size-body",
			bodyLarge: "font-size-body-large",
			bodyEmphasis: "font-size-body-emphasis",
			subtitle: "font-size-subtitle",
			headingCompact: "font-size-heading-compact",
			headingSmall: "font-size-heading-small",
			brand: "font-size-brand",
			lead: "font-size-lead",
			headingMedium: "font-size-heading-medium",
			headingLarge: "font-size-heading-large",
			section: "font-size-section",
			sectionLarge: "font-size-section-large",
			displaySmall: "font-size-display-small",
			displayMedium: "font-size-display-medium",
			displayLarge: "font-size-display-large",
		},
		fluid: {
			storyLabel: "font-fluid-story-label",
			securityTitle: "font-fluid-security-title",
			releaseTitle: "font-fluid-release-title",
			capsTitle: "font-fluid-caps-title",
			explanationTitle: "font-fluid-explanation-title",
			compositionWord: "font-fluid-composition-word",
			agentTitle: "font-fluid-agent-title",
		},
	},
	motion: {
		quick: "motion-quick",
		fast: "motion-fast",
		short: "motion-short",
		dialog: "motion-dialog",
		icon: "motion-icon",
		base: "motion-base",
		expand: "motion-expand",
		deliberate: "motion-deliberate",
		slow: "motion-slow",
		entrance: "motion-entrance",
		spin: "motion-spin",
		inkToDark: "motion-ink-to-dark",
		inkToLight: "motion-ink-to-light",
		linear: "motion-linear",
		ease: "motion-ease",
		easeInOut: "motion-ease-in-out",
		standard: "motion-standard",
		emphasized: "motion-emphasized",
	},
} as const;

const nameToken = (name: string | null) => {
	if (name === null) {
		throw new Error("Design token names must be explicit");
	}
	return `--${name}`;
};

export const color = createGlobalThemeContract(colorContract, nameToken);
export const foundation = createGlobalThemeContract(foundationContract, nameToken);
export const palette = createGlobalThemeContract(
	designTokens.palette,
	(_value, path) => `--palette-${path.join("-")}`,
);

createGlobalTheme(":root", foundation, {
	brand: { blue: designTokens.brand.blue },
	space: designTokens.space,
	layout: designTokens.layout,
	radius: {
		base: designTokens.radius.base,
		small: designTokens.radius.small,
		medium: designTokens.radius.medium,
		large: designTokens.radius.large,
		action: designTokens.radius.action,
	},
	type: {
		family: designTokens.type.family,
		weightRegular: designTokens.type.weight.regular,
		weightMedium: designTokens.type.weight.medium,
		size: designTokens.type.size,
		fluid: designTokens.type.fluid,
	},
	motion: {
		quick: designTokens.motion.duration.quick,
		fast: designTokens.motion.duration.fast,
		short: designTokens.motion.duration.short,
		dialog: designTokens.motion.duration.dialog,
		icon: designTokens.motion.duration.icon,
		base: designTokens.motion.duration.base,
		expand: designTokens.motion.duration.expand,
		deliberate: designTokens.motion.duration.deliberate,
		slow: designTokens.motion.duration.slow,
		entrance: designTokens.motion.duration.entrance,
		spin: designTokens.motion.duration.spin,
		inkToDark: designTokens.motion.duration.inkToDark,
		inkToLight: designTokens.motion.duration.inkToLight,
		linear: designTokens.motion.easing.linear,
		ease: designTokens.motion.easing.ease,
		easeInOut: designTokens.motion.easing.easeInOut,
		standard: designTokens.motion.easing.standard,
		emphasized: designTokens.motion.easing.emphasized,
	},
});

createGlobalTheme(":root", palette, designTokens.palette);

createGlobalTheme(":root", color, designTokens.color.light);

createGlobalTheme(':root[data-theme="dark"]', color, designTokens.color.dark);

globalStyle(":root", { colorScheme: "light" });
globalStyle(':root[data-theme="dark"]', { colorScheme: "dark" });
globalStyle(":root", {
	"@media": {
		"(max-width: 640px)": {
			vars: { [foundation.radius.action]: designTokens.radius.actionCompact },
		},
	},
});

export const tokens = { color, palette, ...foundation };
