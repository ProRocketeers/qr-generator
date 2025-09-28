import z from "zod";

export const schema = z.object({
	url: z.string().min(1, { message: "Name is required" }),
});

export const defaultValues = {
	url: "",
};
