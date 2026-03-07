import type { ParserContext } from "./types"

export const parseEventType = (ctx: ParserContext): void => {
	const eventTitle = ctx.params.get('eventTitle')
	if (eventTitle) {
		ctx.newValues.eventTitle = eventTitle
	}

	const eventDescription = ctx.params.get('eventDescription')
	if (eventDescription) {
		ctx.newValues.eventDescription = eventDescription
	}

	const eventLocation = ctx.params.get('eventLocation')
	if (eventLocation) {
		ctx.newValues.eventLocation = eventLocation
	}

	const eventStart = ctx.params.get('eventStart')
	if (eventStart) {
		ctx.newValues.eventStart = eventStart
	}

	const eventEnd = ctx.params.get('eventEnd')
	if (eventEnd) {
		ctx.newValues.eventEnd = eventEnd
	}

	const eventAllDay = ctx.params.get('eventAllDay')
	if (eventAllDay === 'true') {
		ctx.newValues.eventAllDay = true
	} else if (eventAllDay === 'false') {
		ctx.newValues.eventAllDay = false
	}

	const eventUrl = ctx.params.get('eventUrl')
	if (eventUrl) {
		ctx.newValues.eventUrl = eventUrl
	}
}
