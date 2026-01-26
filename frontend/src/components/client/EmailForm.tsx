"use client";

import { FC } from "react";
import { InputController } from "@/components/ui/form";
import { Button } from "@/components/ui/reusable/Button";
import { ImageQR } from "./ImageQR";
import { useGenerateQrCode } from "@/hooks/api/qr";
import z from "zod";
import { emailSchema } from "../../utils/schemas/emailSchema";
import { Control } from "react-hook-form";

type EmailFormValues = z.infer<typeof emailSchema>;

type Props = {
	isPending: boolean;
	response: ReturnType<typeof useGenerateQrCode>["data"];
	control: Control<EmailFormValues>;
};

export const EmailForm: FC<Props> = ({ isPending, response, control }) => {
	return (
		<div>
			<InputController control={control} name="to" label="To" />
			<InputController control={control} name="subject" label="Subject" />
			<InputController control={control} name="body" label="Body" />
			<Button type="submit" variant="secondary" disabled={isPending}>
				{isPending ? "Generating..." : "Generate QR Code"}
			</Button>

			<ImageQR qrCodeSvg={response?.svg ?? ""} qrCodeId={response?.id ?? ""} />
		</div>
	);
};
