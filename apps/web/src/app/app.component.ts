import { Component, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@jasonruesch/api-interfaces';
import pkg from '../../../../package.json';
import { ConfigService } from '@jasonruesch/shared/config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'jr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('[attr.jr-version]') version = pkg?.version;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private title: Title
  ) {
    // Test the API
    this.http.get<Message>('/api/hello').subscribe(console.log);

    // Set the title to environment if not production
    if (
      this.configService.config.environmentName.toLowerCase() !== 'production'
    ) {
      this.title.setTitle(this.configService.config.environmentName);
    }
  }
}
