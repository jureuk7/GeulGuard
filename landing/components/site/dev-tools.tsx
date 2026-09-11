"use client";

import { useEffect } from "react";

export function DevTools() {
	useEffect(() => {
		if (
			process.env.NODE_ENV !== "development" ||
			process.env.NEXT_PUBLIC_DISABLE_REACT_DEVTOOLS === "1"
		)
			return;
		void import("react-grab");
		void import("react-scan").then(({ scan }) => scan({ enabled: true }));
	}, []);
	return null;
}
