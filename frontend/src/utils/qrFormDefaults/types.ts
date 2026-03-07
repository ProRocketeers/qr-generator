import type { FormValues } from "@/utils/schemas/baseSchema"

export type QrType = 'url' | 'text' | 'email' | 'wifi' | 'event' | 'geo' | 'contact'

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
	eventTitle?: string
	eventDescription?: string
	eventLocation?: string
	eventStart?: string
	eventEnd?: string
	eventAllDay?: string
	eventUrl?: string
	latitude?: string
	longitude?: string
	altitude?: string
	contactFirstName?: string
	contactLastName?: string
	contactOrganization?: string
	contactPhone?: string
	contactEmail?: string
	contactUrl?: string
	contactNote?: string
}

export interface ParserContext {
	params: URLSearchParams
	newValues: Partial<FormValues>
}
