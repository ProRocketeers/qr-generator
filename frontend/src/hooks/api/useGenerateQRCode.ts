"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "./axios";
import { useRouter } from "next/navigation";

type OutputType = "svg" | "png" | "base64" | "dataUri" | "json";

type QrCodeResponse = {
	qrCodeId: string | null;
	qrCodeSvg: string | null;
	isPending: boolean;
	error: Error | null;
	generateQrCode: (data: string, output?: OutputType) => void;
};

export const useGenerateQrCode = (): QrCodeResponse => {
	const [qrCodeId, setQrCodeId] = useState<string | null>(null);
	const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const { mutate, isPending, error } = useMutation({
		mutationFn: async ({ data, output = "svg" }: { data: string; output?: OutputType }) => {
			const response = await api.post("/api/v1/qr", { data, output });
			return { data: response.data };
		},
		onSuccess: ({ data }) => {
			setQrCodeId(data.id);

			setQrCodeSvg(data.svg ?? null);
			queryClient.invalidateQueries({ queryKey: ["qrCode"] });
		},
		onError: () => {
			setQrCodeId(null);
			setQrCodeSvg(null);
		},
	});

	return {
		qrCodeId,
		qrCodeSvg,
		isPending,
		error,
		generateQrCode: (data, output) => mutate({ data, output }),
	};
};
