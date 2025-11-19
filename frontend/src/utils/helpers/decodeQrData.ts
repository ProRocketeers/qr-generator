import { FORM_TYPE } from "../consts/consts";
import { Forms } from "../types";
import { decodeEmailFormData } from "./decodeEmailFormData";
import { decodeUrlFormData } from "./decodeUrlFormData";

export function decodeQrData<T extends FORM_TYPE>(type: T, data: string): Forms[T] {
	switch (type) {
		case "email":
			return decodeEmailFormData(data) as Forms[T];

		case "url":
			return decodeUrlFormData(data) as Forms[T];
	}
}
