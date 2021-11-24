import { InjectionToken } from '@angular/core';
import { FirebaseOptions } from 'firebase/app';

export interface AppConfig {
  title?: string;
  firebase?: FirebaseOptions;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
