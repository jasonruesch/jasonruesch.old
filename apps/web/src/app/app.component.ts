import { Component, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@jasonruesch/api-interfaces';
import pkg from '../../../../package.json';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'jr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('[attr.jr-version]') version = pkg?.version;

  constructor(private http: HttpClient, updates: SwUpdate) {
    // Test the API
    this.http.get<Message>('/api/hello').subscribe(console.log);

    updates.available.subscribe((event) => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      updates.activateUpdate().then(() => document.location.reload());
    });
    updates.activated.subscribe((event) => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}
