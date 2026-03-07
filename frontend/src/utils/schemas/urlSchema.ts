import z from "zod"

// Základní shape pro URL typ
export const urlFields = {
	url: z.string().optional(),
}

// Validace pro URL pole
export const validateUrlFields = (
	data: { url?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.url || data.url.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "URL je povinne",
			path: ["url"],
		})
		return
	}

	try {
		new URL(data.url)
	} catch {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Neplatna URL",
			path: ["url"],
		})
	}
}

export const urlDefaultValues = {
	url: "",
}
