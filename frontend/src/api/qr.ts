import { API_ENDPOINTS } from "../hooks/api/apiEndpoints";
import { api } from "../hooks/api/axios";
import type { OutputType } from "../utils/types/OutputType";

export const generateQrCode = async (data: string, output?: OutputType) => {
	const response = await api.post(API_ENDPOINTS.generateQr, { data, output });

	return {
		code: response.data.id,
		svg: response.data.svg,
	};
};
