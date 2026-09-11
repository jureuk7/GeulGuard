import { styles } from "@/styles/styles.css.ts";
import { Code2, FileX2, WifiOff } from "lucide-react";

const details = [
	{
		Icon: FileX2,
		title: "입력 기록을 남기지 않습니다.",
		description:
			"조합 중인 글자는 메모리에서 처리하고, 입력 내용을 파일이나 로그로 저장하지 않습니다.",
	},
	{
		Icon: WifiOff,
		title: "서버로 보내지 않습니다.",
		description: "글가드는 네트워크 연결 없이 Mac 안에서 한글을 조합해 사용 중인 앱에 전달합니다.",
	},
	{
		Icon: Code2,
		title: "코드로 확인할 수 있습니다.",
		description: "입력을 처리하는 코드와 빌드 스크립트를 GitHub에 공개합니다.",
	},
];

export function SecurityDetails() {
	return (
		<dl className={styles.securityDetails} data-reveal>
			{details.map(({ Icon, title, description }) => (
				<div className={styles.securityDetail} key={title}>
					<dt>
						<span className={styles.securityDetailIcon} aria-hidden="true">
							<Icon size={20} strokeWidth={1.5} />
						</span>
						{title}
					</dt>
					<dd>{description}</dd>
				</div>
			))}
		</dl>
	);
}
