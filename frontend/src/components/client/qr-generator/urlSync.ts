import type { FormValues } from "@/utils/schemas/baseSchema"

const FORM_FIELD_QUERY_KEYS = [
	"url",
	"text",
	"to",
	"subject",
	"body",
	"ssid",
	"password",
	"encryption",
	"hidden",
	"eventTitle",
	"eventDescription",
	"eventLocation",
	"eventStart",
	"eventEnd",
	"eventAllDay",
	"eventUrl",
	"latitude",
	"longitude",
	"altitude",
	"contactFirstName",
	"contactLastName",
	"contactOrganization",
	"contactPhone",
	"contactEmail",
	"contactUrl",
	"contactNote",
] as const

const setIfPresent = (params: URLSearchParams, key: string, value: unknown) => {
	if (value === undefined || value === null) {
		return
	}

	if (typeof value === "string") {
		if (value.trim() !== "") {
			params.set(key, value)
		}
		return
	}

	if (typeof value === "number") {
		if (Number.isFinite(value)) {
			params.set(key, String(value))
		}
		return
	}

	if (typeof value === "boolean") {
		params.set(key, value ? "true" : "false")
	}
}

const replaceQueryIfChanged = (params: URLSearchParams) => {
	const nextQuery = params.toString()
	const currentQuery = window.location.search.startsWith("?")
		? window.location.search.slice(1)
		: window.location.search

	if (nextQuery === currentQuery) {
		return
	}

	const href = nextQuery ? `${window.location.pathname}?${nextQuery}` : window.location.pathname
	window.history.replaceState(null, "", href)
}

export const syncQrTypeInUrl = (qrType: FormValues["qrType"]) => {
	const params = new URLSearchParams(window.location.search)

	for (const key of FORM_FIELD_QUERY_KEYS) {
		params.delete(key)
	}

	params.set("type", qrType)
	replaceQueryIfChanged(params)
}

export const syncQrFieldsInUrl = (
	qrType: FormValues["qrType"],
	fieldValues: Record<string, unknown>
) => {
	const params = new URLSearchParams(window.location.search)

	for (const key of FORM_FIELD_QUERY_KEYS) {
		params.delete(key)
	}

	params.set("type", qrType)

	for (const [key, value] of Object.entries(fieldValues)) {
		setIfPresent(params, key, value)
	}

	replaceQueryIfChanged(params)
}
