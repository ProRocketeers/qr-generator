import { UrlForm } from "@/components/client/UrlForm";
import { EmailForm } from "@/components/client/EmailForm";
import { urlDefaultValues, urlSchema } from "../schemas/urlSchema";
import { emailDefaultValues, emailSchema } from "../schemas/emailSchema";

export const formMap = {
	url: {
		component: UrlForm,
		schema: urlSchema,
	},
	email: {
		component: EmailForm,
		schema: emailSchema,
	},
} as const;

export type FormType = keyof typeof formMap;
