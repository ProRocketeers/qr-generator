import { Injectable, InternalServerErrorException } from '@nestjs/common'

export interface QrStyleOptions {
  width?: number
  height?: number
  margin?: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  dotsType?:
    | 'rounded'
    | 'dots'
    | 'classy'
    | 'classy-rounded'
    | 'square'
    | 'extra-rounded'
  dotsColor?: string
  backgroundColor?: string
  image?: string
  imageSize?: number
}

const DEFAULTS: Required<Omit<QrStyleOptions, 'image' | 'imageSize'>> & {
  imageSize: number
} = {
  width: 300,
  height: 300,
  margin: 10,
  errorCorrectionLevel: 'M',
  dotsType: 'rounded',
  dotsColor: '#000000',
  backgroundColor: '#FFFFFF',
  imageSize: 0.25,
}

let ctorPromise: Promise<any> | null = null
function loadCtor(): Promise<any> {
  if (!ctorPromise) {
    ctorPromise = (async () => {
      const mod: any = await import('qr-code-styling')
      const Ctor =
        (typeof mod === 'function' && mod) ||
        (mod?.default && typeof mod.default === 'function' && mod.default) ||
        (mod?.QRCodeStyling &&
          typeof mod.QRCodeStyling === 'function' &&
          mod.QRCodeStyling) ||
        null
      if (!Ctor) throw new Error('qr-code-styling constructor not found')
      return Ctor
    })()
  }
  return ctorPromise
}

@Injectable()
export class QrStyleService {
  public async create(
    data: string,
    options: QrStyleOptions = {},
  ): Promise<string> {
    const opts = { ...DEFAULTS, ...options }

    let Ctor: any
    try {
      Ctor = await loadCtor()
    } catch (e) {
      throw new InternalServerErrorException(
        'Failed to load qr-code-styling: ' + (e as Error).message,
      )
    }

    let svgBuffer: Buffer
    try {
      const qr = new Ctor({
        width: opts.width,
        height: opts.height,
        type: 'svg',
        data,
        margin: opts.margin,
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: opts.errorCorrectionLevel,
        },
        dotsOptions: { type: opts.dotsType, color: opts.dotsColor },
        backgroundOptions: { color: opts.backgroundColor },
        image: opts.image || undefined,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: opts.imageSize,
          margin: 0,
          crossOrigin: 'anonymous',
        },
      })

      const raw = await qr.getRawData?.('svg')
      if (!raw) throw new Error('Empty SVG output')
      if (Buffer.isBuffer(raw)) {
        svgBuffer = raw
      } else if (typeof raw === 'string') {
        svgBuffer = Buffer.from(raw, 'utf8')
      } else if (raw instanceof Blob) {
        svgBuffer = Buffer.from(await raw.arrayBuffer())
      } else {
        svgBuffer = Buffer.from(String(raw), 'utf8')
      }
    } catch (e) {
      throw new InternalServerErrorException(
        'SVG generation failed: ' + (e as Error).message,
      )
    }

    const svg = svgBuffer.toString('utf8')

    return svg
  }
}
