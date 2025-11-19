export function decodeUrlFormData(data?: string | null): { url: string } {
	if (!data || typeof data !== "string") {
		return { url: "" };
	}

	return { url: data };
}
