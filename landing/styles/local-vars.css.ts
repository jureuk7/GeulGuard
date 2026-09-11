import { createVar } from "@vanilla-extract/css";
import { designTokens } from "./design-tokens";

const colorVariable = (initialValue: string, name: string) =>
	createVar({ syntax: "<color>", inherits: true, initialValue }, name);

export const localVars = {
	keyUnits: createVar({ syntax: "<number>", inherits: false, initialValue: "1" }, "keyUnits"),
	keyGap: createVar({ syntax: "*", inherits: true }, "keyGap"),
	keyUnit: createVar({ syntax: "*", inherits: true }, "keyUnit"),
	keyFaceStart: colorVariable(designTokens.component.keyFace.start, "keyFaceStart"),
	keyFaceMid: colorVariable(designTokens.component.keyFace.middle, "keyFaceMid"),
	keyFaceEnd: colorVariable(designTokens.component.keyFace.end, "keyFaceEnd"),
	agentWash: colorVariable(designTokens.component.agent.wash, "agentWash"),
	agentGlow: colorVariable(designTokens.component.agent.glow, "agentGlow"),
	agentHighlight: colorVariable(designTokens.component.agent.highlight, "agentHighlight"),
	themeInkDelay: createVar(
		{ syntax: "<time>", inherits: true, initialValue: "0ms" },
		"themeInkDelay",
	),
	memoryDelay: createVar({ syntax: "<time>", inherits: false, initialValue: "0s" }, "memoryDelay"),
} as const;
