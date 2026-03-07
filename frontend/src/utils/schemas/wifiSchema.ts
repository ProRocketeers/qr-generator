import z from "zod"

// Základní shape pro WiFi typ
export const wifiFields = {
	ssid: z.string().optional(),
	password: z.string().optional(),
	encryption: z.enum(["WEP", "WPA", "WPA2", "WPA3", "nopass"]).optional(),
	hidden: z.boolean().optional(),
}

// Validace pro WiFi pole
export const validateWifiFields = (
	data: { ssid?: string; password?: string; encryption?: string; hidden?: boolean },
	ctx: z.RefinementCtx
) => {
	if (!data.ssid || data.ssid.trim() === "") {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "SSID je povinné",
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
