/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  BanknotesIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { BillType } from '../lib/bill.model';
import useBills from '../lib/use-bills';
import { toCurrency, toOrdinalString } from '../lib/utils';

export function BillList() {
  const { bills, deleteBill } = useBills();

  const handleDeleteBill = (id: string) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      deleteBill(id);
    }
  };

  return (
    <>
      {/* Bill list (smallest breakpoint only) */}
      {bills?.length ? (
        <div className="shadow sm:hidden">
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
          >
            {bills.map((bill) => (
              <li key={bill.id}>
                <Link
                  href={`/bills/${bill.id}`}
                  className="block w-full bg-white px-4 py-4 text-left hover:bg-gray-50"
                >
                  <span className="flex items-center space-x-4">
                    <span className="flex flex-1 space-x-2 truncate">
                      <BanknotesIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="flex flex-col truncate text-sm text-gray-500">
                        <span className="truncate">{bill.name}</span>
                        <span>
                          <span className="font-medium text-gray-900">
                            {toCurrency(bill.amount)}
                          </span>
                        </span>
                        <span>
                          <span className="font-medium text-gray-900">
                            Due on{' '}
                            {bill.type === BillType.YEARLY
                              ? `${bill.dueDate} every year`
                              : `the ${toOrdinalString(
                                  bill.dueDate
                                )} of every month`}
                          </span>
                        </span>
                      </span>
                    </span>
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="px-4 sm:hidden">
          {/* You have no {type.toLowerCase()} bills. Add one above to get
              started. */}
          You have no bills. Add one above to get started.
        </p>
      )}

      {/* Bill table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            {bills?.length ? (
              <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        <button
                          type="button"
                          // onClick={() => requestSort('name')}
                          className="group inline-flex"
                        >
                          Name
                          {/* {sortKey === 'name' && (
                                <ChevronUpDownIcon className="h-5 w-5" />
                              )} */}
                          {/* <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"> */}
                          <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      </th>
                      <th
                        className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        <button
                          type="button"
                          // onClick={() => requestSort('amount')}
                          className="group inline-flex"
                        >
                          {/* {sortKey === 'amount' && (
                                <ChevronUpDownIcon className="h-5 w-5" />
                              )} */}
                          {/* <span className="mr-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200"> */}
                          <span className="invisible mr-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                          Amount
                        </button>
                      </th>
                      <th
                        className="whitespace-nowrap bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        <button
                          type="button"
                          // onClick={() => requestSort('dueDate')}
                          className="group inline-flex"
                        >
                          {/* {sortKey === 'dueDate' && (
                                <ChevronUpDownIcon className="h-5 w-5" />
                              )} */}
                          {/* <span className="mr-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200"> */}
                          <span className="invisible mr-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                          Due Date
                        </button>
                      </th>
                      <th
                        className="whitespace-nowrap bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        <button
                          type="button"
                          // onClick={() => requestSort('autoPaid')}
                          className="group inline-flex"
                        >
                          {/* {sortKey === 'autoPaid' && (
                                <ChevronUpDownIcon className="h-5 w-5" />
                              )} */}
                          {/* <span className="mr-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200"> */}
                          <span className="invisible mr-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                          Auto-paid
                        </button>
                      </th>
                      <th
                        className="whitespace-nowrap bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        <button
                          type="button"
                          // onClick={() => requestSort('balance')}
                          className="group inline-flex"
                        >
                          {/* {sortKey === 'balance' && (
                                <ChevronUpDownIcon className="h-5 w-5" />
                              )} */}
                          {/* <span className="mr-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200"> */}
                          <span className="invisible mr-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                          Balance
                        </button>
                      </th>
                      <th
                        className="whitespace-nowrap bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 w-[52px]"
                        scope="col"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {bills.map((bill) => (
                      <tr key={bill.id} className="bg-white">
                        <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                          <div className="flex">
                            <Link
                              href={`/bills/${bill.id}`}
                              className="group inline-flex space-x-2 truncate text-sm"
                            >
                              <BanknotesIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <p className="truncate text-gray-500 group-hover:text-gray-900">
                                {bill.name}
                              </p>
                            </Link>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <span className="font-medium text-gray-900">
                            {toCurrency(bill.amount)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <span className="font-medium text-gray-900">
                            {bill.dueDate}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <input
                            id={`bill-${bill.id}`}
                            name={`bill-${bill.id}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                            // checked={bill.autoPaid}
                            disabled
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          {/* {toCurrency(bill.balance)} */}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <Link
                            href={`/bills/${bill.id}`}
                            className="text-cyan-400 hover:text-cyan-600"
                          >
                            <PencilSquareIcon className="h-5 w-5 inline" />
                            <span className="sr-only">Edit, {bill.name}</span>
                          </Link>
                          <button
                            type="button"
                            className="ml-3 text-red-400 hover:text-red-600"
                            onClick={() => handleDeleteBill(bill.id)}
                          >
                            <TrashIcon className="h-5 w-5 inline" />
                            <span className="sr-only">Delete, {bill.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>
                {/* You have no {type.toLowerCase()} bills. Add one above to get
                    started. */}
                You have no bills. Add one above to get started.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BillList;
