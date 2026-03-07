import z from "zod"
import { urlFields, validateUrlFields, urlDefaultValues } from "./urlSchema"
import { textFields, validateTextFields, textDefaultValues } from "./textSchema"
import { emailFields, validateEmailFields, emailDefaultValues } from "./emailSchema"

// Spojení všech polí do jednoho schématu
export const schema = z
	.object({
		qrType: z.enum(["url", "text", "email"]),
		...urlFields,
		...textFields,
		...emailFields,
	})
	.superRefine((data, ctx) => {
		// Validace podle typu QR kódu
		if (data.qrType === "url") {
			validateUrlFields(data, ctx)
		} else if (data.qrType === "text") {
			validateTextFields(data, ctx)
		} else if (data.qrType === "email") {
			validateEmailFields(data, ctx)
		}
	})

export type FormValues = z.infer<typeof schema>

// Výchozí hodnoty pro každý typ
export const defaultValuesByType = {
	url: { qrType: "url" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues },
	text: { qrType: "text" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues },
	email: { qrType: "email" as const, ...urlDefaultValues, ...textDefaultValues, ...emailDefaultValues },
}

// Výchozí hodnoty - defaultně URL
export const defaultValues: FormValues = defaultValuesByType.url
