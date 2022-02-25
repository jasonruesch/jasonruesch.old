import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  const mockAppService = {
    getData: jest.fn().mockReturnValue({ message: 'Test message' }),
    sendMail: jest.fn(),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Test message' });
    });

    it('should send an email', () => {
      const appController = app.get<AppController>(AppController);
      appController.sendMail({});
      expect(mockAppService.sendMail).toHaveBeenCalled();
    });
  });
});
