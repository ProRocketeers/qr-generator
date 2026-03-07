import { FormBase } from "@/components/client/qr-generator/FormBase"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-slate-100">
			<div className="flex-1 px-4 py-10">
				<div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
					<FormBase />
					<LanguageSwitcher />
				</div>
			</div>
		</div>
	)
}
