import { useObservable } from '@ngneat/react-rxjs';
import { useEffect } from 'react';
import {
  billsDataSource,
  createBill,
  fethBills,
  updateBill,
} from './bills.facade';

export const useBills = () => {
  const [{ bills, error, loading }] = useObservable(billsDataSource);

  const handleCreateBill = (bill) => createBill(bill).subscribe();
  const handleUpdateBill = (bill) => updateBill(bill).subscribe();

  useEffect(() => {
    const subscription = fethBills().subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return { bills, error, loading, handleCreateBill, handleUpdateBill };
};

export default useBills;
