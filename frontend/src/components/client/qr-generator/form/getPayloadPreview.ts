import type { FormValues } from "@/utils/schemas/baseSchema"

export function getPayloadPreview(formValues: FormValues) {
	switch (formValues.qrType) {
		case "text":
			return { type: "text", data: formValues.text }
		case "email":
			return {
				type: "email",
				data: {
					to: formValues.to,
					subject: formValues.subject,
					body: formValues.body,
				},
			}
		default:
			return { type: "link", data: { url: formValues.url } }
	}
}
