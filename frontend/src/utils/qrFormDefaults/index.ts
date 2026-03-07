import type { FormValues } from "@/utils/schemas/baseSchema"
import { defaultValues } from "@/utils/schemas/baseSchema"
import { parseUrlType } from "./url"
import { parseTextType } from "./text"
import { parseEmailType } from "./email"
import { parseWifiType } from "./wifi"
import { parseEventType } from "./event"
import { parseGeoType } from "./geo"
import { parseContactType } from "./contact"
import type { QrType, ParserContext } from "./types"

const typeValidation = (value: string | null): value is QrType =>
	value === 'url' || value === 'text' || value === 'email' || value === 'wifi' || value === 'event' || value === 'geo' || value === 'contact'

const encryptionValidation = (value: string | null): boolean =>
	value === 'WEP' || value === 'WPA' || value === 'WPA2' || value === 'WPA3' || value === 'nopass'

const normalizeSearchParams = (searchParams?: Record<string, string | string[] | undefined>): URLSearchParams => {
	const params = new URLSearchParams()

	if (!searchParams) {
		return params
	}

	for (const [key, value] of Object.entries(searchParams)) {
		if (typeof value === 'string') {
			params.set(key, value)
		} else if (Array.isArray(value) && value.length > 0) {
			params.set(key, value[0])
		}
	}

	return params
}

export const parseFormDefaultsFromSearchParams = (
	searchParams?: Record<string, string | string[] | undefined>
): FormValues => {
	const params = normalizeSearchParams(searchParams)
	const newValues: Partial<FormValues> = { ...defaultValues }

	const ctx: ParserContext = { params, newValues }

	const typeFromUrl = params.get('type')
	if (typeValidation(typeFromUrl)) {
		ctx.newValues.qrType = typeFromUrl
	}

	switch (ctx.newValues.qrType) {
		case 'url':
			parseUrlType(ctx)
			break
		case 'text':
			parseTextType(ctx)
			break
		case 'email':
			parseEmailType(ctx)
			break
		case 'wifi':
			parseWifiType(ctx)
			break
		case 'event':
			parseEventType(ctx)
			break
		case 'geo':
			parseGeoType(ctx)
			break
		case 'contact':
			parseContactType(ctx)
			break
	}

	return ctx.newValues as FormValues
}

/**
 * Parse URL parameters and return form default values
 * Reads from window.location.search and extracts type-specific field values
 */
export const parseFormDefaultsFromUrl = (): FormValues => {
	if (typeof window === 'undefined') return defaultValues

	const entries = Object.fromEntries(new URLSearchParams(window.location.search).entries())
	return parseFormDefaultsFromSearchParams(entries)
}
