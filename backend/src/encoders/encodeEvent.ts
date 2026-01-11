export interface EventData {
  title: string
  description?: string
  location?: string
  start: string
  end?: string
  allDay?: boolean
  url?: string
}

export function encodeEvent(data: EventData): string {
  if (!data.title || data.title.trim() === '') {
    throw new Error('Event title (parameter title) cannot be empty')
  }

  const escapeText = (text: string) =>
    text.replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/:/g, '\\:')
      .replace(/\r?\n/g, '\\n')

  let dtStart: string
  let dtEnd: string

  if (data.allDay) {
    const startDate = new Date(data.start)
    const endDate = data.end ? new Date(data.end) : new Date(startDate)
    if (!data.end) endDate.setDate(startDate.getDate() + 1)
    dtStart = startDate.toISOString().slice(0, 10).replace(/-/g, '')
    dtEnd = endDate.toISOString().slice(0, 10).replace(/-/g, '')
  } else {
    dtStart = new Date(data.start).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    dtEnd = (data.end ? new Date(data.end) : new Date(data.start)).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${escapeText(data.title)}`
  ]

  if (data.description) lines.push(`DESCRIPTION:${escapeText(data.description)}`)
  if (data.location) lines.push(`LOCATION:${escapeText(data.location)}`)

  if (data.allDay) {
    lines.push(`DTSTART;VALUE=DATE:${dtStart}`)
    lines.push(`DTEND;VALUE=DATE:${dtEnd}`)
  } else {
    lines.push(`DTSTART:${dtStart}`)
    lines.push(`DTEND:${dtEnd}`)
  }

  if (data.url) lines.push(`URL:${data.url}`)
  lines.push('END:VEVENT')
  lines.push('END:VCALENDAR')

  return lines.join('\r\n')
}
