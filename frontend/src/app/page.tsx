import { SelectTypeForm } from "../components/client/SelectTypeForm";
import { FormWrapper } from "../components/server/FormWrapper";
import type { FormTypeSelect } from "@/utils/types/formTypeSelect";

export default async function Home({ searchParams }: { searchParams: { type?: FormTypeSelect } }) {
	const { type } = await searchParams;

	return (
		<div className=" h-full w-full flex flex-col items-center justify-center">
			<SelectTypeForm />
			<FormWrapper type={type} />
		</div>
	);
}
