"use client";

import { styles } from "@/styles/styles.css.ts";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

function readSavedTheme(): Theme | null {
	try {
		const value = localStorage.getItem("geulguard-theme");
		return value === "dark" || value === "light" ? value : null;
	} catch (error) {
		if (error instanceof DOMException) return null;
		throw error;
	}
}

function saveTheme(theme: Theme) {
	try {
		localStorage.setItem("geulguard-theme", theme);
	} catch (error) {
		if (!(error instanceof DOMException)) throw error;
	}
}

export function ThemeToggle() {
	const [dark, setDark] = useState(false);
	const fallbackTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	useEffect(() => {
		const preference = window.matchMedia("(prefers-color-scheme: dark)");
		const sync = () => {
			const saved = readSavedTheme();
			const next = saved ? saved === "dark" : preference.matches;
			document.documentElement.dataset.theme = next ? "dark" : "light";
			setDark(next);
		};
		sync();
		preference.addEventListener("change", sync);
		return () => {
			preference.removeEventListener("change", sync);
			clearTimeout(fallbackTimer.current);
		};
	}, []);

	function toggle() {
		const root = document.documentElement;
		const next = root.dataset.theme !== "dark";
		const apply = () => {
			const theme = next ? "dark" : "light";
			root.dataset.theme = theme;
			setDark(next);
			saveTheme(theme);
		};
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			apply();
			return;
		}
		root.dataset.themeTransition = next ? "to-dark" : "to-light";
		void getComputedStyle(root).color;
		apply();
		clearTimeout(fallbackTimer.current);
		fallbackTimer.current = setTimeout(() => delete root.dataset.themeTransition, 300);
	}

	return (
		<button
			className={styles.themeToggle}
			type="button"
			aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
			aria-pressed={dark}
			onClick={toggle}
		>
			<Sun size={18} strokeWidth={1.5} className={styles.themeSun} aria-hidden="true" />
			<Moon size={18} strokeWidth={1.5} className={styles.themeMoon} aria-hidden="true" />
		</button>
	);
}
