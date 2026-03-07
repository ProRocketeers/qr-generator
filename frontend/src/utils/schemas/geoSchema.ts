import z from "zod"

// Základní shape pro Geo typ
export const geoFields = {
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	altitude: z.number().optional(),
}

// Validace pro Geo pole
export const createValidateGeoFields = (t: (key: string) => string) => (
	data: { latitude?: number; longitude?: number },
	ctx: z.RefinementCtx
) => {
	if (data.latitude === undefined || data.latitude === null) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('latitudeRequired'),
			path: ["latitude"],
		})
	} else if (data.latitude < -90 || data.latitude > 90) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('latitudeInvalid'),
			path: ["latitude"],
		})
	}

	if (data.longitude === undefined || data.longitude === null) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('longitudeRequired'),
			path: ["longitude"],
		})
	} else if (data.longitude < -180 || data.longitude > 180) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('longitudeInvalid'),
			path: ["longitude"],
		})
	}
}

export const geoDefaultValues = {
	latitude: undefined,
	longitude: undefined,
	altitude: undefined,
}
