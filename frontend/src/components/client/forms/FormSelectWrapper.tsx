"use client"

import { api } from "@/api/axios"
import { Button } from "@/components/ui/reusable/Button"
import Image from "next/image"
import { useState } from "react"
import { FormContext } from "@/components/ui/form"
import { schema, defaultValues, type FormValues } from "@/utils/schemas/formSelectWrapperSchema"
import {
	EmailFields,
	getPayloadPreview,
	QrTypeSelect,
	TextField,
	UrlField,
} from "@/components/client/forms/form-select-wrapper"

export function FormSelectWrapper() {
	const [svg, setSvg] = useState("")
	const [error, setError] = useState("")
	const [isPending, setIsPending] = useState(false)

	const handleSubmit = async (formValues: FormValues) => {
		setError("")
		const payloadPreview = getPayloadPreview(formValues)

		setIsPending(true)
		try {
			const response = await api.post<string>("/api/v1/qr/svg", payloadPreview, {
				responseType: "text",
			})
			setSvg(response.data)
		} catch {
			setError("Generovani QR selhalo. Zkontroluj, ze backend bezi na API_URL.")
		} finally {
			setIsPending(false)
		}
	}

	const imageSource = svg ? `data:image/svg+xml;utf8,${encodeURIComponent(svg)}` : ""
	const canDownload = Boolean(svg)

	return (
		<div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<h1 className="text-2xl font-semibold text-slate-900">QR Generator POC</h1>
			<p className="mt-2 text-sm text-slate-600">
				Vyber typ, vypln formular a vygeneruj QR kod pres backend API.
			</p>

			<FormContext schema={schema} defaultValues={defaultValues} onSubmit={handleSubmit}>
				{(form) => {
					const qrType = form.watch("qrType")
					const formValues = form.watch()
					const payloadPreview = getPayloadPreview(formValues)

					return (
						<>
							<div className="mt-6 grid gap-4">
								<QrTypeSelect />

								{qrType === "url" && <UrlField />}
								{qrType === "text" && <TextField />}
								{qrType === "email" && <EmailFields />}

								<div className="flex items-center gap-3">
									<Button type="submit" variant="secondary" disabled={isPending}>
										{isPending ? "Generuji..." : "Vygenerovat QR"}
									</Button>
									{canDownload && (
										<a
											href={imageSource}
											download={`qr-${qrType}.svg`}
											className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700"
										>
											Stahnout SVG
										</a>
									)}
								</div>

								{error && <p className="text-sm text-red-600">{error}</p>}
							</div>

							<div className="mt-8 grid gap-4 md:grid-cols-2">
								<div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
									<h2 className="text-sm font-semibold text-slate-700">
										Payload odeslany na backend
									</h2>
									<pre className="mt-2 overflow-x-auto text-xs text-slate-600">
										{JSON.stringify(payloadPreview, null, 2)}
									</pre>
								</div>

								<div className="flex min-h-64 items-center justify-center rounded-xl border border-slate-200 bg-white p-4">
									{svg ? (
										<Image
											src={imageSource}
											alt="Vygenerovany QR kod"
											width={288}
											height={288}
											unoptimized
											className="h-auto w-full max-w-72"
										/>
									) : (
										<p className="text-sm text-slate-500">
											Zatim nic. Vypln formular a klikni na Vygenerovat QR.
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
