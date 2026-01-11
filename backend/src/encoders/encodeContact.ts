export interface ContactData {
  firstName: string
  lastName?: string
  additionalName?: string
  honorificPrefix?: string
  honorificSuffix?: string
  organization?: string
  title?: string
  phone?: string
  phoneWork?: string
  email?: string
  emailWork?: string
  url?: string
  note?: string
  birthday?: string
  nickname?: string
  address?: {
    street?: string
    city?: string
    region?: string
    postal?: string
    country?: string
  }
}

export function encodeContact(data: ContactData): string {
  if (!data.firstName || data.firstName.trim() === '') {
    throw new Error('Contact first name (parameter firstName) cannot be empty')
  }

  const escapeText = (text: string) =>
    text.replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/:/g, '\\:')
      .replace(/\r?\n/g, '\\n')

  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0'
  ]

  const last = data.lastName || ''
  const first = data.firstName || ''
  const additional = data.additionalName || ''
  const prefix = data.honorificPrefix || ''
  const suffix = data.honorificSuffix || ''
  let nLine = `${escapeText(last)};${escapeText(first)};${escapeText(additional)};${escapeText(prefix)};${escapeText(suffix)}`
  lines.push(`N:${nLine}`)
  const fn = [prefix, first, additional, last, suffix].filter(part => part && part.trim() !== '').join(' ')
  lines.push(`FN:${escapeText(fn)}`)

  if (data.organization) lines.push(`ORG:${escapeText(data.organization)}`)
  if (data.title) lines.push(`TITLE:${escapeText(data.title)}`)

  if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone}`)
  if (data.phoneWork) lines.push(`TEL;TYPE=WORK:${data.phoneWork}`)

  if (data.email) lines.push(`EMAIL;TYPE=HOME:${data.email}`)
  if (data.emailWork) lines.push(`EMAIL;TYPE=WORK:${data.emailWork}`)

  if (data.address) {
    const a = data.address
    lines.push(
      `ADR:;;${escapeText(a.street || '')};${escapeText(a.city || '')};${escapeText(a.region || '')};${escapeText(a.postal || '')};${escapeText(a.country || '')}`
    )
  }

  if (data.url) lines.push(`URL:${data.url}`)
  if (data.note) lines.push(`NOTE:${escapeText(data.note)}`)
  if (data.birthday) lines.push(`BDAY:${data.birthday}`)
  if (data.nickname) lines.push(`NICKNAME:${escapeText(data.nickname)}`)

  lines.push('END:VCARD')
  return lines.join('\r\n')
}
