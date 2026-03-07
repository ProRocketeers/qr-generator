import z from "zod"

// Základní shape pro URL typ
export const urlFields = {
	url: z.string().optional(),
}

// Validace pro URL pole
export const createValidateUrlFields = (t: (key: string) => string) => (
	data: { url?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.url || data.url.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('urlRequired'),
			path: ["url"],
		})
		return
	}

	// Zkusíme validovat URL - nejdřív jak je, pak s https://
	let isValid = false
	
	try {
		new URL(data.url)
		isValid = true
	} catch {
		// Zkusíme s přidaným protokolem
		try {
			new URL(`https://${data.url}`)
			isValid = true
		} catch {
			// Stále neplatná
		}
	}

	if (!isValid) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('urlInvalid'),
			path: ["url"],
		})
	}
}

export const urlDefaultValues = {
	url: "",
}
