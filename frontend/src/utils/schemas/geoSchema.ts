import z from "zod"

// Základní shape pro Geo typ
// Poznámka: Pole jsou optional protože jsou v unified schema se všemi typy
// Validace povinnosti je řešena v superRefine podle qrType
export const geoFields = {
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	altitude: z.number().optional(),
}

// Validace pro Geo pole (latitude a longitude jsou POVINNÉ pro geo typ)
export const createValidateGeoFields = (t: (key: string) => string) => (
	data: { latitude?: number; longitude?: number },
	ctx: z.RefinementCtx
) => {
	if (data.latitude === undefined) {
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

	if (data.longitude === undefined) {
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
