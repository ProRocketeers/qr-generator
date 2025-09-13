"use client";

import { FC } from "react";
import { FormContext, InputController } from "@/components/ui/form";
import { schema } from "@/utils/schemas/emailSchema";
import { Button } from "@/components/ui/reusable/Button";

const defaultValues = {
	to: "",
	subject: "",
	body: "",
};

export const EmailForm: FC = () => {
	return (
		<FormContext schema={schema} defaultValues={defaultValues} onSubmit={(formValues) => console.log(formValues)}>
			{(control) => (
				<>
					<InputController control={control} name="to" label="To" />
					<InputController control={control} name="subject" label="Subject" />
					<InputController control={control} name="body" label="Body" />
					<Button type="submit" variant="secondary">
						LETS GO!
					</Button>
				</>
			)}
		</FormContext>
	);
};
