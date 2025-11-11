export type EmailFormType = {
	to: string;
	subject: string;
	body: string;
};

export const isEmailForm = (data: unknown): data is EmailFormType =>
	typeof data === "object" &&
	data !== null &&
	"to" in data &&
	typeof data.to === "string" &&
	"subject" in data &&
	typeof data.subject === "string" &&
	"body" in data &&
	typeof data.body === "string";
