import z from "zod"
import { urlFields, createValidateUrlFields, urlDefaultValues } from "./urlSchema"
import { textFields, createValidateTextFields, textDefaultValues } from "./textSchema"
import { emailFields, createValidateEmailFields, emailDefaultValues } from "./emailSchema"
import { wifiFields, createValidateWifiFields, wifiDefaultValues } from "./wifiSchema"
import { eventFields, createValidateEventFields, eventDefaultValues } from "./eventSchema"
import { geoFields, createValidateGeoFields, geoDefaultValues } from "./geoSchema"
import { contactFields, createValidateContactFields, contactDefaultValues } from "./contactSchema"

// Factory function for creating schema with translations
export const createSchema = (t: (key: string) => string) => {
	const validateUrlFields = createValidateUrlFields(t)
	const validateTextFields = createValidateTextFields(t)
	const validateEmailFields = createValidateEmailFields(t)
	const validateWifiFields = createValidateWifiFields(t)
	const validateEventFields = createValidateEventFields(t)
	const validateGeoFields = createValidateGeoFields(t)
	const validateContactFields = createValidateContactFields(t)

	return z
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
}

// Default schema with fallback messages (for typing purposes)
export const schema = createSchema((key) => key)

export type FormValues = z.infer<typeof schema>

// Společné výchozí hodnoty pro všechna pole
const allDefaultValues = {
	...urlDefaultValues,
	...textDefaultValues,
	...emailDefaultValues,
	...wifiDefaultValues,
	...eventDefaultValues,
	...geoDefaultValues,
	...contactDefaultValues,
}

type QrType = "url" | "text" | "email" | "wifi" | "event" | "geo" | "contact"

// Výchozí hodnoty pro každý typ
export const defaultValuesByType: Record<QrType, FormValues> = {
	url: { qrType: "url", ...allDefaultValues },
	text: { qrType: "text", ...allDefaultValues },
	email: { qrType: "email", ...allDefaultValues },
	wifi: { qrType: "wifi", ...allDefaultValues },
	event: { qrType: "event", ...allDefaultValues },
	geo: { qrType: "geo", ...allDefaultValues },
	contact: { qrType: "contact", ...allDefaultValues },
}

// Výchozí hodnoty - defaultně URL
export const defaultValues: FormValues = defaultValuesByType.url
