import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import { API_ENDPOINTS } from "./apiEndpoints";

const getQrCode = async (qrCodeId: string | null, output: string) => {
	const response = await api.get(API_ENDPOINTS.getQr(qrCodeId, output), {
		responseType: "text",
	});
	return response.data;
};

export const useGetQrCode = (qrCodeId: string | null, output: string) => {
	return useQuery({
		queryKey: ["qrCode", qrCodeId],
		queryFn: () => getQrCode(qrCodeId, output),
		enabled: qrCodeId !== null && qrCodeId.trim().length > 0,
		retry: 1,
	});
};
