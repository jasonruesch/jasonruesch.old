import { Injectable } from '@angular/core';
import { Expense } from '@jasonruesch/api-interfaces';
import { readFirst, StatusState } from '@jasonruesch/shared/reactive-state';
import { map, Observable } from 'rxjs';
import { ExpensesDataService } from './expenses.data-service';
import { ExpenseState } from './expenses.model';
import { ExpensesStore } from './expenses.store';

@Injectable({ providedIn: 'root' })
export class ExpensesFacade {
  vm$: Observable<ExpenseState>;
  status$: Observable<StatusState>;
  isLoading$: Observable<boolean>;
  showSkeleton$: Observable<boolean>;

  constructor(
    private _store: ExpensesStore,
    private _api: ExpensesDataService
  ) {
    this.vm$ = this._store.expenses$.pipe(map((expenses) => ({ expenses })));
    this.status$ = this._store.status$;
    this.isLoading$ = this._store.isLoading$;
    this.showSkeleton$ = this._store.showSkeleton$;

    readFirst(this.loadExpenses());
  }

  loadExpenses(): Observable<Expense[]> {
    return new Observable((subscriber) => {
      this._api
        .loadExpenses()
        .pipe(this._store.trackLoadStatus())
        .subscribe({
          next: (expenses: Expense[]) => {
            this._store.updateExpenses(expenses);

            subscriber.next(expenses);
            subscriber.complete();
          },
          error: (error) => subscriber.error(error),
        });
    });
  }
}
