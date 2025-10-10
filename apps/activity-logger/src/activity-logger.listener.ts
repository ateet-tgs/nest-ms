import { Controller, Get, Logger } from '@nestjs/common';
import { ActivityLoggerService } from './activity-logger.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class ActivityListener {
  private readonly logger = new Logger(ActivityListener.name);

  constructor(private readonly activityService: ActivityLoggerService) {}

  @EventPattern('auth_activity')
  async handleAuthActivity(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.activityService.logEvent(data, 'auth_activity');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
