import { FORM_TYPE } from "../consts/consts";
import { formMap } from "./getFormConfig";
import { z } from "zod";

type FormValues<T extends FORM_TYPE> = z.infer<(typeof formMap)[T]["schema"]>;

export const mapFormValuesToQrData = <T extends FORM_TYPE>(type: T, values: FormValues<T>): string => {
	switch (type) {
		case "email": {
			const { to, subject, body } = values as FormValues<"email">;
			return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		}

		case "url": {
			const { url } = values as FormValues<"url">;
			return url;
		}
	}
};
