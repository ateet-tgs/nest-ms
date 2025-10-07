import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendMail(to: string, subject: string, body: string) {
    // Here you can integrate nodemailer, SES, SendGrid, etc.
    console.log(`Sending mail to ${to} | Subject: ${subject} Body:${JSON.stringify(body)}`);
    return { success: true };
  }
}
