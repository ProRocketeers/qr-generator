"use client";
import { FormContext, InputController, SelectController } from "@/components/ui/form";
import { Button } from "@/components/ui/reusable/Button";
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

export default function Home() {
	return (
		<div className="bg-gray-500 h-full w-full flex flex-col items-center justify-center">
			<h1 className="text-3xl text-yellow-500">Test form</h1>
			<FormContext
				schema={schema}
				onSubmit={(values) => {
					console.log("submit", values);
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

						<Button type="submit">LETS GO!</Button>
					</>
				)}
			</FormContext>
		</div>
	);
}
