import { NestFactory } from '@nestjs/core';
import { ActivityLoggerModule } from './activity-logger.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ActivityLoggerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: process.env.ORDER_ACTIVITY_QUEUE, // Default, but we'll use multiple patterns
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
}
bootstrap();
