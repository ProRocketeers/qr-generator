import type { FormValues } from "@/utils/schemas/baseSchema"

export type QrType = 'url' | 'text' | 'email' | 'wifi'

export interface UrlParams {
	type?: string
	url?: string
	text?: string
	to?: string
	subject?: string
	body?: string
	ssid?: string
	password?: string
	encryption?: string
	hidden?: string
}

export interface ParserContext {
	params: URLSearchParams
	newValues: Partial<FormValues>
}
