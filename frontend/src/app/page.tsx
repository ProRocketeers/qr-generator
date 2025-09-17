import { FormSelectWrapper } from "../components/server/FormSelectWrapper";
import type { FormTypeSelect } from "@/utils/types/formTypeSelect";

export default async function Home({ searchParams }: { searchParams: { type: FormTypeSelect } }) {
	const { type } = await searchParams;

	return (
		<div className=" h-full w-full flex flex-col items-center justify-center">
			<FormSelectWrapper type={type} />
		</div>
	);
}
