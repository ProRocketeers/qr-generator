import z from "zod";

export const schema = z.object({
	qrCode: z.string().min(1, { message: "Code is required" }),
});

export const defaultValues = {
	qrCode: "",
};
