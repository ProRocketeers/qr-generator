"use client"

import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import type { FormValues } from "@/utils/schemas/baseSchema"
import { useTranslations } from 'next-intl'
import { syncQrFieldsInUrl } from "@/components/client/qr-generator/urlSync"

export function FieldsGeo() {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<FormValues>()
	const t = useTranslations('form')
	const latitude = watch("latitude")
	const longitude = watch("longitude")
	const altitude = watch("altitude")

	useEffect(() => {
		syncQrFieldsInUrl("geo", { latitude, longitude, altitude })
	}, [latitude, longitude, altitude])

	const parseOptionalNumber = (value: unknown) => {
		if (value === "" || value === null || value === undefined) {
			return undefined
		}

		const parsed = typeof value === "number" ? value : Number(value)
		return Number.isFinite(parsed) ? parsed : undefined
	}

	return (
		<div className="grid gap-3">
			{/* Avoid NaN from empty number inputs so schema can show required-field errors */}
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="latitude">
					{t('latitudeLabel')}
				</label>
				<input
					id="latitude"
					type="number"
					step="0.000001"
					min="-90"
					max="90"
					placeholder={t('latitudePlaceholder')}
					{...register("latitude", {
						setValueAs: parseOptionalNumber,
					})}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.latitude && <p className="text-sm text-red-600">{errors.latitude.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="longitude">
					{t('longitudeLabel')}
				</label>
				<input
					id="longitude"
					type="number"
					step="0.000001"
					min="-180"
					max="180"
					placeholder={t('longitudePlaceholder')}
					{...register("longitude", {
						setValueAs: parseOptionalNumber,
					})}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.longitude && <p className="text-sm text-red-600">{errors.longitude.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="altitude">
					{t('altitudeLabel')}
				</label>
				<input
					id="altitude"
					type="number"
					step="0.1"
					placeholder={t('altitudePlaceholder')}
					{...register("altitude", {
						setValueAs: parseOptionalNumber,
					})}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.altitude && <p className="text-sm text-red-600">{errors.altitude.message}</p>}
			</div>
		</div>
	)
}
