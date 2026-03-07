export const API_ENDPOINTS = {
	generateQr: "/api/v1/qr",
	getQr: (id: string | null, output: string) => `/api/v1/qr/${id}?output=${output}`,
}
