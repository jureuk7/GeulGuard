"use client";

import { useRef, useState } from "react";

export function useCopyText(text: string, failureMessage: string) {
	const inFlight = useRef(false);
	const completedCopies = useRef(0);
	const [feedback, setFeedback] = useState({
		pending: false,
		copied: false,
		message: "",
	});

	async function copy() {
		if (inFlight.current) return;
		inFlight.current = true;
		setFeedback({ pending: true, copied: false, message: "복사 중" });
		try {
			await navigator.clipboard.writeText(text);
			completedCopies.current += 1;
			setFeedback({
				pending: false,
				copied: true,
				message: `복사 완료 (${completedCopies.current}회)`,
			});
		} catch (error: unknown) {
			if (!(error instanceof Error)) throw error;
			setFeedback({ pending: false, copied: false, message: failureMessage });
		} finally {
			inFlight.current = false;
		}
	}

	return { ...feedback, copy };
}
