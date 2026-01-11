export interface PaymentSEPAData {
  name: string
  iban: string
  bic?: string
  amount?: string
  currency?: string
  reference?: string
  purpose?: string
  remittance?: string
}

export function encodePaymentSEPA(data: PaymentSEPAData): string {
  if (!data.name || data.name.trim() === '') {
    throw new Error('SEPA payment name (parameter name) cannot be empty')
  }
  if (!data.iban || data.iban.trim() === '') {
    throw new Error('SEPA payment IBAN (parameter iban) cannot be empty')
  }
  const currency = data.currency || 'EUR'

  const lines: string[] = [
    'BCD',
    '002',
    '1',
    'SCT',
    data.bic || '',
    data.name,
    data.iban.replace(/\s+/g, ''),
    data.amount ? `${currency}${data.amount}` : '',
    data.purpose || '',
    data.reference || '',
    data.remittance || ''
  ]

  return lines.join('\n')
}
