import z from "zod"

// Základní shape pro Email typ
export const emailFields = {
	to: z.string().optional(),
	subject: z.string().optional(),
	body: z.string().optional(),
}

// Validace pro Email pole
export const createValidateEmailFields = (t: (key: string) => string) => (
	data: { to?: string; subject?: string; body?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.to || data.to.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('emailRequired'),
			path: ["to"],
		})
	} else if (!z.string().email().safeParse(data.to).success) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('emailInvalid'),
			path: ["to"],
		})
	}

	if (!data.subject || data.subject.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('subjectRequired'),
			path: ["subject"],
		})
	}

	if (!data.body || data.body.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('bodyRequired'),
			path: ["body"],
		})
	}
}

export const emailDefaultValues = {
	to: "",
	subject: "",
	body: "",
}
