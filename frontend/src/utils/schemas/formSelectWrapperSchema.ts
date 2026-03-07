import z from "zod"

export const schema = z
	.object({
		qrType: z.enum(["url", "text", "email"]),
		url: z.string().optional(),
		text: z.string().optional(),
		to: z.string().optional(),
		subject: z.string().optional(),
		body: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.qrType === "url") {
			if (!data.url || data.url.trim() === "") {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "URL je povinne",
					path: ["url"],
				})
			} else {
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
		}

		if (data.qrType === "text") {
			if (!data.text || data.text.trim() === "") {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Text je povinny",
					path: ["text"],
				})
			}
		}

		if (data.qrType === "email") {
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
	})

export type FormValues = z.infer<typeof schema>;

export const defaultValues: FormValues = {
	qrType: "url",
	url: "",
	text: "",
	to: "",
	subject: "",
	body: "",
}
