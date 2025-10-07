import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailService } from './mail-service.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'send_mail' })
  async handleSendMail(data: { to: string; subject: string; body: string }) {
    return this.mailService.sendMail(data.to, data.subject, data.body);
  }
}
