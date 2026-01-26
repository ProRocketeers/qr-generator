"use client";

import { FC, useEffect, useState } from "react";
import { useGetQrCode } from "@/hooks/api/qr";
import { FormContext, InputController } from "@/components/ui/form";
import { qrDefaultValues, qrSchema } from "@/utils/schemas/qrSchema";
import { Button } from "@/components/ui/reusable/Button";
import { ImageQR } from "@/components/client/ImageQR";
import { useSearchParams, useRouter } from "next/navigation";

export const QrForm: FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [qrCodeId, setQrCodeId] = useState<string | null>(null);

	const { data, isLoading } = useGetQrCode(qrCodeId, "json");

	useEffect(() => {
		if (!qrCodeId) return;
		const params = new URLSearchParams(searchParams.toString());
		params.set("id", qrCodeId);

		router.push(`?${params.toString()}`);
	}, [qrCodeId]);

	return (
		<div>
			<FormContext
				schema={qrSchema}
				defaultValues={data?.data ?? qrDefaultValues}
				onSubmit={(values) => {
					setQrCodeId(values.qrCode);
				}}
			>
				{(control) => (
					<div className="">
						<InputController control={control} name="qrCode" label="QR Code ID" />
						<Button className="hover:bg-sky-200" type="submit" variant="secondary">
							Get QR Code
						</Button>
					</div>
				)}
			</FormContext>

			{isLoading && <p className="mt-4">Loading QR code...</p>}

			{data && (
				<div className="mt-4">
					<ImageQR qrCodeSvg={data.svg} title="QR Code from DB" />
				</div>
			)}
		</div>
	);
};
