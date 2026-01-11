interface UrlLink {
  url: string
}

export function encodeLink({ url }: UrlLink): string {
  if (!url || url.trim() === '') {
    throw new Error('URL cannot be empty')
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `http://${url}`
  }

  return url
}
