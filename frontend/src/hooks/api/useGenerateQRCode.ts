import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./axios";
import { API_ENDPOINTS } from "./apiEndpoints";
import type { OutputType } from "@/utils/types/OutputType";

const generateQrCode = async (data: string, output?: OutputType) => {
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
