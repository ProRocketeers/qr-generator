"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { defaultValues, schema } from "@/utils/schemas/urlSchema";
import { Button } from "@/components/ui/reusable/Button";
import { useGenerateQrCode } from "@/hooks/api/useGenerateQRCode";
import { ImageQR } from "./ImageQR";

export const UrlForm: FC = ({}) => {
	const { qrCodeSvg, qrCodeId, isPending, generateQrCode } = useGenerateQrCode();

	return (
		<div>
			<FormContext
				schema={schema}
				defaultValues={defaultValues}
				onSubmit={(formValues) => {
					generateQrCode(formValues.url, "json");
				}}
			>
				{(control) => (
					<div>
						<InputController control={control} name="url" label="URL" />
						<Button className="hover:bg-sky-200" type="submit" variant="secondary" disabled={isPending}>
							{isPending ? "Generating..." : "Generate QR Code"}
						</Button>
					</div>
				)}
			</FormContext>
			<ImageQR qrCodeSvg={qrCodeSvg} qrCodeId={qrCodeId} />
		</div>
	);
};
