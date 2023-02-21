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
    <div className="flex justify-center">
      <div className="p-4 max-w-lg w-full">
        <div className="px-6 lg:px-8">
          {/* Page Heading */}
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Edit bill</h1>
              <p className="mt-2 text-sm text-gray-700">
                Fill out the form below to edit this bill.
              </p>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {bill && <BillForm onSave={updateBill} bill={bill} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBill;
