import { classScopes, type StyleName } from "./class-scopes.css";
import {
	selectorFragments as agentInstallSelectors,
	styleFragments as agentInstallStyles,
} from "./features/agent-install.css";
import {
	selectorFragments as capsLockSelectors,
	styleFragments as capsLockStyles,
} from "./features/caps-lock.css";
import {
	selectorFragments as dialogsSelectors,
	styleFragments as dialogsStyles,
} from "./features/dialogs.css";
import { selectorFragments as faqSelectors, styleFragments as faqStyles } from "./features/faq.css";
import {
	selectorFragments as footerSelectors,
	styleFragments as footerStyles,
} from "./features/footer.css";
import {
	selectorFragments as heroSelectors,
	styleFragments as heroStyles,
} from "./features/hero.css";
import {
	selectorFragments as installSelectors,
	styleFragments as installStyles,
} from "./features/install.css";
import { selectorFragments as kbdSelectors, styleFragments as kbdStyles } from "./features/kbd.css";
import {
	selectorFragments as keyboardLegendsSelectors,
	styleFragments as keyboardLegendsStyles,
} from "./features/keyboard-legends.css";
import {
	selectorFragments as keyboardSelectors,
	styleFragments as keyboardStyles,
} from "./features/keyboard.css";
import {
	selectorFragments as keycapSelectors,
	styleFragments as keycapStyles,
} from "./features/keycap.css";
import {
	selectorFragments as memorySelectors,
	styleFragments as memoryStyles,
} from "./features/memory.css";
import {
	selectorFragments as playgroundSelectors,
	styleFragments as playgroundStyles,
} from "./features/playground.css";
import {
	selectorFragments as explanationSelectors,
	styleFragments as explanationStyles,
} from "./features/explanation.css";
import {
	selectorFragments as securitySelectors,
	styleFragments as securityStyles,
} from "./features/security.css";
import {
	selectorFragments as linkMotionSelectors,
	styleFragments as linkMotionStyles,
} from "./features/link-motion.css";
import {
	selectorFragments as themeToggleSelectors,
	styleFragments as themeToggleStyles,
} from "./features/theme-toggle.css";
import {
	selectorFragments as headerSelectors,
	styleFragments as headerStyles,
} from "./features/header.css";
import {
	selectorFragments as baseSelectors,
	styleFragments as baseStyles,
} from "./features/base.css";
import {
	selectorFragments as controlsSelectors,
	styleFragments as controlsStyles,
} from "./features/controls.css";
import {
	selectorFragments as sharedSelectors,
	styleFragments as sharedStyles,
} from "./features/shared.css";
import {
	selectorFragments as releasesSelectors,
	styleFragments as releasesStyles,
} from "./features/releases.css";
import {
	selectorFragments as themeSelectors,
	styleFragments as themeStyles,
} from "./features/theme.css";

type FragmentMap = Partial<Record<StyleName, readonly string[]>>;
const fragmentMaps: readonly FragmentMap[] = [
	agentInstallStyles,
	agentInstallSelectors,
	capsLockStyles,
	capsLockSelectors,
	dialogsStyles,
	dialogsSelectors,
	faqStyles,
	faqSelectors,
	footerStyles,
	footerSelectors,
	heroStyles,
	heroSelectors,
	installStyles,
	installSelectors,
	kbdStyles,
	kbdSelectors,
	keyboardLegendsStyles,
	keyboardLegendsSelectors,
	keyboardStyles,
	keyboardSelectors,
	keycapStyles,
	keycapSelectors,
	memoryStyles,
	memorySelectors,
	playgroundStyles,
	playgroundSelectors,
	explanationStyles,
	explanationSelectors,
	securityStyles,
	securitySelectors,
	linkMotionStyles,
	linkMotionSelectors,
	themeToggleStyles,
	themeToggleSelectors,
	headerStyles,
	headerSelectors,
	baseStyles,
	baseSelectors,
	controlsStyles,
	controlsSelectors,
	sharedStyles,
	sharedSelectors,
	releasesStyles,
	releasesSelectors,
	themeStyles,
	themeSelectors,
];

export const styles = Object.fromEntries(
	(Object.entries(classScopes) as [StyleName, string][]).map(([name, scope]) => [
		name,
		[scope, ...fragmentMaps.flatMap((fragments) => fragments[name] ?? [])].join(" "),
	]),
) as Record<StyleName, string>;

export { classScopes };
