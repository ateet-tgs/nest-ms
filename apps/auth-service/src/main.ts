import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
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
