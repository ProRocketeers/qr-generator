import { FormSelectWrapper } from "../components/server/FormSelectWrapper";
import type { FormType } from "../utils/helpers/getFormsMap";

export default async function Home({ searchParams }: { searchParams: { type?: FormType } }) {
	const { type } = await searchParams;

	return (
		<div className=" h-full w-full flex flex-col items-center justify-center">
			<FormSelectWrapper type={type} />
		</div>
	);
}
