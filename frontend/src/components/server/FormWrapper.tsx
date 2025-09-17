import { getFormsMap } from "@/utils/helpers/getFormsMap";
import type { FormTypeSelect } from "@/utils/types/formTypeSelect";

type Props = {
	type?: FormTypeSelect;
};

export const FormWrapper = async ({ type }: Props) => {
	const FormComponent = getFormsMap({ type });

	return <div>{FormComponent ? <FormComponent /> : <div />}</div>;
};
