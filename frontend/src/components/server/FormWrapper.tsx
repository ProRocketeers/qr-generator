import { getFormsMap, type FormsType } from "@/utils/helpers/getFormsMap";

type Props = {
	type?: FormsType;
};

export const FormWrapper = async ({ type }: Props) => {
	const FormComponent = getFormsMap({ type });

	return (
		<>
			<div>{FormComponent ? <FormComponent /> : <div />}</div>
		</>
	);
};
