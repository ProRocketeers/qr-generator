import type { ParserContext } from "./types"

export const parseWifiType = (ctx: ParserContext): void => {
	const ssid = ctx.params.get('ssid')
	if (ssid) {
		ctx.newValues.ssid = ssid
	}

	const password = ctx.params.get('password')
	if (password) {
		ctx.newValues.password = password
	}

	const encryption = ctx.params.get('encryption')
	if (encryption === 'WEP' || encryption === 'WPA' || encryption === 'WPA2' || encryption === 'WPA3' || encryption === 'nopass') {
		ctx.newValues.encryption = encryption
	}

	const hidden = ctx.params.get('hidden')
	if (hidden === 'true') {
		ctx.newValues.hidden = true
	} else if (hidden === 'false') {
		ctx.newValues.hidden = false
	}
}
