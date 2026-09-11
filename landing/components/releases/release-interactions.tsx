"use client";

import { styles } from "@/styles/styles.css.ts";
import { ArrowUp } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
} from "motion/react";
import { useState } from "react";

export function ReleaseInteractions() {
	const { scrollY, scrollYProgress } = useScroll();
	const reduced = useReducedMotion();
	const [showTop, setShowTop] = useState(false);
	useMotionValueEvent(scrollY, "change", (value) => setShowTop(value > 500));
	return (
		<>
			<motion.div
				className={styles.releaseProgress}
				aria-hidden="true"
				style={{ scaleX: scrollYProgress }}
			/>
			<AnimatePresence>
				{showTop && (
					<motion.button
						className={styles.releaseTop}
						type="button"
						initial={{ opacity: 0, y: reduced ? 0 : 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: reduced ? 0 : 8 }}
						transition={{ duration: reduced ? 0 : 0.18 }}
						onClick={() => {
							document.querySelector<HTMLElement>("#release-title")?.focus({ preventScroll: true });
							window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
						}}
					>
						<ArrowUp size={16} strokeWidth={1.5} />맨 위로
					</motion.button>
				)}
			</AnimatePresence>
		</>
	);
}
