export interface GeoData {
  latitude: number
  longitude: number
  altitude?: number
}

export function encodeGeo({ latitude, longitude, altitude }: GeoData): string {
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw new Error('Invalid latitude or longitude values')
  }

  if (!altitude) return `geo:${latitude},${longitude}`

  return `geo:${latitude},${longitude},${altitude}`
}
