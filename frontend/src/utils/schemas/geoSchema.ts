import z from "zod"

// Základní shape pro Geo typ
export const geoFields = {
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	altitude: z.number().optional(),
}

// Validace pro Geo pole
export const validateGeoFields = (
	data: { latitude?: number; longitude?: number },
	ctx: z.RefinementCtx
) => {
	if (data.latitude === undefined || data.latitude === null) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Zeměpisná šířka je povinná",
			path: ["latitude"],
		})
	} else if (data.latitude < -90 || data.latitude > 90) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Zeměpisná šířka musí být mezi -90 a 90",
			path: ["latitude"],
		})
	}

	if (data.longitude === undefined || data.longitude === null) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Zeměpisná délka je povinná",
			path: ["longitude"],
		})
	} else if (data.longitude < -180 || data.longitude > 180) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Zeměpisná délka musí být mezi -180 a 180",
			path: ["longitude"],
		})
	}
}

export const geoDefaultValues = {
	latitude: undefined,
	longitude: undefined,
	altitude: undefined,
}
