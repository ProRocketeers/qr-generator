import { UrlForm } from "@/components/client/UrlForm";
import { EmailForm } from "../../components/client/EmailForm";

export const FORMS_MAP = {
	url: UrlForm,
	email: EmailForm,
} as const;

export type FormsType = keyof typeof FORMS_MAP;

type Props<T extends keyof typeof FORMS_MAP> = {
	type?: T;
};

export const getFormsMap = <T extends keyof typeof FORMS_MAP>({ type }: Props<T>) => {
	if (!type) {
		return null;
	}
	return FORMS_MAP[type];
};
