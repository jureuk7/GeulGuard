import { globalStyle } from "@vanilla-extract/css";
import { tokens } from "../tokens.css";
import { classScopes } from "../class-scopes.css";

globalStyle(
	`${classScopes.textLink} svg,
	${classScopes.siteHeader} nav a svg,
	${classScopes.siteFooter} a svg`,
	{
		"@media": {
			"(prefers-reduced-motion: no-preference)": {
				transition: `transform ${tokens.motion.short} ${tokens.motion.ease}`,
			},
		},
	},
);

globalStyle(
	`${classScopes.textLink}:hover svg,
	${classScopes.siteHeader} nav a:not(${classScopes.githubLink}):hover svg,
	${classScopes.siteFooter} a:hover svg`,
	{
		"@media": {
			"(prefers-reduced-motion: no-preference)": {
				transform: "translate(2px, -2px)",
			},
		},
	},
);

globalStyle(
	`${classScopes.button},
${classScopes.textLink},
${classScopes.textButton},
${classScopes.siteHeader} nav a,
${classScopes.siteFooter} > a`,
	{
		textDecoration: "none",
	},
);

globalStyle(
	`${classScopes.button}:hover,
${classScopes.textLink}:hover,
${classScopes.textButton}:hover,
${classScopes.siteHeader} nav a:hover,
${classScopes.brand}:hover,
${classScopes.siteFooter} > a:hover`,
	{
		textDecoration: "none",
	},
);

export const styleFragments = {} as const;

export const selectorFragments = {} as const;
