import z from "zod"

// Základní shape pro Contact typ
export const contactFields = {
	contactFirstName: z.string().optional(),
	contactLastName: z.string().optional(),
	contactOrganization: z.string().optional(),
	contactPhone: z.string().optional(),
	contactEmail: z.string().optional(),
	contactUrl: z.string().optional(),
	contactNote: z.string().optional(),
}

// Validace pro Contact pole
export const validateContactFields = (
	data: { contactFirstName?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.contactFirstName || data.contactFirstName.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Jméno je povinné",
			path: ["contactFirstName"],
		})
	}
}

export const contactDefaultValues = {
	contactFirstName: "",
	contactLastName: "",
	contactOrganization: "",
	contactPhone: "",
	contactEmail: "",
	contactUrl: "",
	contactNote: "",
}
