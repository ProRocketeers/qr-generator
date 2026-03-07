"use client"

import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import type { FormValues } from "@/utils/schemas/baseSchema"
import { useTranslations } from 'next-intl'
import { syncQrFieldsInUrl } from "@/components/client/qr-generator/urlSync"

export function FieldsEvent() {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<FormValues>()
	const t = useTranslations('form')
	const eventTitle = watch("eventTitle")
	const eventDescription = watch("eventDescription")
	const eventLocation = watch("eventLocation")
	const eventStart = watch("eventStart")
	const eventEnd = watch("eventEnd")
	const eventAllDay = watch("eventAllDay")
	const eventUrl = watch("eventUrl")

	useEffect(() => {
		syncQrFieldsInUrl("event", {
			eventTitle,
			eventDescription,
			eventLocation,
			eventStart,
			eventEnd,
			eventAllDay,
			eventUrl,
		})
	}, [eventTitle, eventDescription, eventLocation, eventStart, eventEnd, eventAllDay, eventUrl])

	return (
		<div className="grid gap-3">
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="event-title">
					{t('eventTitleLabel')}
				</label>
				<input
					id="event-title"
					type="text"
					placeholder={t('eventTitlePlaceholder')}
					{...register("eventTitle")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.eventTitle && <p className="text-sm text-red-600">{errors.eventTitle.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="event-description">
					{t('eventDescriptionLabel')}
				</label>
				<textarea
					id="event-description"
					rows={3}
					placeholder={t('eventDescriptionPlaceholder')}
					{...register("eventDescription")}
					className="rounded-md border border-slate-300 p-3 text-sm"
				/>
				{errors.eventDescription && <p className="text-sm text-red-600">{errors.eventDescription.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="event-location">
					{t('eventLocationLabel')}
				</label>
				<input
					id="event-location"
					type="text"
					placeholder={t('eventLocationPlaceholder')}
					{...register("eventLocation")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.eventLocation && <p className="text-sm text-red-600">{errors.eventLocation.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="event-start">
					{t('eventStartLabel')}
				</label>
				<input
					id="event-start"
					type="datetime-local"
					{...register("eventStart")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.eventStart && <p className="text-sm text-red-600">{errors.eventStart.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="event-end">
					{t('eventEndLabel')}
				</label>
				<input
					id="event-end"
					type="datetime-local"
					{...register("eventEnd")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.eventEnd && <p className="text-sm text-red-600">{errors.eventEnd.message}</p>}
			</div>

			<div className="flex items-center gap-2">
				<input
					id="event-all-day"
					type="checkbox"
					{...register("eventAllDay")}
					className="h-4 w-4 rounded border-slate-300"
				/>
				<label className="text-sm font-medium text-slate-700" htmlFor="event-all-day">
					{t('eventAllDayLabel')}
				</label>
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="event-url">
					{t('eventUrlLabel')}
				</label>
				<input
					id="event-url"
					type="text"
					placeholder={t('eventUrlPlaceholder')}
					{...register("eventUrl")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.eventUrl && <p className="text-sm text-red-600">{errors.eventUrl.message}</p>}
			</div>
		</div>
	)
}
