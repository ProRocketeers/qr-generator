export default function cleanSvg(svg: string): string {
  return svg.replace(/^\uFEFF/, '').replace(/^[\s\r\n]+/, '')
}
