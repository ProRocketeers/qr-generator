"use client"

import { useFormContext } from "react-hook-form"
import type { FormValues } from "@/utils/schemas/formSelectWrapperSchema"
import { useTranslations } from 'next-intl'

export function SelectQrType() {
	const { register } = useFormContext<FormValues>()
	const t = useTranslations('form')
	const tTypes = useTranslations('qrTypes')

	return (
		<div className="grid gap-2">
			<label className="text-sm font-medium text-slate-700" htmlFor="qr-type">
				{t('selectType')}
			</label>
			<select
				id="qr-type"
				{...register("qrType")}
				className="h-10 rounded-md border border-slate-300 px-3 text-sm"
			>
				<option value="url">{tTypes('url')}</option>
				<option value="text">{tTypes('text')}</option>
				<option value="email">{tTypes('email')}</option>
			</select>
		</div>
	)
}
