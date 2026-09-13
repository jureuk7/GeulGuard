import { afterEach, expect, test } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { PlatformDownload } from "../components/hero/platform-download";

const nativeNavigator = globalThis.navigator;

function setNavigator(userAgent: string, maxTouchPoints = 0) {
	Object.defineProperty(globalThis, "navigator", {
		configurable: true,
		value: { maxTouchPoints, userAgent },
	});
}

afterEach(() => {
	cleanup();
	Object.defineProperty(globalThis, "navigator", {
		configurable: true,
		value: nativeNavigator,
	});
});

test("keeps the download link active on macOS", async () => {
	setNavigator("Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)");

	render(<PlatformDownload href="/GeulGuard.pkg" />);

	const link = await screen.findByRole("link", { name: "글가드 다운로드" });
	expect(link.getAttribute("href")).toBe("/GeulGuard.pkg");
});

test("disables the download action outside macOS", async () => {
	setNavigator("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

	render(<PlatformDownload href="/GeulGuard.pkg" />);

	const button = await screen.findByRole("button", { name: "macOS 전용" });
	expect(button).toHaveProperty("disabled", true);
	expect(screen.queryByRole("link", { name: "글가드 다운로드" })).toBeNull();
});
