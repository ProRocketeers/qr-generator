import { type FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/reusable/Input";
import { type InputHTMLAttributes } from "react";
import { FormFieldController, type FormFieldProps } from "./FormFieldController";

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & Omit<FormFieldProps<T>, "children">;

export const InputController = <T extends FieldValues>({ label, control, name, ...props }: Props<T>) => {
	return (
		<FormFieldController<T> control={control} name={name} label={label}>
			{(field) => (
				<Input
					className="m-5"
					placeholder={label}
					{...field}
					{...props}
					onChange={(e) => {
						const value = props.type === "number" ? parseFloat(e.target.value) : e.target.value;
						field.onChange(value);
					}}
				/>
			)}
		</FormFieldController>
	);
};
