import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { QrEntity } from '@backend/qr/qr.entity'
import { EntityRepository } from '@mikro-orm/postgresql'

export interface QrStyleOptions {
  width?: number
  height?: number
  margin?: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  dotsType?: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
  dotsColor?: string
  backgroundColor?: string
  image?: string
  imageSize?: number
}

const DEFAULTS: Required<Omit<QrStyleOptions, 'image' | 'imageSize'>> & { imageSize: number } = {
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
        (mod?.QRCodeStyling && typeof mod.QRCodeStyling === 'function' && mod.QRCodeStyling) ||
        null
      if (!Ctor) throw new Error('qr-code-styling constructor not found')
      return Ctor
    })()
  }
  return ctorPromise
}

@Injectable()
export class QrCodeStyleService {
  constructor(
    @InjectRepository(QrEntity)
    protected readonly repo: EntityRepository<QrEntity>,
  ) { }

  private generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let s = ''
    for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)]
    return 'QR' + s
  }

  private async uniqueCode(): Promise<string> {
    for (let i = 0; i < 10; i++) {
      const c = this.generateCode()
      const existing = await this.repo.findOne({ code: c })
      if (!existing) return c
    }
    throw new ConflictException('Nelze vygenerovat unikátní kód')
  }

  public async findOne(code: string) {
    const e = await this.repo.findOne({ code })
    if (!e) throw new NotFoundException('QR kód nenalezen')
    return e
  }

  public async create(data: string, options: QrStyleOptions = {}): Promise<{ code: string; svg: string }> {
    const opts = { ...DEFAULTS, ...options }

    // Načtení konstruktoru
    let Ctor: any
    try {
      Ctor = await loadCtor()
    } catch (e) {
      throw new InternalServerErrorException('Failed to load qr-code-styling: ' + (e as Error).message)
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

      const raw = await (qr as any).getRawData?.('svg')
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
      throw new InternalServerErrorException('SVG generation failed: ' + (e as Error).message)
    }

    const svg = svgBuffer.toString('utf8')
    const code = await this.uniqueCode()

    // Uprav 'data' na 'payload' pokud to tak entita vyžaduje
    const entity = this.repo.create({ code, data, svg })
    await this.repo.getEntityManager().persistAndFlush(entity)

    return { code, svg }
  }
}
