export interface SmsData {
  phone: string
  body?: string
}

export function encodeSms({ phone, body: message }: SmsData): string {
  if (!phone || phone.trim() === '') {
    throw new Error('Phone number (parameter phone) cannot be empty')
  }

  if (!message || message.trim() === '') {
    return `sms:${phone}`
  }

  return `sms:${phone}?body=${encodeURIComponent(message)}`
}
