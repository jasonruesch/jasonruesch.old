import { createStore } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  setEntities,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import {
  createRequestDataSource,
  withRequestsStatus,
} from '@ngneat/elf-requests';
import { delay, Observable, tap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { Bill } from './bill.model';

const store = createStore(
  { name: 'bills' },
  withEntities<Bill>(),
  withRequestsStatus()
);

const { setSuccess, trackRequestStatus, data$ } = createRequestDataSource({
  data$: () => store.pipe(selectAllEntities()),
  requestKey: 'bills',
  dataKey: 'bills',
  store,
});

export const billsDataSource = data$();

function setBills(bills: Bill[]) {
  if (!bills || !bills.length) return;

  store.update(setEntities(bills), setSuccess());
}

function addBill(bill: Bill) {
  if (!bill) return;

  store.update(addEntities(bill), setSuccess());
}

function updateBillById(bill: Bill) {
  if (!bill) return;

  store.update(updateEntities(bill.id, bill), setSuccess());
}

export const fethBills = (): Observable<Bill[]> => {
  const request$ = fromFetch<Bill[]>('/api/bills', {
    selector: (res) => res.json(),
  });

  return request$.pipe(delay(500), trackRequestStatus(), tap(setBills));
};

export const createBill = (bill: Bill): Observable<Bill> => {
  const request$ = fromFetch<Bill>('/api/bills', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bill),
    selector: (res) => res.json(),
  });

  return request$.pipe(tap(addBill));
};

export const updateBill = (bill: Bill): Observable<Bill> => {
  const request$ = fromFetch<Bill>(`/api/bills/${bill.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bill),
    selector: (res) => res.json(),
  });

  return request$.pipe(tap(updateBillById));
};
