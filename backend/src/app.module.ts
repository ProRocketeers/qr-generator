import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import mikroOrmConfig from 'mikro-orm.config'
import { ConfigModule } from '@nestjs/config'
import { QrModule } from '@backend/qr/qr.module'
import { HealthModule } from '@backend/health/health.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    QrModule,
    HealthModule,
  ],
})
export class AppModule {}
