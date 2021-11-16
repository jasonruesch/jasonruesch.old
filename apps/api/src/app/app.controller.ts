import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { Message } from '@jasonruesch/api-interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Post('send-mail')
  sendMail(@Body() options: ISendMailOptions): Promise<unknown> {
    return this.appService.sendMail(options);
  }
}
