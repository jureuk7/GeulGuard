"use client";

import { styles } from "@/styles/styles.css.ts";
import SiAndroid from "@icons-pack/react-simple-icons/icons/SiAndroid";
import SiGooglechrome from "@icons-pack/react-simple-icons/icons/SiGooglechrome";
import SiLinux from "@icons-pack/react-simple-icons/icons/SiLinux";
import { Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { MotionLink } from "../shared/page-motion";

type VisitorPlatform = "macOS" | "Windows" | "Linux" | "ChromeOS" | "iOS" | "Android" | "other";

function detectVisitorPlatform(): VisitorPlatform {
	const userAgent = navigator.userAgent;

	if (/Android/i.test(userAgent)) return "Android";
	if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
	if (/Macintosh|Mac OS X/i.test(userAgent)) return navigator.maxTouchPoints > 1 ? "iOS" : "macOS";
	if (/Windows/i.test(userAgent)) return "Windows";
	if (/CrOS/i.test(userAgent)) return "ChromeOS";
	if (/Linux/i.test(userAgent)) return "Linux";

	return "other";
}

function PlatformIcon({ platform }: { readonly platform: VisitorPlatform | null }) {
	if (platform === "Windows") {
		return <WindowsLogo />;
	}

	if (platform === "Linux") {
		return <SiLinux aria-hidden="true" size={18} />;
	}

	if (platform === "ChromeOS") {
		return <SiGooglechrome aria-hidden="true" size={18} />;
	}

	if (platform === "Android") {
		return <SiAndroid aria-hidden="true" size={18} />;
	}

	if (platform === "iOS") {
		return <AppleLogo />;
	}

	return <Monitor aria-hidden="true" size={18} strokeWidth={1.5} />;
}

function WindowsLogo() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path d="M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z" />
		</svg>
	);
}

function AppleLogo() {
	return (
		<svg
			width="18"
			height="20"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M17.05 12.54c.03 3.19 2.8 4.25 2.83 4.26-.02.07-.44 1.52-1.46 3.02-.89 1.3-1.81 2.6-3.27 2.63-1.43.03-1.89-.85-3.53-.85-1.63 0-2.14.82-3.5.88-1.41.05-2.48-1.41-3.38-2.7-1.84-2.66-3.25-7.52-1.36-10.81a5.24 5.24 0 0 1 4.43-2.68c1.39-.03 2.7.93 3.54.93.84 0 2.42-1.15 4.08-.98.69.03 2.64.28 3.9 2.12-.1.06-2.33 1.36-2.28 4.18ZM14.37 4.42c.75-.9 1.25-2.15 1.11-3.4-1.08.04-2.39.72-3.16 1.62-.69.79-1.3 2.06-1.14 3.28 1.2.09 2.43-.61 3.19-1.5Z" />
		</svg>
	);
}

export function PlatformDownload({ href }: { readonly href: string }) {
	const [platform, setPlatform] = useState<VisitorPlatform | null>(null);

	useEffect(() => {
		setPlatform(detectVisitorPlatform());
	}, []);

	if (platform === "macOS") {
		return (
			<MotionLink className={`${styles.button} ${styles.primary}`} href={href}>
				글가드 다운로드
				<AppleLogo />
			</MotionLink>
		);
	}

	return (
		<button
			className={`${styles.button} ${styles.primary} ${styles.platformDownload}`}
			type="button"
			disabled
		>
			<PlatformIcon platform={platform} />
			<span>macOS 전용</span>
		</button>
	);
}
