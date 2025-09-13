"use client";
import { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/reusable/Select";
import { FORMS_MAP } from "@/utils/helpers/getFormsMap";
import { useRouter, useSearchParams } from "next/navigation";

export const SelectTypeForm: FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const selectData = Object.keys(FORMS_MAP).map((key) => ({
		value: key,
		label: key,
	}));

	const handleFormType = (type: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set("type", type);

		router.push(`?${newParams.toString()}`);
	};

	return (
		<Select onValueChange={handleFormType}>
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
