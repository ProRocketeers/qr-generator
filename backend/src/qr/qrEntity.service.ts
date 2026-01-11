import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { QrEntity } from '@backend/qr/qr.entity'
import { EntityRepository } from '@mikro-orm/postgresql'
import { QrType } from '@backend/types'
import { QrCodeService } from '@backend/qr/qrCode.service'

@Injectable()
export class QrEntityService {
  constructor(
    @InjectRepository(QrEntity)
    protected readonly repo: EntityRepository<QrEntity>,
    private readonly qrCodeService: QrCodeService,
  ) {}

  async create(type: QrType, data: unknown = {}): Promise<QrEntity> {
    const code = await this.uniqueCode()
    const svg = await this.qrCodeService.create(type, data)
    const entity = this.repo.create({ type, data, svg, code })

    await this.repo.getEntityManager().persistAndFlush(entity)

    if (!entity.code) {
      throw new ConflictException('QR kód se nepodařilo uložit')
    }

    return entity
  }

  async update(
    code: string,
    type: QrType,
    data: unknown = {},
  ): Promise<QrEntity> {
    const entity = await this.findOne(code)
    const svg = await this.qrCodeService.create(type, data)

    entity.type = type
    entity.data = data
    entity.svg = svg

    await this.repo.getEntityManager().persistAndFlush(entity)

    return entity
  }

  async findOne(code: string): Promise<QrEntity> {
    const entity = await this.repo.findOne({ code })

    if (!entity) {
      throw new ConflictException(
        `QR kód s daným kódem (${code}) se nepodařilo najít`,
      )
    }

    return entity
  }

  async delete(code: string): Promise<void> {
    const entity = await this.findOne(code)

    await this.repo.getEntityManager().removeAndFlush(entity)
  }

  private generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let s = ''
    for (let i = 0; i < 4; i++)
      s += chars[Math.floor(Math.random() * chars.length)]
    return 'QR' + s
  }

  private async uniqueCode(): Promise<string> {
    for (let i = 0; i < 10; i++) {
      const c = this.generateCode()
      const existing = await this.repo.findOne({ code: c })
      if (!existing) return c
    }
    throw new ConflictException('Nepodařilo se vygenerovat unikátní kód')
  }
}
