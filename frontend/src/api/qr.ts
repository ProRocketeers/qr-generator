import { apiClient } from "@/api/client"

export type QrPayload = {
	type: string
	data: unknown
}

export const generateQrSvg = async (payload: QrPayload) => {
	const response = await apiClient.post<string>("/api/v1/qr/svg", payload, {
		responseType: "text",
	})

	return response.data
}