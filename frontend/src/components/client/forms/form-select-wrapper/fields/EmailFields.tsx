"use client"

import { useFormContext } from "react-hook-form"
import type { FormValues } from "@/utils/schemas/formSelectWrapperSchema"

export function FieldsEmail() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>()

	return (
		<div className="grid gap-3">
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="email-to">
					To
				</label>
				<input
					id="email-to"
					type="email"
					placeholder="john@example.com"
					{...register("to")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.to && <p className="text-sm text-red-600">{errors.to.message}</p>}
			</div>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="email-subject">
					Subject
				</label>
				<input
					id="email-subject"
					type="text"
					placeholder="Predmet"
					{...register("subject")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.subject && <p className="text-sm text-red-600">{errors.subject.message}</p>}
			</div>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="email-body">
					Body
				</label>
				<textarea
					id="email-body"
					rows={4}
					placeholder="Obsah zpravy"
					{...register("body")}
					className="rounded-md border border-slate-300 p-3 text-sm"
				/>
				{errors.body && <p className="text-sm text-red-600">{errors.body.message}</p>}
			</div>
		</div>
	)
}
