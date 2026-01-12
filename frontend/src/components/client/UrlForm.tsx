"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { defaultValues, schema } from "@/utils/schemas/urlSchema";
import { Button } from "@/components/ui/reusable/Button";
import { ImageQR } from "./ImageQR";
import { useGenerateQrCode, useGetQrCode } from "@/hooks/api/qr";
import { decodeQrData } from "@/utils/helpers/decodeQrData";
import { useGetIdParam } from "@/hooks/useGetIdParam";

type Props = {
	action: ReturnType<typeof useGenerateQrCode>["mutate"];
	isPending: boolean;
	response: ReturnType<typeof useGenerateQrCode>["data"];
};

export const UrlForm: FC<Props> = ({ action, isPending, response }) => {
	const qrCodeId = useGetIdParam();
	const { data } = useGetQrCode(qrCodeId, "text");

	return (
		<div>
			<FormContext
				schema={schema}
				defaultValues={decodeQrData("url", data?.data) || defaultValues}
				onSubmit={(formValues) => {
					action({ data: formValues.url, output: "json" });
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
			<ImageQR qrCodeSvg={response?.svg ?? ""} qrCodeId={response?.id} />
		</div>
	);
};
