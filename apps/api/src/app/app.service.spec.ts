import { MailerService } from '@nestjs-modules/mailer';
import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  const mockMailerService = {};

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
