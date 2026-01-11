import { Injectable } from '@nestjs/common'
import { QrType } from '@backend/types'
import { QrStringService } from './qrString.service'
import { QrStyleService } from './qrStyle.service'

@Injectable()
export class QrCodeService {
  constructor(
    private readonly qrStringService: QrStringService,
    private readonly qrStyleService: QrStyleService,
  ) {}

  public async create(type: QrType, data: unknown = {}): Promise<string> {
    const dataString = this.qrStringService.encode(type, data)
    const svg = await this.qrStyleService.create(dataString)

    return svg
  }
}
