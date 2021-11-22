import { CONFIG } from './config';
import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  const mockConfig = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CONFIG,
          useValue: mockConfig,
        },
      ],
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
