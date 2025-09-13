"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { schema } from "@/utils/schemas/urlSchema";

export const UrlForm: FC = () => {
	return (
		<FormContext schema={schema} onSubmit={(formValues) => console.log(formValues)}>
			{(control) => <InputController control={control} name="url" label="URL" />}
		</FormContext>
	);
};
