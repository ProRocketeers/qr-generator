import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OutputType } from "@/utils/types/OutputType";
import { api } from "@/hooks/api/axios";
import { API_ENDPOINTS } from "@/api/apiEndpoints";

export const generateQrCode = async (data: string, output?: OutputType) => {
	const response = await api.post(API_ENDPOINTS.generateQr, { data, output });

	return {
		code: response.data.id,
		svg: response.data.svg,
	};
};

export const getQrCode = async (qrCodeId: string | null, output: string) => {
	const response = await api.get(API_ENDPOINTS.getQr(qrCodeId, output), {
		responseType: "text",
	});
	return response.data;
};
