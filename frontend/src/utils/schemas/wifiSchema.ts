import z from "zod"

// Základní shape pro WiFi typ
// Poznámka: Pole jsou optional protože jsou v unified schema se všemi typy
// Validace povinnosti je řešena v superRefine podle qrType
export const wifiFields = {
	ssid: z.string().optional(),
	password: z.string().optional(),
	encryption: z.enum(["WEP", "WPA", "WPA2", "WPA3", "nopass"]).optional(),
	hidden: z.boolean().optional(),
}

// Validace pro WiFi pole (ssid je POVINNÉ pro wifi typ)
export const createValidateWifiFields = (t: (key: string) => string) => (
	data: { ssid?: string; password?: string; encryption?: string; hidden?: boolean },
	ctx: z.RefinementCtx
) => {
	if (!data.ssid || data.ssid.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t('ssidRequired'),
			path: ["ssid"],
		})
	}
}

export const wifiDefaultValues = {
	ssid: "",
	password: "",
	encryption: "WPA2" as const,
	hidden: false,
}
