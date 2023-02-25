import useSWR from 'swr';

import { Bill } from './bill.model';
import { api } from './bills.api';

export const useBills = () => {
  const { data, error, isLoading, mutate } = useSWR<Bill[]>(
    '/api/bills',
    api.getAll,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const getBill = async (id: string) => {
    const bill = data?.find((b) => b.id === id);

    return bill || (await api.get(id));
  };

  const addBill = async (bill: Partial<Bill>) => {
    mutate(
      async (bills) => {
        const addedBill = await api.create(bill);

        return [...bills, addedBill];
      },
      { revalidate: false }
    );
  };

  const updateBill = async (bill: Bill) => {
    mutate(
      async (bills) => {
        const updatedBill = await api.update(bill);
        const filteredBills = bills.filter((b) => b.id !== bill.id);

        return [...filteredBills, updatedBill];
      },
      { revalidate: false }
    );
  };

  const deleteBill = async (bill: Bill) => {
    mutate(
      async (bills) => {
        const success = await api.delete(bill);
        const filteredBills = success
          ? bills.filter((b) => b.id !== bill.id)
          : bills;

        return [...filteredBills];
      },
      { revalidate: false }
    );
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
