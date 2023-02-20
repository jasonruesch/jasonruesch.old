import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useBills from '../lib/use-bills';
import { toCurrency } from '../lib/utils';

export function Index() {
  const { bills, loading, error, handleCreateBill } = useBills();

  return (
    <div className="px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Bills</h1>
          <p className="mt-2 text-sm text-gray-700">
            This is a list of all your bills. You can edit or delete them.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() =>
              handleCreateBill({
                id: '',
                name: 'New Bill',
                amount: 100,
                dueDate: '2024-01-01',
              })
            }
          >
            Add bill
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {error ? (
              <p>An unexpected error occurred.</p>
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      <a href="#" className="group inline-flex">
                        Name
                        {/* <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"> */}
                        <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      <a href="#" className="group inline-flex">
                        {/* <span className="mr-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200"> */}
                        <span className="invisible mr-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                        Amount
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap pl-3 pr-6 sm:px-2 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      <a href="#" className="group inline-flex">
                        <span className="invisible mr-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                        Due Date
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="relative whitespace-nowrap py-3.5 pl-3 pr-6 sm:pr-0 hidden sm:table-cell"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bills.map((bill) => (
                    <tr key={bill.id}>
                      <td className="whitespace-nowrap py-2 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {bill.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900 text-right">
                        {toCurrency(bill.amount)}
                      </td>
                      <td className="whitespace-nowrap pl-3 pr-6 sm:px-2 py-2 text-sm text-gray-500 text-right">
                        {bill.dueDate}
                      </td>
                      <td className="relative whitespace-nowrap py-2 pl-3 pr-6 text-right text-sm font-medium sm:pr-0 hidden sm:table-cell">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {bill.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
