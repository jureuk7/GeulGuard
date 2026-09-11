"use client";

import { styles } from "@/styles/styles.css.ts";
import { LoaderCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CopyIcon } from "./copy-icon";
import { useCopyText } from "./use-copy-text";

const installPrompt =
	"https://github.com/jureuk7/GeulGuard 의 AGENTS.md와 docs/agent-setup.md를 읽고 글가드를 설치해 줘. 영어는 ABC, 한글은 글가드를 쓰고, Caps Lock은 카라비너로 입력 전환만 하게 해 줘. 기존 설정을 백업하고 가능한 설치와 설정을 진행한 뒤, 필요한 사용자 조작과 실제 검증 결과를 알려 줘.";

export function AgentInstall() {
	const reduceMotion = useReducedMotion();
	const { copy, copied, pending, message } = useCopyText(
		installPrompt,
		"자동 복사를 사용할 수 없습니다. 아래 요청문을 직접 선택해서 복사하세요.",
	);
	return (
		<div id="agent-install" className={styles.agentInstall}>
			<div>
				<h3>에이전트에게 맡겨도 됩니다.</h3>
				<p>
					저장소에 접근할 수 있는 코딩 에이전트에 설치를 요청하세요.
					<br />
					관리자 인증과 권한 승인은 직접 마무리합니다.
				</p>
			</div>
			<motion.button
				whileHover={reduceMotion ? {} : { y: -1 }}
				whileTap={reduceMotion ? {} : { scale: 0.98 }}
				className={`${styles.button} ${styles.secondary}`}
				type="button"
				onClick={copy}
				disabled={pending}
				aria-busy={pending}
			>
				설치 요청문 복사
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
			</motion.button>
			<p className={styles.copyStatus} role="status" aria-atomic="true">
				<span className={copied || pending ? styles.srOnly : undefined}>{message}</span>
			</p>
			<p className={`${styles.promptText} ${styles.installPrompt}`}>
				<span className={styles.srOnly}>설치 요청문: </span>
				{installPrompt}
			</p>
		</div>
	);
}
