import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app settings
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.getPort());
}
bootstrap();
