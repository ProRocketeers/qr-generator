import { UrlForm } from "@/components/client/UrlForm";
import { EmailForm } from "@/components/client/EmailForm";

export const FORMS_MAP = {
	url: UrlForm,
	email: EmailForm,
} as const;

export type FormType = keyof typeof FORMS_MAP;

export const getForm = (type?: FormType) => FORMS_MAP[type ?? "url"];
