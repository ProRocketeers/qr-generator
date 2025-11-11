import { isUrlForm, isEmailForm, Forms } from "@/utils/types";

export function decodeQrData<T extends keyof Forms>(data: unknown, type: T): Forms[T] | undefined {
	if (type === "email" && isEmailForm(data)) {
		return data as Forms[T];
	}

	if (type === "url" && isUrlForm(data)) {
		return data as Forms[T];
	}

	return undefined;
}
