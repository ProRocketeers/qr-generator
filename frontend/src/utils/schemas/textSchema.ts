import z from "zod"

// Základní shape pro Text typ
export const textFields = {
	text: z.string().optional(),
}

// Validace pro Text pole
export const createValidateTextFields = (t: (key: string) => string) => (
	data: { text?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.text || data.text.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('textRequired'),
			path: ["text"],
		})
	}
}

export const textDefaultValues = {
	text: "",
}
