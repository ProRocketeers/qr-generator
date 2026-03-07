import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import mikroOrmConfig from '@backend/configs/mikro-orm.config'
import { ConfigModule } from '@nestjs/config'
import { QrModule } from '@backend/qr/qr.module'
import { HealthModule } from '@backend/health/health.module'
import { LoggerMiddleware } from '@backend/middlewares/logger.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    QrModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
