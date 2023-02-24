import { catchError, delay, lastValueFrom, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

import { Bill } from './bill.model';

const toJSON = (res) => res.json();
const reportError =
  <T>(response: T) =>
  (err) => {
    console.error(err);
    return of(response);
  };

/**
 * Bill DataService
 */
export const api = {
  /**
   * Load All Bills
   */
  loadAll: async (): Promise<Bill[]> => {
    const request$ = fromFetch<Bill[]>('/api/bills', {
      selector: toJSON,
    }).pipe(catchError(reportError([])));

    return lastValueFrom(request$.pipe(delay(500)));
  },
  /**
   * Load a specific Bill by id
   */
  load: async (id: string): Promise<Bill | null> => {
    const request$ = fromFetch<Bill>(`/api/bills/${id}`, {
      selector: toJSON,
    }).pipe(catchError(reportError(null)));

    return lastValueFrom(request$);
  },
  /**
   * Create a Bill
   */
  create: async (bill: Partial<Bill>) => {
    const request$ = fromFetch<Bill>('/api/bills', {
      selector: toJSON,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bill),
    }).pipe(catchError(reportError(null)));

    return lastValueFrom(request$);
  },
  /**
   * Update a Bill
   */
  update: async (bill: Bill) => {
    const request$ = fromFetch<Bill>(`/api/bills/${bill.id}`, {
      selector: toJSON,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bill),
    }).pipe(catchError(reportError(null)));

    return lastValueFrom(request$);
  },
  /**
   * Delete a Bill; report success or failure
   */
  delete: async ({ id }: Bill): Promise<boolean> => {
    const request$ = fromFetch<boolean>(`/api/bills/${id}`, {
      method: 'DELETE',
      selector: () => of(true),
    }).pipe(catchError(reportError(false)));

    return lastValueFrom(request$);
  },
};
