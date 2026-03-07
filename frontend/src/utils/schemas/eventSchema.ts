import z from "zod"

// Základní shape pro Event typ
// Poznámka: Pole jsou optional protože jsou v unified schema se všemi typy
// Validace povinnosti je řešena v superRefine podle qrType
export const eventFields = {
	eventTitle: z.string().optional(),
	eventDescription: z.string().optional(),
	eventLocation: z.string().optional(),
	eventStart: z.string().optional(),
	eventEnd: z.string().optional(),
	eventAllDay: z.boolean().optional(),
	eventUrl: z.string().optional(),
}

// Validace pro Event pole (eventTitle a eventStart jsou POVINNÉ pro event typ)
export const createValidateEventFields = (t: (key: string) => string) => (
	data: { eventTitle?: string; eventStart?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.eventTitle || data.eventTitle.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('eventTitleRequired'),
			path: ["eventTitle"],
		})
	}

	if (!data.eventStart || data.eventStart.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('eventStartRequired'),
			path: ["eventStart"],
		})
	}
}

export const eventDefaultValues = {
	eventTitle: "",
	eventDescription: "",
	eventLocation: "",
	eventStart: "",
	eventEnd: "",
	eventAllDay: false,
	eventUrl: "",
}
