"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { defaultValues, schema } from "@/utils/schemas/urlSchema";
import { Button } from "@/components/ui/reusable/Button";

export const UrlForm: FC = () => {
	return (
		<FormContext schema={schema} defaultValues={defaultValues} onSubmit={(formValues) => console.log(formValues)}>
			{(control) => (
				<>
					<InputController control={control} name="url" label="URL" />
					<Button type="submit" variant="secondary">
						LETS GO!
					</Button>
				</>
			)}
		</FormContext>
	);
};
