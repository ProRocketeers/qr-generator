"use client"

import { Button } from "@/components/ui/reusable/Button"
import Image from "next/image"
import { useState, useMemo } from "react"
import { FormContext } from "@/components/ui/form"
import { createSchema, defaultValues, type FormValues } from "@/utils/schemas/baseSchema"
import { parseFormDefaultsFromUrl } from "@/utils/qrFormDefaults"
import { useGenerateQrSvg } from "@/hooks/api/qr"
import {
	FieldsEmail,
	FieldText,
	FieldUrl,
	FieldsWifi,
	FieldsEvent,
	FieldsGeo,
	FieldsContact,
	SelectQrType,
	getPayloadPreview,
} from "@/components/client/qr-generator/form"
import { useTranslations } from 'next-intl'

export function FormBase() {
	const t = useTranslations('common')
	const tValidation = useTranslations('validation')
	const [svg, setSvg] = useState("")
	const [error, setError] = useState("")
	
	// Create schema with translations
	const schema = useMemo(() => createSchema(tValidation), [tValidation])
	
	// Initialize default values from URL params immediately
	const [effectiveDefaultValues] = useState(() => {
		return parseFormDefaultsFromUrl()
	})
	
	const { mutateAsync: generateQrSvg, isPending } = useGenerateQrSvg()

	const handleSubmit = async (formValues: FormValues) => {
		setError("")
		const payloadPreview = getPayloadPreview(formValues)

		try {
			const nextSvg = await generateQrSvg(payloadPreview)
			setSvg(nextSvg)
		} catch {
			setError(t('error'))
		}
	}

	const imageSource = svg ? `data:image/svg+xml;utf8,${encodeURIComponent(svg)}` : ""
	const canDownload = Boolean(svg)

	return (
		<div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<h1 className="text-2xl font-semibold text-slate-900">🚀 {t('appTitle')}</h1>
			<p className="mt-2 text-sm text-slate-600">
				{t('appDescription')}
			</p>

			<FormContext schema={schema} defaultValues={effectiveDefaultValues} onSubmit={handleSubmit}>
				{(form) => {
					const qrType = form.watch("qrType")
					const formValues = form.watch()
					const payloadPreview = getPayloadPreview(formValues)

					return (
						<>
							<div className="mt-6 grid gap-4">
								<SelectQrType />

								{qrType === "url" && <FieldUrl />}
								{qrType === "text" && <FieldText />}
								{qrType === "email" && <FieldsEmail />}
								{qrType === "wifi" && <FieldsWifi />}
								{qrType === "event" && <FieldsEvent />}
								{qrType === "geo" && <FieldsGeo />}
								{qrType === "contact" && <FieldsContact />}

								<div className="flex items-center gap-3">
									<Button type="submit" variant="secondary" disabled={isPending}>
										{isPending ? t('generating') : t('generate')}
									</Button>
									{canDownload && (
										<a
											href={imageSource}
											download={`qr-${qrType}.svg`}
											className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700"
										>
											{t('download')}
										</a>
									)}
								</div>

								{error && <p className="text-sm text-red-600">{error}</p>}
							</div>

							<div className="mt-8 grid gap-4 md:grid-cols-2">
								<div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
									<h2 className="text-sm font-semibold text-slate-700">
										{t('payloadTitle')}
									</h2>
									<pre className="mt-2 overflow-x-auto text-xs text-slate-600">
										{JSON.stringify(payloadPreview, null, 2)}
									</pre>
								</div>

								<div className="flex min-h-64 items-center justify-center rounded-xl border border-slate-200 bg-white p-4">
									{svg ? (
										<Image
											src={imageSource}
											alt={t('qrAlt')}
											width={288}
											height={288}
											unoptimized
											className="h-auto w-full max-w-72"
										/>
									) : (
										<p className="text-sm text-slate-500">
											{t('noQrYet')}
										</p>
									)}
								</div>
							</div>
						</>
					)
				}}
			</FormContext>
		</div>
	)
}
