import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../lib/auth/auth.service';

@Component({
  selector: 'jr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: AuthService
  ) {}

  async handleLogin(e: Event) {
    e.preventDefault();

    const handleResponse = ({ accessToken }: { accessToken: string }) => {
      localStorage.setItem('token', accessToken);

      const redirect = this.route.snapshot.queryParams['redirect'];
      const url = redirect ? redirect : '/';
      this.router.navigateByUrl(url);
    };

    const request$ = this.api.login('user@test.tld', 'password');
    request$.subscribe(handleResponse);
  }
}
