import { type ReactNode } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./Form";
import type { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
	children: (field: ControllerRenderProps<T>) => ReactNode;
	control: Control<T>;
	name: Path<T>;
	description?: string;
	label: string;
};

export const FormFieldController = <T extends FieldValues>({
	children,
	control,
	name,
	description,
	label,
}: FormFieldProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={(field) => (
				<FormItem className="m-5 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
					<FormLabel>{label}</FormLabel>
					<FormControl>{children(field.field)}</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage>{field.fieldState.error?.message}</FormMessage>
				</FormItem>
			)}
		/>
	);
};
