"use client"

import { generateQrSvg, type QrPayload } from "@/api/qr"
import { useMutation } from "@tanstack/react-query"

export const useGenerateQrSvg = () => {
	return useMutation({
		mutationFn: (payload: QrPayload) => generateQrSvg(payload),
	})
}