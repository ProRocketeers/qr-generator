import type { ParserContext } from "./types"

export const parseEmailType = (ctx: ParserContext): void => {
	const to = ctx.params.get('to')
	if (to) {
		ctx.newValues.to = to
	}

	const subject = ctx.params.get('subject')
	if (subject) {
		ctx.newValues.subject = subject
	}

	const body = ctx.params.get('body')
	if (body) {
		ctx.newValues.body = body
	}
}
