import { useObservable } from '@ngneat/react-rxjs';
import {
  addBill,
  billsDataSource,
  deleteBill,
  getBill,
  updateBill,
} from './bills.facade';

export const useBills = () => {
  const [{ bills, error, loading }] = useObservable(billsDataSource);

  return {
    bills,
    error,
    loading,
    addBill,
    deleteBill,
    getBill,
    updateBill,
  };
};

export default useBills;
