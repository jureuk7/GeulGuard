"use client";

import { styles } from "@/styles/styles.css.ts";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext, useId, useState } from "react";

const FaqContext = createContext<{
	openId: string | null;
	toggle: (id: string) => void;
} | null>(null);

export function FaqList({ children }: { readonly children: ReactNode }) {
	const [openId, setOpenId] = useState<string | null>(null);
	const toggle = (id: string) => setOpenId((current) => (current === id ? null : id));
	return (
		<FaqContext.Provider value={{ openId, toggle }}>
			<div className={styles.faqList} data-reveal>
				{children}
			</div>
		</FaqContext.Provider>
	);
}

export function FaqItem({
	title,
	children,
}: {
	readonly title: string;
	readonly children: ReactNode;
}) {
	const group = useContext(FaqContext);
	if (!group) throw new Error("FaqItem must be rendered inside FaqList");
	const id = useId();
	const open = group.openId === id;
	const reduced = useReducedMotion();
	return (
		<div className={styles.faqItem}>
			<h3>
				<button
					type="button"
					aria-expanded={open}
					aria-controls={id}
					onClick={() => group.toggle(id)}
				>
					{title}
					<motion.span
						animate={{ rotate: open ? 45 : 0 }}
						transition={{ duration: reduced ? 0 : 0.24 }}
					>
						<Plus size={20} strokeWidth={1.5} aria-hidden="true" />
					</motion.span>
				</button>
			</h3>
			<motion.div
				id={id}
				inert={!open}
				aria-hidden={!open}
				initial={false}
				animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
				transition={{
					height: { duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] },
					opacity: { duration: reduced ? 0 : 0.18 },
				}}
				style={{ overflow: "hidden" }}
			>
				<div className={styles.faqAnswer}>{children}</div>
			</motion.div>
		</div>
	);
}
