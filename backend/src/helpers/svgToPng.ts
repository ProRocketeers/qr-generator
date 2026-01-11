export default async function svgToPng(svg: string): Promise<Buffer> {
  try {
    const mod: any = await import('sharp')
    const sharpFn = mod.default || mod
    return await sharpFn(Buffer.from(svg, 'utf8')).png().toBuffer()
  } catch (e) {
    throw new Error('PNG conversion failed: ' + (e as Error).message)
  }
}
