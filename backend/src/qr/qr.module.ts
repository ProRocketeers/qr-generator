import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QrEntity } from '@backend/qr/qr.entity';
import { QrCodeStyleService } from '@backend/qr/qr.service';
import { QrController } from '@backend/qr/qr.controller';

@Module({
  imports: [MikroOrmModule.forFeature([QrEntity])],
  controllers: [QrController],
  providers: [QrCodeStyleService],
})
export class QrModule {}