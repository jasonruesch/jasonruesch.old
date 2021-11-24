import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from './config';

@Injectable()
export class ConfigService {
  constructor(@Inject(APP_CONFIG) public config: AppConfig) {}
}
