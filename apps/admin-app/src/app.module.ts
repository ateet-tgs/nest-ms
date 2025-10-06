import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { RedisCacheModule } from '@app/redis-cache';
import { RabbitMQModule } from '@app/rabbitmq';

@Module({
  imports: [
    SharedConfigModule,
    DatabaseModule,
    RedisCacheModule,
    RabbitMQModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
