import z from "zod"

export const schema = z.object({
	text: z.string().min(1, { message: "Text is required" }),
})

export const defaultValues = {
	text: "",
}
