import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const landingRoot = join(import.meta.dir, "..");

function filesBelow(directory: string, extension: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);
		return entry.isDirectory()
			? filesBelow(path, extension)
			: entry.name.endsWith(extension)
				? [path]
				: [];
	});
}

describe("Vanilla Extract class architecture", () => {
	test("component classes are exported instead of declared as literal global selectors", () => {
		const styleFiles = filesBelow(join(landingRoot, "styles"), ".css.ts");
		const literalGlobalClasses = styleFiles.flatMap((path) => {
			const source = readFileSync(path, "utf8");
			return [...source.matchAll(/globalStyle\(\s*["']\.[a-z][\w-]*/g)].map(
				(match) => `${path}:${match.index}`,
			);
		});

		expect(literalGlobalClasses).toEqual([]);
	});

	test("React consumers do not rely on literal CSS class names", () => {
		const sourceFiles = [
			...filesBelow(join(landingRoot, "app"), ".tsx"),
			...filesBelow(join(landingRoot, "components"), ".tsx"),
		];
		const literalClassNames = sourceFiles.flatMap((path) => {
			const source = readFileSync(path, "utf8");
			return [...source.matchAll(/className\s*=\s*["'][^"']+["']/g)].map(
				(match) => `${path}:${match.index}`,
			);
		});

		expect(literalClassNames).toEqual([]);
	});
});
