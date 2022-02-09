import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import '@angular/localize/init';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

  send(name: string, email: string, message: string): Observable<unknown> {
    return this.http.post<unknown>('/api/send-mail', {
      from: `"${name}" <${email}>`,
      subject: '[Jason Ruesch]' + $localize`Contact`,
      template: './assets/templates/contact.html',
      context: {
        name,
        email,
        message,
      },
    });
  }

  sendConfirmation(name: string, email: string): Observable<unknown> {
    return this.http.post<unknown>('/api/send-mail', {
      to: `"${name}" <${email}>`,
      subject: '[Jason Ruesch]' + $localize`Contact Confirmation`,
      template: './assets/templates/contact-confirmation.html',
      context: {
        name,
      },
    });
  }
}
