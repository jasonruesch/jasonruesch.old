import { Component, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@jasonruesch/api-interfaces';
import pkg from '../../../../package.json';

@Component({
  selector: 'jr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('[attr.jr-version]') version = `v${pkg.version}`;

  hello$ = this.http.get<Message>('/api/hello');

  constructor(private http: HttpClient) {}
}
