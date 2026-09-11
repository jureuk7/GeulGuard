"use client";

import { styles } from "@/styles/styles.css.ts";
import { ArrowRight, LoaderCircle } from "lucide-react";
import rule from "../../../config/karabiner-caps-lock.json";
import { ContentDialog } from "./content-dialog";
import { CopyIcon } from "./copy-icon";
import { useCopyText } from "./use-copy-text";

const code = JSON.stringify(rule, null, 2);
const tokens = code.split(
	/("(?:\\.|[^"\\])*"\s*:|"(?:\\.|[^"\\])*"|\b(?:true|false|null|-?\d+(?:\.\d+)?)\b)/g,
);

function tokenKind(token: string) {
	if (token.startsWith('"')) return token.endsWith(":") ? styles.jsonKey : styles.jsonString;
	if (/^(true|false|null)$/.test(token)) return styles.jsonLiteral;
	if (/^-?\d/.test(token)) return styles.jsonNumber;
	return undefined;
}

export function KarabinerPreview() {
	const { copy, copied, pending } = useCopyText(code, "코드를 직접 선택해서 복사해 주세요.");
	return (
		<ContentDialog title="Caps Lock으로 한·영 전환" trigger="카라비너 설정 보기">
			<p>시스템 설정에서 ‘이전 입력 소스 선택’을 Control+Space로 설정하세요.</p>
			<p>
				Karabiner{" "}
				<ArrowRight className={styles.inlineArrow} size={14} strokeWidth={1.5} aria-hidden="true" />{" "}
				Complex Modifications{" "}
				<ArrowRight className={styles.inlineArrow} size={14} strokeWidth={1.5} aria-hidden="true" />{" "}
				Add your own rule에 아래 코드를 붙여 넣으면 됩니다.
			</p>
			<div className={styles.codeToolbar}>
				<span>karabiner-caps-lock.json</span>
				<button
					type="button"
					onClick={copy}
					disabled={pending}
					aria-busy={pending}
					aria-label={copied ? "복사됨" : "코드 복사"}
				>
					{pending ? (
						<LoaderCircle
							className={styles.copySpinner}
							size={18}
							strokeWidth={1.5}
							aria-hidden="true"
						/>
					) : (
						<CopyIcon copied={copied} />
					)}
				</button>
			</div>
			<pre className={styles.codePreview}>
				<code>
					{tokens.map((token, index) => (
						<span className={tokenKind(token)} key={index}>
							{token}
						</span>
					))}
				</code>
			</pre>
		</ContentDialog>
	);
}
