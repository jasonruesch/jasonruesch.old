import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@jasonruesch/shared/environment';
import { CONFIG, Config } from '@jasonruesch/shared/config';

function configListener(this: XMLHttpRequest) {
  const config: Config = JSON.parse(this.responseText);
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic([{ provide: CONFIG, useValue: config }])
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

const request = new XMLHttpRequest();
request.addEventListener('load', configListener);
request.addEventListener('error', (err) => console.error(err));
request.open(
  'GET',
  (environment.production ? '../' : './assets/') + 'config.json'
);
request.send();
