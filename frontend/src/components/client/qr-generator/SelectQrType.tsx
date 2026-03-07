"use client"

import { useFormContext } from "react-hook-form"
import { useEffect, useRef } from "react"
import type { FormValues } from "@/utils/schemas/baseSchema"
import { useTranslations } from 'next-intl'
import { syncQrTypeInUrl } from "./urlSync"

export function SelectQrType() {
	const { register, watch } = useFormContext<FormValues>()
	const t = useTranslations('form')
	const tTypes = useTranslations('qrTypes')
	const qrType = watch("qrType")
	const isFirstRender = useRef(true)

	// Update URL when type changes (but not on first render)
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		syncQrTypeInUrl(qrType)
	}, [qrType])

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
				<option value="wifi">{tTypes('wifi')}</option>
				<option value="event">{tTypes('event')}</option>
				<option value="geo">{tTypes('geo')}</option>
				<option value="contact">{tTypes('contact')}</option>
			</select>
		</div>
	)
}
