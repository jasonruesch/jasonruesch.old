import { useObservable } from '@ngneat/react-rxjs';
import { useCallback, useEffect } from 'react';
import { billsDataSource, createBill, fethBills } from './bills.facade';

export const useBills = () => {
  const [{ bills, error, loading }] = useObservable(billsDataSource);

  const handleCreateBill = useCallback((bill) => {
    const subscription = createBill(bill).subscribe();

    return () => {
      console.log('unsubscribing createBill');
      return subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = fethBills().subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return { bills, error, loading, handleCreateBill };
};

export default useBills;
