import z from "zod"
import { urlFields, validateUrlFields, urlDefaultValues } from "./urlSchema"
import { textFields, validateTextFields, textDefaultValues } from "./textSchema"
import { emailFields, validateEmailFields, emailDefaultValues } from "./emailSchema"
import { wifiFields, validateWifiFields, wifiDefaultValues } from "./wifiSchema"

// Spojení všech polí do jednoho schématu
export const schema = z
	.object({
		qrType: z.enum(["url", "text", "email", "wifi"]),
		...urlFields,
		...textFields,
		...emailFields,
		...wifiFields,
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
		}
	})

export type FormValues = z.infer<typeof schema>

// Výchozí hodnoty pro každý typ
export const defaultValuesByType = {
	url: { qrType: "url" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues },
	text: { qrType: "text" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues },
	email: { qrType: "email" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues },
	wifi: { qrType: "wifi" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues, ...wifiDefaultValues },
}

// Výchozí hodnoty - defaultně URL
export const defaultValues: FormValues = defaultValuesByType.url
