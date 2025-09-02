import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import mikroOrmConfig from 'mikro-orm.config'
import { QrModule } from './qr/qr.module'

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    QrModule,
  ],
})
export class AppModule {}
