"use client";

import { getForm, type FormType } from "@/utils/helpers/getFormsMap";
import { SelectTypeForm } from "@/components/client/SelectTypeForm";
import { QrForm } from "@/components/client/QrForm";
import { useGenerateQrCode } from "@/hooks/api/qr";
import { FC, useState } from "react";

type Props = {
	type: FormType;
};

export const FormSelectWrapper: FC<Props> = ({ type }) => {
	const { mutate, isPending, data: response } = useGenerateQrCode();

	const [qrCodeId, setQrCodeId] = useState<string | null>(null);

	const FormComponent = getForm(type);

	const handleQrCodeId = (qrCodeId: string | null) => {
		setQrCodeId(qrCodeId);
	};

	return (
		<>
			<SelectTypeForm initialType={type} />
			<div className="flex flex-row gap-4">
				<FormComponent action={mutate} isPending={isPending} response={response} qrCodeId={qrCodeId} />
				<QrForm handleQrCodeIdAction={handleQrCodeId} />
			</div>
		</>
	);
};
