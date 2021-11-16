import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '@jasonruesch/shared/environment';
import { join } from 'path';
import * as functions from 'firebase-functions';

@Module({
  imports: [
    MailerModule.forRoot({
      ...functions.config().mail,
      preview: !environment.production,
      template: {
        dir: join(__dirname, 'assets/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
