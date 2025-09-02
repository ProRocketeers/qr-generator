import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/core'
import { QrEntity } from './qr.entity'
import * as QRCode from 'qrcode'

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(QrEntity)
    private readonly repo: EntityRepository<QrEntity>,
  ) {}

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

  async create(payload: string) {
    const buffer = await QRCode.toBuffer(payload, { type: 'png', width: 300, errorCorrectionLevel: 'M' })
    const base64 = buffer.toString('base64')
    const code = await this.uniqueCode()
    const entity = this.repo.create({ code, payload, base64 })
    await this.repo.getEntityManager().persistAndFlush(entity)
    return { code, base64, buffer }
  }

  async findOne(code: string) {
    const e = await this.repo.findOne({ code })
    if (!e) throw new NotFoundException('QR kód nenalezen')
    return e
  }
}