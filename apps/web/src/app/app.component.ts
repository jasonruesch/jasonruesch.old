import { Component, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@jasonruesch/api-interfaces';
import { ConfigService } from '@jasonruesch/shared/config';
import { Title } from '@angular/platform-browser';
import { environment } from '@jasonruesch/shared/environment';

@Component({
  selector: 'jr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('[attr.jr-version]') version =
    this.configService.config?.version;

  private config = this.configService.config;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private title: Title
  ) {
    // Test the API
    this.http.get<Message>('/api/hello').subscribe(console.log);

    // Set the title from the config, if provided
    if (this.config.title) {
      this.title.setTitle(this.config.title);
    }

    if (environment.production) {
      this.initializeAnalytics();
    }
  }

  initializeAnalytics() {
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.firebase?.measurementId}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).dataLayer = (window as any).dataLayer || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function gtag(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', this.config.firebase?.measurementId);
  }
}
