import z from "zod"
import { urlFields, validateUrlFields, urlDefaultValues } from "./urlSchema"
import { textFields, validateTextFields, textDefaultValues } from "./textSchema"
import { emailFields, validateEmailFields, emailDefaultValues } from "./emailSchema"
import { wifiFields, validateWifiFields, wifiDefaultValues } from "./wifiSchema"
import { eventFields, validateEventFields, eventDefaultValues } from "./eventSchema"
import { geoFields, validateGeoFields, geoDefaultValues } from "./geoSchema"
import { contactFields, validateContactFields, contactDefaultValues } from "./contactSchema"

// Spojení všech polí do jednoho schématu
export const schema = z
	.object({
		qrType: z.enum(["url", "text", "email", "wifi", "event", "geo", "contact"]),
		...urlFields,
		...textFields,
		...emailFields,
		...wifiFields,
		...eventFields,
		...geoFields,
		...contactFields,
	})
	.superRefine((data, ctx) => {
		// Validace podle typu QR kódu
		if (data.qrType === "url") {
			validateUrlFields(data, ctx)
		} else if (data.qrType === "text") {
			validateTextFields(data, ctx)
		} else if (data.qrType === "email") {
			validateEmailFields(data, ctx)
		} else if (data.qrType === "wifi") {
			validateWifiFields(data, ctx)
		} else if (data.qrType === "event") {
			validateEventFields(data, ctx)
		} else if (data.qrType === "geo") {
			validateGeoFields(data, ctx)
		} else if (data.qrType === "contact") {
			validateContactFields(data, ctx)
		}
	})

export type FormValues = z.infer<typeof schema>

// Výchozí hodnoty pro každý typ
export const defaultValuesByType = {
	url: { qrType: "url" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues, ...eventDefaultValues, ...geoDefaultValues, ...contactDefaultValues },
	text: { qrType: "text" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues, ...eventDefaultValues, ...geoDefaultValues, ...contactDefaultValues },
	email: { qrType: "email" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues, ...eventDefaultValues, ...geoDefaultValues, ...contactDefaultValues },
	wifi: { qrType: "wifi" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues, ...eventDefaultValues, ...geoDefaultValues, ...contactDefaultValues },
	event: { qrType: "event" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues, ...eventDefaultValues, ...geoDefaultValues, ...contactDefaultValues },
	geo: { qrType: "geo" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues, ...eventDefaultValues, ...geoDefaultValues, ...contactDefaultValues },
	contact: { qrType: "contact" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues, ...eventDefaultValues, ...geoDefaultValues, ...contactDefaultValues },
}

// Výchozí hodnoty - defaultně URL
export const defaultValues: FormValues = defaultValuesByType.url
