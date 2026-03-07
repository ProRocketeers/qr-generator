import type { FormValues } from "@/utils/schemas/baseSchema"

export function getPayloadPreview(formValues: FormValues) {
	switch (formValues.qrType) {
		case "url":
			return { type: "link", data: { url: formValues.url } }
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
		case "event":
			return {
				type: "event",
				data: {
					title: formValues.eventTitle,
					description: formValues.eventDescription,
					location: formValues.eventLocation,
					start: formValues.eventStart,
					end: formValues.eventEnd,
					allDay: formValues.eventAllDay,
					url: formValues.eventUrl,
				},
			}
		case "geo":
			return {
				type: "geo",
				data: {
					latitude: formValues.latitude,
					longitude: formValues.longitude,
					altitude: formValues.altitude,
				},
			}
		case "contact":
			return {
				type: "contact",
				data: {
					firstName: formValues.contactFirstName,
					lastName: formValues.contactLastName,
					organization: formValues.contactOrganization,
					phone: formValues.contactPhone,
					email: formValues.contactEmail,
					url: formValues.contactUrl,
					note: formValues.contactNote,
				},
			}
		default:
			return { type: "link", data: { url: formValues.url } }
	}
}
