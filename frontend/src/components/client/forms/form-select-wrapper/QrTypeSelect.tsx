"use client"

import { useFormContext } from "react-hook-form"
import type { FormValues } from "@/utils/schemas/formSelectWrapperSchema"

export function QrTypeSelect() {
	const { register } = useFormContext<FormValues>()

	return (
		<div className="grid gap-2">
			<label className="text-sm font-medium text-slate-700" htmlFor="qr-type">
				Typ QR kódu
			</label>
			<select
				id="qr-type"
				{...register("qrType")}
				className="h-10 rounded-md border border-slate-300 px-3 text-sm"
			>
				<option value="url">Url</option>
				<option value="text">Text</option>
				<option value="email">Email</option>
			</select>
		</div>
	)
}
