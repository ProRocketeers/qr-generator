import { getForm, type FormType } from "@/utils/helpers/getFormsMap";
import { SelectTypeForm } from "@/components/client/SelectTypeForm";

type Props = {
	type: FormType;
};

export const FormSelectWrapper = async ({ type }: Props) => {
	const FormComponent = getForm(type);

	return (
		<>
			<SelectTypeForm type={type} />
			<FormComponent />
		</>
	);
};
