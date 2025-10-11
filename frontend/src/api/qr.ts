import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OutputType } from "@/utils/types/OutputType";
import { api } from "@/hooks/api/axios";
import { API_ENDPOINTS } from "@/hooks/api/apiEndpoints";

export const generateQrCode = async (data: string, output?: OutputType) => {
	const response = await api.post(API_ENDPOINTS.generateQr, { data, output });

	return {
		code: response.data.id,
		svg: response.data.svg,
	};
};

export const useGenerateQrCode = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, output = "svg" }: { data: string; output?: OutputType }) => generateQrCode(data, output),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["qrCode"] });
		},
	});
};

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
	});
};
