import { getFormsMap } from "@/utils/helpers/getFormsMap";
import type { FormTypeSelect } from "@/utils/types/formTypeSelect";
import { SelectTypeForm } from "@/components/client/SelectTypeForm";

type Props = {
	type: FormTypeSelect;
};

export const FormSelectWrapper = async ({ type }: Props) => {
	const FormComponent = getFormsMap({ type });

	return (
		<div className="h-full w-full flex flex-col items-center justify-center">
			<SelectTypeForm />
			{FormComponent ? <FormComponent /> : <div />}
		</div>
	);
};
