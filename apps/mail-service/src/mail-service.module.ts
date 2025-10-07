import { Module } from '@nestjs/common';
import { MailController } from './mail-service.controller';
import { MailService } from './mail-service.service';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService],
})
export class MailServiceModule {}
