import { styles } from "@/styles/styles.css.ts";
import type { ReactNode } from "react";

export function Kbd({ children }: { readonly children: ReactNode }) {
	return <kbd className={styles.inlineKbd}>{children}</kbd>;
}
