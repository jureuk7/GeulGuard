import { afterEach, describe, expect, mock, test } from "bun:test";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useCopyText } from "../components/install/use-copy-text";

afterEach(cleanup);

describe("clipboard feedback", () => {
	test("announces each completed copy when copying repeatedly", async () => {
		// Given
		const writeText = mock(async (_text: string) => {});
		Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
		const { result } = renderHook(() => useCopyText("sample", "Copy manually"));
		await act(async () => {
			await result.current.copy();
		});
		const firstAnnouncement = result.current.message;
		// When
		await act(async () => {
			await result.current.copy();
		});
		// Then
		expect(writeText).toHaveBeenCalledTimes(2);
		expect(writeText).toHaveBeenLastCalledWith("sample");
		expect(result.current.copied).toBe(true);
		expect(result.current.message).not.toBe(firstAnnouncement);
	});

	test("blocks a second write while the clipboard request is pending", async () => {
		// Given
		const deferred = Promise.withResolvers<void>();
		const writeText = mock(() => deferred.promise);
		Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
		const { result } = renderHook(() => useCopyText("sample", "Copy manually"));
		// When
		let firstCopy: Promise<void> | undefined;
		act(() => {
			firstCopy = result.current.copy();
		});
		await act(async () => {
			await result.current.copy();
		});
		// Then
		expect(writeText).toHaveBeenCalledTimes(1);
		expect(result.current.pending).toBe(true);
		await act(async () => {
			deferred.resolve();
			await firstCopy;
		});
		expect(result.current.pending).toBe(false);
	});

	test("offers recovery when clipboard permission is denied", async () => {
		// Given
		const writeText = mock(async () => {
			throw new DOMException("denied", "NotAllowedError");
		});
		Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
		const recovery = "Select the original text";
		const { result } = renderHook(() => useCopyText("sample", recovery));
		// When
		await act(async () => {
			await result.current.copy();
		});
		// Then
		expect(result.current.message).toBe(recovery);
		expect(result.current.pending).toBe(false);
		expect(result.current.copied).toBe(false);
	});

	test("can retry after a clipboard failure", async () => {
		// Given
		const writeText = mock(async () => {});
		writeText.mockRejectedValueOnce(new DOMException("denied", "NotAllowedError"));
		Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
		const { result } = renderHook(() => useCopyText("sample", "Copy manually"));
		await act(async () => {
			await result.current.copy();
		});
		// When
		await act(async () => {
			await result.current.copy();
		});
		// Then
		expect(result.current.copied).toBe(true);
		expect(result.current.pending).toBe(false);
	});
});
