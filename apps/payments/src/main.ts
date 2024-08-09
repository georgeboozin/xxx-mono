import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const CORS_ORIGIN = configService.get<string>('CORS_ORIGIN');
  app.enableCors({
    origin: CORS_ORIGIN,
    optionsSuccessStatus: 200,
  });
  app.useGlobalPipes(new ValidationPipe());
  const PORT = configService.get<string>('PORT');
  await app.listen(PORT);
}
bootstrap();
