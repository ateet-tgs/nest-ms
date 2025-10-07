import { NestFactory } from '@nestjs/core';
import { OrderModuleModule } from './order-module.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrderModuleModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'order_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  // Start both HTTP and RMQ listeners
  await app.startAllMicroservices();

  await app.listen(port);
  const appName = configService.get<string>('APP_NAME') || 'Nest App';
  const env = process.env.NODE_ENV || 'development';

  console.log(
    `[${appName}] is running on: http://localhost:${port} (${env} mode)`,
  );
}
bootstrap();
