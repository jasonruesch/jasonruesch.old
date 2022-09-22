import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '@jasonruesch/api-interfaces';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  loadExpenses(): Observable<Expense[]> {
    return this.http
      .get<Expense[]>('/api/v1.0/expenses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }
}
