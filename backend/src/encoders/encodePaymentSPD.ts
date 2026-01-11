export interface PaymentSPDData {
  accountName: string
  iban: string
  amount?: string
  currency?: string
  variableSymbol?: string
  specificSymbol?: string
  constantSymbol?: string
  message?: string
  bic?: string
}

export function encodePaymentSPD(data: PaymentSPDData): string {
  if (!data.accountName || data.accountName.trim() === '') {
    throw new Error('SPD payment account name (parameter accountName) cannot be empty')
  }
  if (!data.iban || data.iban.trim() === '') {
    throw new Error('SPD payment IBAN (parameter iban) cannot be empty')
  }

  function removeDiacritics(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const currency = data.currency || 'CZK'
  const escapeText = (text: string) =>
    removeDiacritics(text.replace(/[|*?]/g, '').trim())

  const parts: string[] = ['SPD*1.0']
  parts.push(`ACC:${data.iban.replace(/\s+/g, '')}`)
  if (data.amount) parts.push(`AM:${parseFloat(data.amount).toFixed(2)}`)
  parts.push(`CC:${currency}`)
  if (data.message) parts.push(`MSG:${escapeText(data.message)}`)
  if (data.variableSymbol) parts.push(`X-VS:${escapeText(data.variableSymbol)}`)
  if (data.constantSymbol) parts.push(`X-KS:${escapeText(data.constantSymbol)}`)
  if (data.specificSymbol) parts.push(`X-SS:${escapeText(data.specificSymbol)}`)

  console.log('SPD parts:', parts.join('*'))
  return parts.join('*')
}
