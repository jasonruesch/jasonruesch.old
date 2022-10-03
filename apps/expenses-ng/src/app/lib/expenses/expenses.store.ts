import { map, Observable, shareReplay } from 'rxjs';
import { upsertEntities } from '@ngneat/elf-entities';
import { Expense } from '@jasonruesch/api-interfaces';
import {
  ReactiveStore,
  readFirst,
  updateRequestStatus,
} from '@jasonruesch/shared/reactive-state';
import { ExpenseState, initState } from './expenses.model';
import { select, emitOnce } from '@ngneat/elf';
import { Injectable } from '@angular/core';

const EXPENSES = 'expenses';

@Injectable({ providedIn: 'root' })
export class ExpensesStore extends ReactiveStore<ExpenseState, Expense> {
  expenses$: Observable<Expense[]>;
  state$: Observable<ExpenseState>;

  constructor() {
    super(EXPENSES, initState);

    this.expenses$ = this._store.pipe<Expense[]>(
      select<ExpenseState, Expense[]>((state) => state.expenses)
    );
    this.state$ = this._store.pipe(
      map((state) => {
        const expenses = readFirst(this.expenses$);

        return { ...state, expenses };
      }),
      shareReplay({ refCount: true })
    );
  }

  updateExpenses(expenses: Expense[]) {
    emitOnce(() => {
      this._store.update(
        upsertEntities(expenses),
        updateRequestStatus(EXPENSES, 'success')
      );
    });
  }
}
