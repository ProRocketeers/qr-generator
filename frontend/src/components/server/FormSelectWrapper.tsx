"use client";

import { FC } from "react";
import { getForm, type FormType } from "@/utils/helpers/getFormsMap";
import { SelectTypeForm } from "@/components/client/SelectTypeForm";
import { Qr } from "@/components/client/Qr";

type Props = {
	type: FormType;
};

export const FormSelectWrapper: FC<Props> = ({ type }) => {
	const FormComponent = getForm(type);

	return (
		<>
			<SelectTypeForm initialType={type} />
			<div className="flex flex-row gap-4">
				<FormComponent />
				<Qr />
			</div>
		</>
	);
};
