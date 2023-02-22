import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BillForm from '../../components/BillForm';
import Layout from '../../components/Layout';
import useBills from '../../lib/useBills';

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

      {bill && <BillForm onSave={updateBill} bill={bill} />}
    </Layout>
  );
}

export default EditBill;
