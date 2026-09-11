"use client";

import { styles } from "@/styles/styles.css.ts";
import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useId, useRef } from "react";

export function ContentDialog({
	title,
	trigger,
	children,
}: {
	readonly title: string;
	readonly trigger: string;
	readonly children: ReactNode;
}) {
	const dialog = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const reduceMotion = useReducedMotion();
	return (
		<>
			<motion.button
				className={styles.textButton}
				type="button"
				onClick={() => dialog.current?.showModal()}
				whileHover={reduceMotion ? {} : { y: -1 }}
				whileTap={reduceMotion ? {} : { scale: 0.98 }}
			>
				{trigger}
			</motion.button>
			<dialog ref={dialog} className={styles.contentDialog} aria-labelledby={titleId}>
				<header className={styles.dialogHeader}>
					<h2 id={titleId}>{title}</h2>
					<button
						type="button"
						className={styles.closeDialog}
						aria-label="닫기"
						onClick={() => dialog.current?.close()}
					>
						<X size={22} strokeWidth={1.5} aria-hidden="true" />
					</button>
				</header>
				<div className={styles.dialogBody}>{children}</div>
			</dialog>
		</>
	);
}
