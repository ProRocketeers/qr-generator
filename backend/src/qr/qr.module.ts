import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { QrEntity } from '@backend/qr/qr.entity'
import { QrStyleService } from '@backend/qr/qrStyle.service'
import { QrStringService } from './qrString.service'
import { QrEntityService } from './qrEntity.service'
import { QrCodeService } from './qrCode.service'
import { QrController } from '@backend/qr/qr.controller'
import { QrEntityController } from './qrEntity.controller'

@Module({
  imports: [MikroOrmModule.forFeature([QrEntity])],
  controllers: [QrController, QrEntityController],
  providers: [QrStyleService, QrStringService, QrEntityService, QrCodeService],
})
export class QrModule {}
