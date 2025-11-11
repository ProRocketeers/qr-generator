import { OutputType } from "@/utils/types/OutputType";
import { api } from "@/api/axios";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { QrJsonResponse } from "./qrResponse";

export const generateQrCode = async (data: string, output?: OutputType): Promise<QrJsonResponse> => {
	const response = await api.post<QrJsonResponse>(API_ENDPOINTS.generateQr, {
		data,
		output,
	});

	return response.data;
};

export const getQrCode = async (qrCodeId: string | null, output: string) => {
	const response = await api.get<QrJsonResponse>(API_ENDPOINTS.getQr(qrCodeId, output));
	return typeof response.data === "string" ? JSON.parse(response.data) : response.data;
};
