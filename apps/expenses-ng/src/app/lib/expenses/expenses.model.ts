import { Expense } from '@jasonruesch/api-interfaces';
import { StoreState } from '@jasonruesch/shared/reactive-state';

/**
 * Uniquely identify Expense in *ngFor loops
 */
export const trackByID = (m: Expense) => m.id;

/**
 * This state is serializable
 */
export interface ExpenseState extends StoreState {
  expenses: Expense[];
}

export function initState(): ExpenseState {
  return {
    expenses: [],
  };
}
