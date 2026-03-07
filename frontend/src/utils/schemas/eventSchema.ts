import z from "zod"

// Základní shape pro Event typ
export const eventFields = {
	eventTitle: z.string().optional(),
	eventDescription: z.string().optional(),
	eventLocation: z.string().optional(),
	eventStart: z.string().optional(),
	eventEnd: z.string().optional(),
	eventAllDay: z.boolean().optional(),
	eventUrl: z.string().optional(),
}

// Validace pro Event pole
export const validateEventFields = (
	data: { eventTitle?: string; eventStart?: string },
	ctx: z.RefinementCtx
) => {
	if (!data.eventTitle || data.eventTitle.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Nadpis akce je povinný",
			path: ["eventTitle"],
		})
	}

	if (!data.eventStart || data.eventStart.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Počáteční čas je povinný",
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
