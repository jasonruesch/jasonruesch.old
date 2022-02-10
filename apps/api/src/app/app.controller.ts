import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Message } from '@jasonruesch/api-interfaces';
import { AppService } from './app.service';
import { RecaptchaGuard } from '../recaptcha/recaptcha.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Post('send-mail')
  @UseGuards(RecaptchaGuard)
  sendMail(
    @Body()
    { options }: { recaptchaToken: string; options: ISendMailOptions }
  ): Promise<unknown> {
    return this.appService.sendMail(options);
  }
}
