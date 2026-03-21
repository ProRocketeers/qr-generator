import './polyfills/dom-env'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from '@backend/app.module'
import { configureSwagger } from '@backend/configs/swagger.config'
import { GlobalExceptionFilter } from '@backend/filters/global-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = Number(process.env.PORT || 3000)

  app.enableCors()

  app.useGlobalFilters(new GlobalExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )

  configureSwagger(app)

  await app.listen(port)
}

bootstrap()
