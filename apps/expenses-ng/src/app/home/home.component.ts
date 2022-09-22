import { Component } from '@angular/core';
import { Expense } from '@jasonruesch/api-interfaces';
import { ExpenseService } from '../lib/expense.service';

@Component({
  selector: 'jr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  expenses$ = this.api.loadExpenses();

  constructor(private api: ExpenseService) {}

  calculateTotalAmount(expenses: Expense[]) {
    return expenses.reduce((acc, cur) => acc + cur.amount, 0);
  }

  handleItemSelected(expense: Expense) {
    console.log(expense.name);
  }
}
