export default function svgToBase64(svg: string): string {
  return Buffer.from(svg, 'utf8').toString('base64')
}
