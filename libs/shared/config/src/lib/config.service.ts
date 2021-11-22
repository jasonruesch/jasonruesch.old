import { Inject, Injectable } from '@angular/core';
import { Config, CONFIG } from './config';

@Injectable()
export class ConfigService {
  constructor(@Inject(CONFIG) public config: Config) {}
}
