"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { schema } from "@/utils/schemas/urlSchema";
import { Button } from "@/components/ui/reusable/Button";

export const UrlForm: FC = () => {
	return (
		<FormContext schema={schema} defaultValues={{ url: "" }} onSubmit={(formValues) => console.log(formValues)}>
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
