import { Injectable } from '@nestjs/common';
import { Message } from '@jasonruesch/api-interfaces';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  sendMail(options: ISendMailOptions): Promise<unknown> {
    return this.mailerService.sendMail(options);
  }
}
