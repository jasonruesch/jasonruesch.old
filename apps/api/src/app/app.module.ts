import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import * as functions from 'firebase-functions';
import { HttpModule } from '@nestjs/axios';
// import { environment } from '@jasonruesch/shared/environment';

@Module({
  imports: [
    MailerModule.forRoot({
      ...functions.config().mail,
      // preview: !environment.production,
      template: {
        dir: join(__dirname, 'assets/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
