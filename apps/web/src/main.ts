import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@jasonruesch/shared/environment';
import { APP_CONFIG, AppConfig } from '@jasonruesch/shared/config';
import pkg from '../../../package.json';

function configListener(this: XMLHttpRequest) {
  const config: AppConfig = JSON.parse(this.responseText);
  if (!config.version) {
    config.version = pkg.version;
  }

  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }])
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

const request = new XMLHttpRequest();
request.addEventListener('load', configListener);
request.addEventListener('error', (err) => console.error(err));
request.open('GET', './assets/config.json');
request.send();
