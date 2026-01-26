import z from "zod";

export const urlSchema = z.object({
	url: z.string().min(1, { message: "Url is required" }),
});

export const urlDefaultValues = {
	url: "",
};
