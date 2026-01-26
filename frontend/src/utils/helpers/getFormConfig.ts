import { FORM_TYPE } from "../consts/consts";
import { emailSchema, emailDefaultValues } from "../schemas/emailSchema";
import { urlSchema, urlDefaultValues } from "../schemas/urlSchema";

export const formMap = {
	email: {
		schema: emailSchema,
		defaultValues: emailDefaultValues,
	},
	url: {
		schema: urlSchema,
		defaultValues: urlDefaultValues,
	},
} as const;

export const getFormConfig = <TType extends FORM_TYPE>(type: TType) => {
	return formMap[type];
};
