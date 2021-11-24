import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from './app-config';
import pkg from '../../../../../package.json';

@Injectable()
export class ConfigService {
  constructor(@Inject(APP_CONFIG) public config: AppConfig) {
    this.config.version = pkg.version;
  }
}
