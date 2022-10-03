import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '@jasonruesch/api-interfaces';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesDataService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loadExpenses(): Observable<Expense[]> {
    return this.http
      .get<Expense[]>('/api/v1.0/expenses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.router.navigate(['login'], {
              queryParams: { redirect: this.route.snapshot.url },
            });
            return of([]);
          }
          throw err;
        })
      );
  }
}
