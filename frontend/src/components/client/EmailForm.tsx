"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { defaultValues, schema } from "@/utils/schemas/emailSchema";
import { Button } from "@/components/ui/reusable/Button";
import { ImageQR } from "./ImageQR";
import { useGenerateQrCode, useGetQrCode } from "@/hooks/api/qr";
import { decodeQrData } from "@/utils/helpers/decodeQrData";
import type { EmailFormType } from "../../utils/types";

type Props = {
	action: ReturnType<typeof useGenerateQrCode>["mutate"];
	isPending: boolean;
	response: ReturnType<typeof useGenerateQrCode>["data"];
	qrCodeId: string | null;
};

export const EmailForm: FC<Props> = ({ action, isPending, response, qrCodeId }) => {
	const { data } = useGetQrCode(qrCodeId, "text");
	console.log("Begore Decoded QR data:", data);
	const decoded = decodeQrData(data?.data, "email");
	console.log("After Decoded QR data:.", decoded);

	return (
		<div>
			<FormContext
				schema={schema}
				defaultValues={decodeQrData(response, "email") || defaultValues}
				onSubmit={(formValues) =>
					action({
						data: `mailto:${String(formValues.to)}?subject=${encodeURIComponent(
							String(formValues.subject)
						)}&body=${encodeURIComponent(String(formValues.body))}`,
						output: "json",
					})
				}
			>
				{(control) => (
					<>
						<InputController control={control} name="to" label="To" />
						<InputController control={control} name="subject" label="Subject" />
						<InputController control={control} name="body" label="Body" />
						<Button type="submit" variant="secondary" disabled={isPending}>
							{isPending ? "Generating..." : "Generate QR Code"}
						</Button>
					</>
				)}
			</FormContext>

			<ImageQR qrCodeSvg={response?.svg ?? ""} qrCodeId={response?.id ?? ""} />
		</div>
	);
};
