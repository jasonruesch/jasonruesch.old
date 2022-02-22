import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  const mockMailerService = {};

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
