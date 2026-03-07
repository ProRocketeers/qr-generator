import z from "zod"

// Základní shape pro Contact typ
// Poznámka: Pole jsou optional protože jsou v unified schema se všemi typy
// Validace povinnosti je řešena v superRefine podle qrType
export const contactFields = {
	contactFirstName: z.string().optional(),
	contactLastName: z.string().optional(),
	contactOrganization: z.string().optional(),
	contactPhone: z.string().optional(),
	contactEmail: z.string().optional(),
	contactUrl: z.string().optional(),
	contactNote: z.string().optional(),
}

// Validace pro Contact pole (contactFirstName je POVINNÉ pro contact typ)
export const createValidateContactFields = (t: (key: string) => string) => (
	data: { contactFirstName?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.contactFirstName || data.contactFirstName.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('contactFirstNameRequired'),
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
