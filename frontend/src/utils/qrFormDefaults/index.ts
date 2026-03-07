import type { FormValues } from "@/utils/schemas/baseSchema"
import { defaultValues } from "@/utils/schemas/baseSchema"
import { parseUrlType } from "./url"
import { parseTextType } from "./text"
import { parseEmailType } from "./email"
import { parseWifiType } from "./wifi"
import type { QrType, ParserContext } from "./types"

const typeValidation = (value: string | null): value is QrType =>
	value === 'url' || value === 'text' || value === 'email' || value === 'wifi'

const encryptionValidation = (value: string | null): boolean =>
	value === 'WEP' || value === 'WPA' || value === 'WPA2' || value === 'WPA3' || value === 'nopass'

/**
 * Parse URL parameters and return form default values
 * Reads from window.location.search and extracts type-specific field values
 */
export const parseFormDefaultsFromUrl = (): FormValues => {
	if (typeof window === 'undefined') return defaultValues

	const params = new URLSearchParams(window.location.search)
	const newValues: Partial<FormValues> = { ...defaultValues }

	const ctx: ParserContext = { params, newValues }

	// Parse type
	const typeFromUrl = params.get('type')
	if (typeValidation(typeFromUrl)) {
		ctx.newValues.qrType = typeFromUrl
	}

	// Parse type-specific fields
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
	}

	return ctx.newValues as FormValues
}
