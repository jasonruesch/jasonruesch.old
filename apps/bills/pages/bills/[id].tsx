import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BillForm from '../../components/BillForm';
import Layout from '../../components/Layout';
import { Bill } from '../../lib/bill.model';
import useBills from '../../lib/use-bills';

export function EditBill() {
  const router = useRouter();
  const id = router.query.id as string;
  const { getBill, updateBill } = useBills();

  const [bill, setBill] = useState<Bill | null>(null);
  useEffect(() => {
    const fetchBill = async (id: string) => {
      const bill = await getBill(id);
      setBill(bill);
    };

    id && fetchBill(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      Edit bill
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {bill?.id ? (
        <BillForm onSave={updateBill} bill={bill} />
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 divide-y divide-gray-200">
          <div>
            <div>
              <p className="mt-1 text-sm text-gray-500">Bill was not found.</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default EditBill;
