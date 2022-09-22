import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'jr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login'], {
      queryParams: { redirect: this.router.url },
    });
  }
}
