import { SelectTypeForm } from "../components/client/SelectTypeForm";
import { FormWrapper } from "../components/server/FormWrapper";
import type { FormsType } from "@/utils/helpers/getFormsMap";

export default async function Home({ searchParams }: { searchParams: { type?: FormsType } }) {
	const { type } = await searchParams;

	return (
		<div className="bg-gray-500 h-full w-full flex flex-col items-center justify-center">
			<SelectTypeForm />
			<FormWrapper type={type} />
		</div>
	);
}
