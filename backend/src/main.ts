import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from '@backend/app.module'
import { configureSwagger } from '@backend/configs/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  configureSwagger(app)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))

  await app.listen(3000)
}

bootstrap()
