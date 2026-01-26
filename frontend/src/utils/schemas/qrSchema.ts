import z from "zod";

export const qrSchema = z.object({
	qrCode: z.string().min(1, { message: "Code is required" }),
});

export const qrDefaultValues = {
	qrCode: "",
};
