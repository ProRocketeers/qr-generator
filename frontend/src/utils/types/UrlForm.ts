export type UrlFormType = {
	url: string;
};

export const isUrlForm = (data: unknown): data is UrlFormType => typeof data === "string";
