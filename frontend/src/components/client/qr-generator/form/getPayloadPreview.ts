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
		case "wifi":
			return {
				type: "wifi",
				data: {
					ssid: formValues.ssid,
					password: formValues.password,
					encryption: formValues.encryption,
					hidden: formValues.hidden,
				},
			}
		default:
			return { type: "link", data: { url: formValues.url } }
	}
}
