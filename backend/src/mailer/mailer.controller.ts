import { Controller, Post, Body, Version } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-email')
  @Version('1')
  async sendWelcomeEmail(@Body() body: { email: string; message: string }) {
    await this.mailerService.sendMail({
      to: body.email,
      from: `${process.env.MAIL_FROM}`,
      subject: 'Notification from Project Supervision!',
      text: body.message,
    });
  }
}
