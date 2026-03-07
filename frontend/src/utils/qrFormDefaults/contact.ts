import type { ParserContext } from "./types"

export const parseContactType = (ctx: ParserContext): void => {
	const contactFirstName = ctx.params.get('contactFirstName')
	if (contactFirstName) {
		ctx.newValues.contactFirstName = contactFirstName
	}

	const contactLastName = ctx.params.get('contactLastName')
	if (contactLastName) {
		ctx.newValues.contactLastName = contactLastName
	}

	const contactOrganization = ctx.params.get('contactOrganization')
	if (contactOrganization) {
		ctx.newValues.contactOrganization = contactOrganization
	}

	const contactPhone = ctx.params.get('contactPhone')
	if (contactPhone) {
		ctx.newValues.contactPhone = contactPhone
	}

	const contactEmail = ctx.params.get('contactEmail')
	if (contactEmail) {
		ctx.newValues.contactEmail = contactEmail
	}

	const contactUrl = ctx.params.get('contactUrl')
	if (contactUrl) {
		ctx.newValues.contactUrl = contactUrl
	}

	const contactNote = ctx.params.get('contactNote')
	if (contactNote) {
		ctx.newValues.contactNote = contactNote
	}
}
