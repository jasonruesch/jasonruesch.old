import { delay, lastValueFrom, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import useSWR from 'swr';
import { Bill } from './bill.model';

// export const fetcher = (url: string) => fetch(url).then((res) => res.json());
const fetcher = async (url) => {
  const request$ = fromFetch<Bill[]>(url, {
    selector: (res) => res.json(),
  });

  return await lastValueFrom(request$.pipe(delay(500)));
};

export const useBills = () => {
  const { data, error, isLoading, mutate } = useSWR<Bill[]>(
    '/api/bills',
    fetcher,
    {
      // fallbackData: [],
      // keepPreviousData: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const getBill = async (id: string) => {
    try {
      const bill = data.find((b) => b.id === id);
      if (bill) {
        return bill;
      }

      const request$ = fromFetch<Bill>(`/api/bills/${id}`, {
        selector: (res) => res.json(),
      });

      return await lastValueFrom(request$);
    } catch (error) {
      console.error(error);
    }
  };

  const addBill = async (bill: Partial<Bill>) => {
    try {
      mutate(
        async (bills) => {
          const request$ = fromFetch<Bill>('/api/bills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bill),
            selector: (res) => res.json(),
          });

          const addedBill = await lastValueFrom(request$);
          return [...bills, addedBill];
        },
        { revalidate: false }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateBill = async (bill: Bill) => {
    try {
      mutate(
        async (bills) => {
          const request$ = fromFetch<Bill>(`/api/bills/${bill.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bill),
            selector: (res) => res.json(),
          });

          const updatedBill = await lastValueFrom(request$);
          const filteredBills = bills.filter((b) => b.id !== bill.id);
          return [...filteredBills, updatedBill];
        },
        { revalidate: false }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBill = async (id: string) => {
    try {
      mutate(
        async (bills) => {
          const request$ = fromFetch<void>(`/api/bills/${id}`, {
            method: 'DELETE',
            selector: () => of(undefined),
          });

          await lastValueFrom(request$);
          const filteredBills = bills.filter((b) => b.id !== id);
          return [...filteredBills];
        },
        { revalidate: false }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    bills: data,
    isLoading,
    isError: !!error,
    getBill,
    addBill,
    updateBill,
    deleteBill,
  };
};

export default useBills;
