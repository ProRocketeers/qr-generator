import type { ParserContext } from "./types"

export const parseGeoType = (ctx: ParserContext): void => {
	const latitudeStr = ctx.params.get('latitude')
	if (latitudeStr) {
		const lat = parseFloat(latitudeStr)
		if (!isNaN(lat)) {
			ctx.newValues.latitude = lat
		}
	}

	const longitudeStr = ctx.params.get('longitude')
	if (longitudeStr) {
		const lng = parseFloat(longitudeStr)
		if (!isNaN(lng)) {
			ctx.newValues.longitude = lng
		}
	}

	const altitudeStr = ctx.params.get('altitude')
	if (altitudeStr) {
		const alt = parseFloat(altitudeStr)
		if (!isNaN(alt)) {
			ctx.newValues.altitude = alt
		}
	}
}
