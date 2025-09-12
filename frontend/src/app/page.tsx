"use client";
import { FormContext, InputController, SelectController } from "@/components/ui/form";
import { Button } from "@/components/ui/reusable/Button";
import { useState } from "react";
import z from "zod";

const types = [
	{
		id: "1111111",
		label: "QRUrl",
	},
	{
		id: "2222222",
		label: "QRText",
	},
	{
		id: "3333333",
		label: "QRWifi",
	},
	{
		id: "4444444",
		label: "QRContact",
	},
] as const;

const defaultValues = {
	name: "",
	age: 0,
	type: types[0].label,
};

const schema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	age: z.number().min(1, {
		message: "Age must be greater than 0",
	}),
	types: z.enum(["QRUrl", "QRText", "QRWifi", "QRContact"]).default("QRUrl"),
});

type Values = {
	name: string;
	age: number;
	type: (typeof types)[number];
};

export default function Home() {
	const [values, setValues] = useState<Values>();

	return (
		<div className="bg-gray-500 h-full w-full flex flex-col items-center justify-center">
			<h1 className="text-3xl text-yellow-500">Test form</h1>
			<FormContext
				schema={schema}
				onSubmit={(formValues) => {
					const selectedType = types.find((type) => type.label === formValues.types) ?? types[0];
					setValues({
						name: formValues.name,
						age: formValues.age,
						type: selectedType,
					});
				}}
				defaultValues={defaultValues}
			>
				{(control) => (
					<>
						<InputController label="Name" control={control} name="name" type="text" />
						<InputController label="Age" control={control} name="age" type="number" />
						<SelectController
							label="QR Type"
							control={control}
							selectData={types.map((type) => ({
								value: type.id,
								label: type.label,
							}))}
							name="types"
						/>

						<Button type="submit" variant="secondary">
							LETS GO!
						</Button>
					</>
				)}
			</FormContext>
		</div>
	);
}
