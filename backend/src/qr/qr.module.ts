import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QrEntity } from './qr.entity';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';

@Module({
  imports: [MikroOrmModule.forFeature([QrEntity])],
  controllers: [QrController],
  providers: [QrService],
})
export class QrModule {}