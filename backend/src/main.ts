import './polyfills/dom-env';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@backend/app.module';
import { configureSwagger } from '@backend/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  configureSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port = Number(process.env.PORT || 3000);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
