import { createStore } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getEntity,
  selectAllEntities,
  setEntities,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import {
  createRequestDataSource,
  withRequestsStatus,
} from '@ngneat/elf-requests';
import { delay, lastValueFrom, map, of, tap } from 'rxjs';
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

export const getBills = async (): Promise<Bill[]> => {
  const updateStore = (bills: Bill[]) => {
    store.update(setEntities(bills), setSuccess());
  };

  const request$ = fromFetch<Bill[]>('/api/bills', {
    selector: (res) => res.json(),
  });

  return await lastValueFrom(
    request$.pipe(delay(500), trackRequestStatus(), tap(updateStore))
  );
};

export const getBill = async (id: string): Promise<Bill> => {
  const bill = store.query(getEntity(id));

  const request$ = fromFetch<Bill>(`/api/bills/${id}`, {
    selector: (res) => res.json(),
  });

  return bill ? bill : id ? await lastValueFrom(request$) : null;
};

export const addBill = async (bill: Partial<Bill>): Promise<Bill> => {
  const updateStore = (bill: Bill) => {
    store.update(addEntities(bill));
  };

  const request$ = fromFetch<Bill>('/api/bills', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bill),
    selector: (res) => res.json(),
  });

  return await lastValueFrom(request$.pipe(tap(updateStore)));
};

export const updateBill = async (bill: Bill): Promise<Bill> => {
  const updateStore = (bill: Bill) => {
    store.update(updateEntities(bill.id, bill));
  };

  const request$ = fromFetch<Bill>(`/api/bills/${bill.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bill),
    selector: (res) => res.json(),
  });

  return await lastValueFrom(request$.pipe(tap(updateStore)));
};

export const deleteBill = async (id: string): Promise<void> => {
  const updateStore = (id: string) => {
    store.update(deleteEntities(id));
  };

  const request$ = fromFetch<string>(`/api/bills/${id}`, {
    method: 'DELETE',
    selector: () => of(id),
  });

  return await lastValueFrom(request$.pipe(map(updateStore)));
};
