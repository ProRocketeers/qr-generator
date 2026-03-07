import type { ParserContext } from "./types"

export const parseUrlType = (ctx: ParserContext): void => {
	const url = ctx.params.get('url')
	if (url) {
		ctx.newValues.url = url
	}
}
