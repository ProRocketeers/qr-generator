import z from "zod"

// Základní shape pro Text typ
// Poznámka: Pole jsou optional protože jsou v unified schema se všemi typy
// Validace povinnosti je řešena v superRefine podle qrType
export const textFields = {
	text: z.string().optional(),
}

// Validace pro Text pole (text je POVINNÉ pro text typ)
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
