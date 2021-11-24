import { InjectionToken } from '@angular/core';
import { FirebaseOptions } from 'firebase/app';

export interface AppConfig {
  title?: string;
  firebase?: FirebaseOptions;
  // {
  //   apiKey: string;
  //   authDomain: string;
  //   databaseURL?: string;
  //   projectId: string;
  //   storageBucket?: string;
  //   messagingSenderId?: string;
  //   appId?: string;
  //   measurementId?: string;
  // };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
