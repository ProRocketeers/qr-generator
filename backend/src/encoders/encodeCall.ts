interface CallData {
  phone: string
}

export function encodeCall({ phone: tel }: CallData): string {
  if (!tel || tel.trim() === '') {
    throw new Error('Phone number (parameter phone) cannot be empty')
  }

  return `tel:${tel}`
}
