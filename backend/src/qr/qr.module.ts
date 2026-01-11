import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { QrEntity } from '@backend/qr/qr.entity'
import { QrStyleService } from '@backend/qr/qrStyle.service'
import { QrController } from '@backend/qr/qr.controller'
import { QrStringService } from './qrString.service'
import { QrEntityService } from './qrEntity.service'
import { QrCodeService } from './qrCode.service'

@Module({
  imports: [MikroOrmModule.forFeature([QrEntity])],
  controllers: [QrController],
  providers: [QrStyleService, QrStringService, QrEntityService, QrCodeService],
})
export class QrModule {}
