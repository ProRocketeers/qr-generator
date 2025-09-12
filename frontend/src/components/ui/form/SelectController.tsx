import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/reusable/Select";
import { FormMessage } from "@/components/ui/form/Form";
import { type InputHTMLAttributes } from "react";
import { type FieldValues } from "react-hook-form";
import { FormFieldController, type FormFieldProps } from "./FormFieldController";

type SelectData = {
	value: string;
	label: string;
};

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLSelectElement> &
	Omit<FormFieldProps<T>, "children"> & {
		selectData?: SelectData[];
	};

export const SelectController = <T extends FieldValues>({ label, control, name, selectData = [] }: Props<T>) => {
	return (
		<FormFieldController control={control} name={name} label={label}>
			{(field) => (
				<div>
					<Select onValueChange={(value) => field.onChange(value)} value={field.value}>
						<SelectTrigger className="w-[180px] m-5">
							<SelectValue placeholder={label} />
						</SelectTrigger>
						<SelectContent>
							{selectData.map((item) => (
								<SelectItem key={item.value} value={item.label}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<FormMessage />
				</div>
			)}
		</FormFieldController>
	);
};
