import { Component } from '@angular/core';
import { Expense } from '@jasonruesch/api-interfaces';
import { ExpensesFacade } from '../lib/expenses/expenses.facade';

@Component({
  selector: 'jr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  vm$ = this.facade.vm$;
  showSkeleton$ = this.facade.showSkeleton$;

  constructor(private facade: ExpensesFacade) {}

  calculateTotalAmount(expenses: Expense[]) {
    return expenses.reduce((acc, cur) => acc + cur.amount, 0);
  }

  handleItemSelected(expense: Expense) {
    console.log(expense.name);
  }
}
