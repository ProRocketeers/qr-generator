"use client";

import { FC, useState } from "react";
import { useGetQrCode } from "@/hooks/api/qr";
import { FormContext, InputController } from "../ui/form";
import { defaultValues, schema } from "@/utils/schemas/qrSchema";
import { Button } from "@/components/ui/reusable/Button";
import { ImageQR } from "@/components/client/ImageQR";

export const Qr: FC = () => {
	const [qrCodeId, setQrCodeId] = useState<string | null>(null);
	const { data, isLoading } = useGetQrCode(qrCodeId, "svg");

	return (
		<div>
			<FormContext
				schema={schema}
				defaultValues={defaultValues}
				onSubmit={(formValues) => {
					setQrCodeId(formValues.qrCode);
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
					<ImageQR qrCodeSvg={data} title="QR Code from DB" />
				</div>
			)}
		</div>
	);
};
