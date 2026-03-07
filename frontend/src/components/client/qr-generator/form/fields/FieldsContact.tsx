"use client"

import { useFormContext } from "react-hook-form"
import type { FormValues } from "@/utils/schemas/baseSchema"
import { useTranslations } from 'next-intl'

export function FieldsContact() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>()
	const t = useTranslations('form')

	return (
		<div className="grid gap-3">
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="contact-first-name">
					{t('contactFirstNameLabel')}
				</label>
				<input
					id="contact-first-name"
					type="text"
					placeholder={t('contactFirstNamePlaceholder')}
					{...register("contactFirstName")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.contactFirstName && <p className="text-sm text-red-600">{errors.contactFirstName.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="contact-last-name">
					{t('contactLastNameLabel')}
				</label>
				<input
					id="contact-last-name"
					type="text"
					placeholder={t('contactLastNamePlaceholder')}
					{...register("contactLastName")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.contactLastName && <p className="text-sm text-red-600">{errors.contactLastName.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="contact-organization">
					{t('contactOrganizationLabel')}
				</label>
				<input
					id="contact-organization"
					type="text"
					placeholder={t('contactOrganizationPlaceholder')}
					{...register("contactOrganization")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.contactOrganization && <p className="text-sm text-red-600">{errors.contactOrganization.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="contact-phone">
					{t('contactPhoneLabel')}
				</label>
				<input
					id="contact-phone"
					type="tel"
					placeholder={t('contactPhonePlaceholder')}
					{...register("contactPhone")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.contactPhone && <p className="text-sm text-red-600">{errors.contactPhone.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="contact-email">
					{t('contactEmailLabel')}
				</label>
				<input
					id="contact-email"
					type="email"
					placeholder={t('contactEmailPlaceholder')}
					{...register("contactEmail")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.contactEmail && <p className="text-sm text-red-600">{errors.contactEmail.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="contact-url">
					{t('contactUrlLabel')}
				</label>
				<input
					id="contact-url"
					type="text"
					placeholder={t('contactUrlPlaceholder')}
					{...register("contactUrl")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.contactUrl && <p className="text-sm text-red-600">{errors.contactUrl.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="contact-note">
					{t('contactNoteLabel')}
				</label>
				<textarea
					id="contact-note"
					rows={3}
					placeholder={t('contactNotePlaceholder')}
					{...register("contactNote")}
					className="rounded-md border border-slate-300 p-3 text-sm"
				/>
				{errors.contactNote && <p className="text-sm text-red-600">{errors.contactNote.message}</p>}
			</div>
		</div>
	)
}
