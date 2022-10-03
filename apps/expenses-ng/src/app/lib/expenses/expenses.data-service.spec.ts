import { TestBed } from '@angular/core/testing';

import { ExpensesDataService } from './expenses.data-service';

describe('ExpenseService', () => {
  let service: ExpensesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
