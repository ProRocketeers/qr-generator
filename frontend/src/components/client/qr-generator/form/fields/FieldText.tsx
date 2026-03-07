"use client"

import { useFormContext } from "react-hook-form"
import type { FormValues } from "@/utils/schemas/formSelectWrapperSchema"

export function FieldText() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>()

	return (
		<div className="grid gap-2">
			<label className="text-sm font-medium text-slate-700" htmlFor="text-value">
				Text
			</label>
			<textarea
				id="text-value"
				rows={4}
				placeholder="Napr. Ahoj svete"
				{...register("text")}
				className="rounded-md border border-slate-300 p-3 text-sm"
			/>
			{errors.text && <p className="text-sm text-red-600">{errors.text.message}</p>}
		</div>
	)
}
