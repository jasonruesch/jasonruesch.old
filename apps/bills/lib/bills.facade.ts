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
  updateRequestStatus,
  withRequestsStatus,
} from '@ngneat/elf-requests';
import { delay, lastValueFrom, map, of, tap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { Bill } from './bill.model';

export type BillStore = ReturnType<typeof createBillStore>;

export const createBillStore = () => {
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
    idleAsPending: true,
  });

  const getBills = async (): Promise<Bill[]> => {
    store.update(updateRequestStatus('bills', 'pending'));

    const updateStore = (bills: Bill[]) => {
      store.update(setEntities(bills), setSuccess());
    };

    const request$ = fromFetch<Bill[]>('/api/bills', {
      selector: (res) => res.json(),
    });

    return await lastValueFrom(
      request$.pipe(trackRequestStatus(), delay(500), tap(updateStore))
    );
  };

  const getBill = async (id: string): Promise<Bill> => {
    const bill = store.query(getEntity(id));

    const request$ = fromFetch<Bill>(`/api/bills/${id}`, {
      selector: (res) => res.json(),
    });

    return bill ? bill : id ? await lastValueFrom(request$) : null;
  };

  const addBill = async (bill: Partial<Bill>): Promise<Bill> => {
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

  const updateBill = async (bill: Bill): Promise<Bill> => {
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

  const deleteBill = async (id: string): Promise<void> => {
    const updateStore = (id: string) => {
      store.update(deleteEntities(id));
    };

    const request$ = fromFetch<string>(`/api/bills/${id}`, {
      method: 'DELETE',
      selector: () => of(id),
    });

    return await lastValueFrom(request$.pipe(map(updateStore)));
  };

  return {
    data: data$(),
    getBills,
    getBill,
    addBill,
    updateBill,
    deleteBill,
  };
};
