"use client"

import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import type { FormValues } from "@/utils/schemas/baseSchema"
import { useTranslations } from 'next-intl'
import { syncQrFieldsInUrl } from "@/components/client/qr-generator/urlSync"

export function FieldUrl() {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<FormValues>()
	const t = useTranslations('form')
	const url = watch("url")

	useEffect(() => {
		syncQrFieldsInUrl("url", { url })
	}, [url])

	return (
		<div className="grid gap-2">
			<label className="text-sm font-medium text-slate-700" htmlFor="url-value">
				{t('urlLabel')}
			</label>
			<input
				id="url-value"
				type="text"
				placeholder={t('urlPlaceholder')}
				{...register("url")}
				className="h-10 rounded-md border border-slate-300 px-3 text-sm"
			/>
			{errors.url && <p className="text-sm text-red-600">{errors.url.message}</p>}
		</div>
	)
}
