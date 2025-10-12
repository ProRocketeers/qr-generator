import { getForm, type FormType } from "@/utils/helpers/getFormsMap";
import { SelectTypeForm } from "@/components/client/SelectTypeForm";
import { QrForm } from "@/components/client/QrForm";

type Props = {
	type: FormType;
};

export const FormSelectWrapper = ({ type }: Props) => {
	const FormComponent = getForm(type);

	return (
		<>
			<SelectTypeForm initialType={type} />
			<div className="flex flex-row gap-4">
				<FormComponent />
				<QrForm />
			</div>
		</>
	);
};
