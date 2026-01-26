"use client";

import { FC } from "react";
import { InputController } from "@/components/ui/form";
import { Button } from "@/components/ui/reusable/Button";
import { ImageQR } from "./ImageQR";
import { useGenerateQrCode } from "../../hooks/api/qr";
import z from "zod";
import { urlSchema } from "../../utils/schemas/urlSchema";
import { Control } from "react-hook-form";

type UrlFormValues = z.infer<typeof urlSchema>;

type Props = {
	control: Control<UrlFormValues>;
	isPending: boolean;
	response: ReturnType<typeof useGenerateQrCode>["data"];
};

export const UrlForm: FC<Props> = ({ control, isPending, response }) => {
	return (
		<div>
			<div>
				<InputController control={control} name="url" label="URL" />
				<Button className="hover:bg-sky-200" type="submit" variant="secondary" disabled={isPending}>
					{isPending ? "Generating..." : "Generate QR Code"}
				</Button>
			</div>

			<ImageQR qrCodeSvg={response?.svg ?? ""} qrCodeId={response?.id} />
		</div>
	);
};
