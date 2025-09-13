import { UrlForm } from "@/components/client/UrlForm";

export const FORMS_MAP = {
	url: UrlForm,
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
