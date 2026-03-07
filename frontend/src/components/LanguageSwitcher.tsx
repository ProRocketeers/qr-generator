"use client"

import { useTransition } from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export function LanguageSwitcher() {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const pathname = usePathname()
	const locale = useLocale()

	const handleChange = (newLocale: string) => {
		startTransition(() => {
			router.replace(pathname, { locale: newLocale })
		})
	}

	return (
		<div className="flex gap-2">
			<button
				onClick={() => handleChange('cs')}
				disabled={isPending || locale === 'cs'}
				className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
					locale === 'cs'
						? 'bg-slate-900 text-white'
						: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
				}`}
			>
				🇨🇿 CS
			</button>
			<button
				onClick={() => handleChange('en')}
				disabled={isPending || locale === 'en'}
				className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
					locale === 'en'
						? 'bg-slate-900 text-white'
						: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
				}`}
			>
				🇬🇧 EN
			</button>
		</div>
	)
}
