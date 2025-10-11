"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { defaultValues, schema } from "@/utils/schemas/urlSchema";
import { Button } from "@/components/ui/reusable/Button";
import { useGenerateQrCode } from "@/api/qr";
import { ImageQR } from "./ImageQR";

export const UrlForm: FC = ({}) => {
	const { mutate, isPending, data: response } = useGenerateQrCode();

	return (
		<div>
			<FormContext
				schema={schema}
				defaultValues={defaultValues}
				onSubmit={(formValues) => {
					mutate({ data: formValues.url, output: "json" });
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
			<ImageQR qrCodeSvg={response?.svg} qrCodeId={response?.code} />
		</div>
	);
};
