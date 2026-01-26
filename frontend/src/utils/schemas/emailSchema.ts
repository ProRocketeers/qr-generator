import z from "zod";

export const emailSchema = z.object({
	to: z.string().min(1, { message: "To is required" }),
	subject: z.string().min(1, { message: "Subject is required" }),
	body: z.string().min(1, { message: "Body is required" }),
});

export const emailDefaultValues = {
	to: "",
	subject: "",
	body: "",
};
