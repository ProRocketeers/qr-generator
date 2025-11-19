"use client";

import { getForm, FormType } from "@/utils/helpers/getFormsMap";
import { SelectTypeForm } from "@/components/client/SelectTypeForm";
import { QrForm } from "@/components/client/QrForm";
import { useGenerateQrCode } from "@/hooks/api/qr";
import { FC, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/reusable/Button";

type Props = {
	type: FormType;
};

export const FormSelectWrapper: FC<Props> = ({ type }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [qrCodeId, setQrCodeId] = useState<string | null>(null);
	const { mutate, isPending, data: response } = useGenerateQrCode();
	const FormComponent = getForm(type);

	useEffect(() => {
		const id = searchParams.get("id");
		if (id) {
			setQrCodeId(id);
		}
	}, [searchParams]);

	const handleCleareParams = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("id");
		router.push(`?${params.toString()}`);
		setQrCodeId(null);
	};

	return (
		<>
			<Button onClick={handleCleareParams}>Select new QR type</Button>
			{!qrCodeId && <SelectTypeForm initialType={type} />}
			<div className="flex flex-row gap-4">
				<FormComponent action={mutate} isPending={isPending} response={response} />
				<QrForm />
			</div>
		</>
	);
};
