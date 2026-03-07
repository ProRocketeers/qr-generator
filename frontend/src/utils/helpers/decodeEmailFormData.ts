import type { EmailFormType } from "../types"

export function decodeEmailFormData(data?: string | null): EmailFormType {
	if (!data || typeof data !== "string" || !data.startsWith("mailto:")) {
		return { to: "", subject: "", body: "" }
	}

	const mailtoPart = data.replace("mailto:", "")

	const [to, queryString] = mailtoPart.split("?")

	const decoded: EmailFormType = {
		to: decodeURIComponent(to ?? ""),
		subject: "",
		body: "",
	}

	if (!queryString) return decoded

	const params = new URLSearchParams(queryString)

	decoded.subject = decodeURIComponent(params.get("subject") ?? "")
	decoded.body = decodeURIComponent(params.get("body") ?? "")

	return decoded
}
