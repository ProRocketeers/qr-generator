"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";

export const useGetQrCode = (qrCodeId: string | null, output: string) => {
	return useQuery<string>({
		queryKey: ["qrCode", qrCodeId, output],
		queryFn: async () => {
			const response = await api.get(`/api/v1/qr/${qrCodeId}?output=${output}`, {
				responseType: "text",
			});
			return response.data;
		},
		enabled: qrCodeId !== null && qrCodeId.trim().length > 0,
		retry: 1,
	});
};
