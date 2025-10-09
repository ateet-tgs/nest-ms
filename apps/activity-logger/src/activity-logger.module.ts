import { Module } from '@nestjs/common';
import { ActivityListener } from './activity-logger.listener';
import { ActivityLoggerService } from './activity-logger.service';
import { DatabaseModule } from '@app/database';
import { SharedConfigModule } from '@app/config';
import { RabbitMQModule } from '@app/rabbitmq';

@Module({
  imports: [SharedConfigModule, DatabaseModule, RabbitMQModule],
  controllers: [ActivityListener],
  providers: [ActivityLoggerService],
})
export class ActivityLoggerModule {}
