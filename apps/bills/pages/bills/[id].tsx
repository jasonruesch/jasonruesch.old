import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BillForm from '../../components/BillForm';
import useBills from '../../lib/use-bills';

export function EditBill() {
  const router = useRouter();
  const { getBill, updateBill } = useBills();
  const id = router.query.id as string;
  const [bill, setBill] = useState(null);

  useEffect(() => {
    getBill(id).then((bill) => {
      setBill(bill);
    });
  }, [getBill, id]);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="p-4 max-w-lg w-full">
        {bill && <BillForm onSave={updateBill} bill={bill} />}
      </div>
    </div>
  );
}

export default EditBill;
