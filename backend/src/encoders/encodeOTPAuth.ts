export interface OTPAuthData {
  type: 'totp' | 'hotp'
  label: string
  issuer?: string
  secret: string
  algorithm?: 'SHA1' | 'SHA256' | 'SHA512' | 'MD5'
  digits?: number
  period?: number // for TOTP
  counter?: number // for HOTP
}

export function encodeOTPAuth(data: OTPAuthData): string {
  if (!data.type || (data.type !== 'totp' && data.type !== 'hotp')) {
    throw new Error('OTPAuth type must be either "totp" or "hotp"')
  }
  if (!data.label || data.label.trim() === '') {
    throw new Error('OTPAuth label cannot be empty')
  }
  if (!data.secret || data.secret.trim() === '') {
    throw new Error('OTPAuth secret cannot be empty')
  }

  const params: string[] = []

  params.push(`secret=${data.secret}`)

  if (data.issuer) params.push(`issuer=${encodeURIComponent(data.issuer)}`)
  if (data.algorithm) params.push(`algorithm=${data.algorithm}`)
  if (data.digits) params.push(`digits=${data.digits}`)

  if (data.type === 'totp' && data.period) {
    params.push(`period=${data.period}`)
  } else if (data.type === 'hotp' && data.counter) {
    params.push(`counter=${data.counter}`)
  }

  return `otpauth://${data.type}/${encodeURIComponent(data.label)}?${params.join('&')}`
}
