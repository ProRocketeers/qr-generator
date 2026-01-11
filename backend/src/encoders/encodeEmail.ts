export interface EmailData {
  to: string
  subject?: string
  body?: string
  cc?: string
  bcc?: string
  replyTo?: string
  inReplyTo?: string
  references?: string
}

export function encodeEmail(data: EmailData): string {
  const to = data.to

  if (!to || to.trim() === '') {
    throw new Error('Email address (parameter to) cannot be empty')
  }

  const params: string[] = []

  if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`)
  if (data.body) params.push(`body=${encodeURIComponent(data.body)}`)
  if (data.cc) params.push(`cc=${encodeURIComponent(data.cc)}`)
  if (data.bcc) params.push(`bcc=${encodeURIComponent(data.bcc)}`)
  if (data.replyTo) params.push(`reply-to=${encodeURIComponent(data.replyTo)}`)
  if (data.inReplyTo)
    params.push(`in-reply-to=${encodeURIComponent(data.inReplyTo)}`)
  if (data.references)
    params.push(`references=${encodeURIComponent(data.references)}`)

  if (!params.length) return `mailto:${to}`

  return `mailto:${to}${'?' + params.join('&')}`
}
