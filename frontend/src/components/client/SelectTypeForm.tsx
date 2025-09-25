"use client";
import { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/reusable/Select";
import { FORMS_MAP, type FormType } from "@/utils/helpers/getFormsMap";
import { useRouter } from "next/navigation";

type Props = {
	initialType?: FormType;
	type: FormType;
};

export const SelectTypeForm: FC<Props> = ({ initialType = "url", type }) => {
	const router = useRouter();

	const selectData = Object.keys(FORMS_MAP).map((key) => ({
		value: key,
		label: key,
	}));

	const handleFormType = (selectedType: string) => {
		const newParams = new URLSearchParams();
		newParams.set("type", selectedType);
		router.push(`?${newParams.toString()}`);
	};

	return (
		<Select onValueChange={handleFormType} defaultValue={type || initialType}>
			<SelectTrigger className="w-[180px] m-5">
				<SelectValue placeholder="Select QR type" />
			</SelectTrigger>
			<SelectContent>
				{selectData.map((item) => (
					<SelectItem key={item.value} value={item.value}>
						{item.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
