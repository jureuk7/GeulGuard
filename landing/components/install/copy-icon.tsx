"use client";

import { styles } from "@/styles/styles.css.ts";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function CopyIcon({ copied }: { readonly copied: boolean }) {
	const reduced = useReducedMotion();
	const Icon = copied ? Check : Copy;
	return (
		<span className={styles.copyIcon} aria-hidden="true">
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={String(copied)}
					initial={{ opacity: 0, scale: reduced ? 1 : 0.7 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: reduced ? 1 : 0.7 }}
					transition={{ duration: reduced ? 0 : 0.14 }}
				>
					<Icon size={18} strokeWidth={1.5} />
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
