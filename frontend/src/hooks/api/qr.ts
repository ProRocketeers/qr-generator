import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OutputType } from "@/utils/types/OutputType";
import { generateQrCode, getQrCode } from "@/api/qr";

export const useGenerateQrCode = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, output = "svg" }: { data: string; output?: OutputType }) => generateQrCode(data, output),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["qrCode"] });
		},
	});
};

export const useGetQrCode = (qrCodeId: string | null, output: string) => {
	return useQuery({
		queryKey: ["qrCode", qrCodeId],
		queryFn: () => getQrCode(qrCodeId, output),
		enabled: qrCodeId !== null && qrCodeId.trim().length > 0,
	});
};
