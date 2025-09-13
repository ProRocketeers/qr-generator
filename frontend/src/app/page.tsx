import { SelectTypeForm } from "../components/client/SelectTypeForm";
import { FormWrapper } from "../components/server/FormWrapper";
import type { FormsType } from "@/utils/helpers/getFormsMap";

export default function Home({ searchParams }: { searchParams: { type?: FormsType } }) {
	const type = searchParams.type;
	console.log("type", type);

	return (
		<div className="bg-gray-500 h-full w-full flex flex-col items-center justify-center">
			<SelectTypeForm />
			<FormWrapper type={type} />
		</div>
	);
}
