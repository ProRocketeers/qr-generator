import type { ParserContext } from "./types"

export const parseTextType = (ctx: ParserContext): void => {
	const text = ctx.params.get('text')
	if (text) {
		ctx.newValues.text = text
	}
}
