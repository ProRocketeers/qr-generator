import z from "zod"

// Základní shape pro Email typ
export const emailFields = {
	to: z.string().optional(),
	subject: z.string().optional(),
	body: z.string().optional(),
}

// Validace pro Email pole
export const validateEmailFields = (
	data: { to?: string; subject?: string; body?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.to || data.to.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Email (to) je povinny",
			path: ["to"],
		})
	} else if (!z.string().email().safeParse(data.to).success) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Neplatny email",
			path: ["to"],
		})
	}

	if (!data.subject || data.subject.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Predmet je povinny",
			path: ["subject"],
		})
	}

	if (!data.body || data.body.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Obsah zpravy je povinny",
			path: ["body"],
		})
	}
}

export const emailDefaultValues = {
	to: "",
	subject: "",
	body: "",
}
