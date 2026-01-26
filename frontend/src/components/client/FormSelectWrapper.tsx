"use client";

import { FormType, formMap } from "@/utils/helpers/getFormsMap";
import { SelectTypeForm } from "@/components/client/SelectTypeForm";
import { QrForm } from "@/components/client/QrForm";
import { useGenerateQrCode } from "@/hooks/api/qr";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/reusable/Button";
import { FormContext } from "../ui/form";
import { getFormConfig } from "../../utils/helpers/getFormConfig";
import { mapFormValuesToQrData } from "../../utils/helpers/mapFormValuesToQrData";

import { z } from "zod";

type FormValues<T extends FormType> = z.infer<(typeof formMap)[T]["schema"]>;

type Props<T extends FormType> = {
	type: T;
};

export const FormSelectWrapper = <T extends FormType>({ type }: Props<T>) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [qrCodeId, setQrCodeId] = useState<string | null>(null);

	const { mutate, isPending, data: response } = useGenerateQrCode();
	const formSchema = formMap[type].schema;
	const FormComponent = formMap[type].component;

	// const { schema: haf, defaultValues } = getFormConfig(type ?? "url");
	// console.log("haf", defaultValues);
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
				<FormContext<typeof formSchema>
					schema={formSchema}
					onSubmit={(formValues) => {
						const data = mapFormValuesToQrData(type, formValues as FormValues<typeof type>);
						mutate({ data, output: "json" });
					}}
				>
					{(control) => <FormComponent control={control} isPending={isPending} response={response} />}
				</FormContext>

				<QrForm />
			</div>
		</>
	);
};
