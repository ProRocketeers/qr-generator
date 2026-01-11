export interface WifiData {
  ssid: string
  password?: string
  encryption?: 'WEP' | 'WPA' | 'WPA2' | 'WPA3' | 'nopass'
  hidden?: boolean
}

export function encodeWifi(data: WifiData): string {
  const ssid = data.ssid

  if (!ssid || ssid.trim() === '') {
    throw new Error('WiFi SSID (parameter ssid) cannot be empty')
  }

  const encryption = data.encryption ? data.encryption : 'nopass'
  const password = data.password ? data.password : ''
  const hidden = data.hidden ? 'true' : 'false'

  return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`
}
