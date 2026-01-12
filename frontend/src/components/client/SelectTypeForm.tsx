"use client";
import { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/reusable/Select";
import { FORMS_MAP, FormType } from "@/utils/helpers/getFormsMap";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
	initialType?: FormType;
};

export const SelectTypeForm: FC<Props> = ({ initialType = "url" }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const selectData = Object.keys(FORMS_MAP).map((key) => ({
		value: key,
		label: key,
	}));

	const handleFormType = (selectedType: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("type", selectedType);
		router.push(`?${params.toString()}`);
	};

	return (
		<Select onValueChange={handleFormType} defaultValue={initialType}>
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
