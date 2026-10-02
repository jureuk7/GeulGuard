import type { Metadata } from "next";
import type { ReactNode } from "react";
import "interlude-ui/css/dynamic-subset";
import "../styles/index.css";
import { DevTools } from "../components/site/dev-tools";
import { Analytics } from "@vercel/analytics/next";

const title = "글가드 — 쓰던 한글, 끝까지";
const description =
	"macOS 한글 조합 중 글자 누락을 줄이기 위한 오픈소스 두벌식 입력기. 영어는 ABC 그대로, 한글은 글가드로 입력하세요.";
const socialImage = {
	url: "https://raw.githubusercontent.com/jureuk7/GeulGuard/main/docs/assets/geulguard-opengraph.png",
	width: 1200,
	height: 630,
	alt: "쓰던 한글, 끝까지. 글가드",
};

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		type: "website",
		locale: "ko_KR",
		images: [socialImage],
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		images: [socialImage],
	},
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `try{const t=localStorage.getItem("geulguard-theme");document.documentElement.dataset.theme=t==="dark"||t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{document.documentElement.dataset.theme=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}`,
					}}
				/>
			</head>
			<body>
				{process.env.NODE_ENV === "development" && <DevTools />}
				{children}
				<Analytics />
			</body>
		</html>
	);
}
