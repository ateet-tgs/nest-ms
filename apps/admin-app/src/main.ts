import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);
  const appName = configService.get<string>('APP_NAME') || 'Nest App';
  const env = process.env.NODE_ENV || 'development';
  console.log(
    `[${appName}] is running on: http://localhost:${port} (${env} mode)`,
  );
}
bootstrap();
