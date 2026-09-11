"use client";

import type { HTMLMotionProps } from "motion/react";
import { animate, inView, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function PageMotion({ children }: { readonly children: ReactNode }) {
	const root = useRef<HTMLDivElement>(null);
	const reduceMotion = useReducedMotion();
	useEffect(() => {
		if (!root.current || reduceMotion) return;
		const cleanups: (() => void)[] = [];
		const targets = root.current.querySelectorAll<HTMLElement>("[data-reveal]");
		for (const target of targets) {
			const revealKind = target.dataset.reveal;
			const strongGraphic = revealKind === "graphic-strong";
			const visual = revealKind === "visual" || strongGraphic;
			const offset = strongGraphic ? 52 : visual ? 28 : 18;
			const startScale = strongGraphic ? 0.96 : 0.985;
			const original = { opacity: target.style.opacity, transform: target.style.transform };
			let animation: ReturnType<typeof animate> | undefined;
			let revealed = false;
			const restore = () => {
				target.style.opacity = original.opacity;
				target.style.transform = original.transform;
			};
			// Keep the initial viewport and restored scroll positions immediately readable.
			const belowFold = target.getBoundingClientRect().top >= window.innerHeight;
			revealed = !belowFold;
			if (belowFold) {
				target.style.opacity = "0";
				target.style.transform = `translateY(${offset}px)${visual ? ` scale(${startScale})` : ""}`;
			}
			const show = (immediate = false) => {
				if (immediate) {
					revealed = true;
					animation?.stop();
					restore();
					return;
				}
				if (revealed) return;
				revealed = true;
				animation = animate(
					target,
					{
						opacity: [0, 1],
						y: [offset, 0],
						...(visual ? { scale: [startScale, 1] } : {}),
					},
					{
						duration: strongGraphic ? 0.92 : visual ? 0.76 : 0.6,
						ease: revealEase,
						onComplete: restore,
					},
				);
			};
			const stop = inView(target, () => show(), { margin: "0px 0px -48px 0px", amount: "some" });
			const onFocus = () => show(true);
			target.addEventListener("focusin", onFocus);
			cleanups.push(() => {
				stop();
				animation?.stop();
				restore();
				target.removeEventListener("focusin", onFocus);
			});
		}
		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	}, [reduceMotion]);
	return <div ref={root}>{children}</div>;
}

export function MotionLink(props: HTMLMotionProps<"a">) {
	const reduceMotion = useReducedMotion();
	return (
		<motion.a
			{...props}
			whileHover={reduceMotion ? {} : { y: -2 }}
			whileTap={reduceMotion ? {} : { scale: 0.98 }}
			transition={{ type: "spring", stiffness: 450, damping: 28 }}
		/>
	);
}
