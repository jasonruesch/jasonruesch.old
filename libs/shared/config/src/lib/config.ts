import { InjectionToken } from '@angular/core';

export interface Config {
  title?: string;
  firebase?: {
    projectId: string;
    appId?: string;
    databaseURL?: string;
    storageBucket?: string;
    locationId?: string;
    apiKey?: string;
    authDomain?: string;
    messagingSenderId?: string;
    measurementId?: string;
  };
}

export const CONFIG = new InjectionToken<Config>('APP_CONFIG');
