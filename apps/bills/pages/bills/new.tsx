import BillForm from '../../components/BillForm';
import Layout from '../../components/Layout';
import { useBillStore } from '../../lib/bills.store';

export function AddBill() {
  const { add } = useBillStore();

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
                      Create a bill
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BillForm onSave={add} />
    </Layout>
  );
}

export default AddBill;
