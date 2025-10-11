"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { defaultValues, schema } from "@/utils/schemas/emailSchema";
import { Button } from "@/components/ui/reusable/Button";
import { useGenerateQrCode } from "@/api/qr";
import { ImageQR } from "./ImageQR";

export const EmailForm: FC = () => {
	const { mutate, isPending, data: response } = useGenerateQrCode();

	return (
		<div>
			<FormContext
				schema={schema}
				defaultValues={defaultValues}
				onSubmit={(formValues) =>
					mutate({
						data: `mailto:${formValues.to}?subject=${encodeURIComponent(formValues.subject)}&body=${encodeURIComponent(
							formValues.body
						)}`,
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
			<ImageQR qrCodeSvg={response?.svg} qrCodeId={response?.code} />
		</div>
	);
};
