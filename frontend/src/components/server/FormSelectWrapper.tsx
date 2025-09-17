import { getForm, type FormType } from "@/utils/helpers/getFormsMap";

type Props = {
	type: FormType;
};

export const FormSelectWrapper = async ({ type }: Props) => {
	const FormComponent = getForm(type);

	if (FormComponent) {
		return <FormComponent />;
	}
};
