import path from "node:path";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const withVanillaExtract = createVanillaExtractPlugin({
	unstable_turbopack: { mode: "auto" },
});

export default withVanillaExtract({
	turbopack: { root: repositoryRoot },
	outputFileTracingRoot: repositoryRoot,
});
