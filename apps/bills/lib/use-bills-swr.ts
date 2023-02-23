import { delay, lastValueFrom, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import useSWR from 'swr';
import { Bill } from './bill.model';

const fetcher = async (url) => {
  const request$ = fromFetch<Bill[]>(url, {
    selector: (res) => res.json(),
  });

  return await lastValueFrom(request$.pipe(delay(500)));
};

export const useBillsSWR = () => {
  const {
    data: bills,
    error,
    isLoading,
    mutate,
  } = useSWR<Bill[]>('/api/bills', fetcher, { fallbackData: [] });

  const onSave = async (bill: Partial<Bill>) => {
    try {
      const url = bill.id ? `/api/bills/${bill.id}` : '/api/bills';
      const request$ = fromFetch<Bill>(url, {
        method: bill.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bill),
        selector: (res) => res.json(),
      });

      await lastValueFrom(request$);
      await mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      const request$ = fromFetch<string>(`/api/bills/${id}`, {
        method: 'DELETE',
        selector: () => of(id),
      });

      await lastValueFrom(request$);
      await mutate();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    bills,
    error,
    isLoading,
    onSave,
    onDelete,
  };
};

export default useBillsSWR;
