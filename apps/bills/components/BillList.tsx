/* eslint-disable @next/next/no-img-element */
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import {
  BanknotesIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { Bill, BillType } from '../lib/bill.model';
import useBills from '../lib/useBills';
import useSortableData from '../lib/useSortableData';
import { toCurrency, toOrdinalString } from '../lib/utils';

export function BillList() {
  const { bills: data, deleteBill } = useBills();
  const {
    items: bills,
    handleSort,
    sortConfig: { key: sortKey, direction: sortDirection },
  } = useSortableData<Bill>(
    data,
    {
      key: 'name',
      direction: 'ascending',
    },
    {
      // dueDate: type === BillType.MONTHLY ? 'number' : 'date',
    }
  );

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
          You have no bills. Add one above to get started.
        </p>
      )}

      {/* Bill table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            {bills?.length ? (
              <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4 text-gray-900 border-b border-gray-200 bg-white">
                  <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                      <label htmlFor="simple-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          type="text"
                          id="simple-search"
                          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                          placeholder="Search"
                          required
                        />
                      </div>
                    </form>
                  </div>
                  <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <Link
                      href="/bills/new"
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
                    >
                      <svg
                        className="h-3.5 w-3.5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        />
                      </svg>
                      Add bill
                    </Link>
                    <div className="flex items-center w-full space-x-3 md:w-auto">
                      <button
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        type="button"
                      >
                        <svg
                          className="-ml-1 mr-1.5 w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          />
                        </svg>
                        Actions
                      </button>
                      <button
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="w-4 h-4 mr-2 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Filter
                        <svg
                          className="-mr-1 ml-1.5 w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        <button
                          type="button"
                          onClick={() => handleSort('name')}
                          className="group inline-flex"
                        >
                          Name
                          <span
                            className={clsx(
                              'ml-2 flex-none rounded text-gray-900',
                              sortKey === 'name'
                                ? 'bg-gray-100 group-hover:bg-gray-200'
                                : 'invisible text-gray-400 group-hover:visible group-focus:visible'
                            )}
                          >
                            {sortKey === 'name' &&
                            sortDirection === 'descending' ? (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </button>
                      </th>
                      <th
                        className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        <button
                          type="button"
                          onClick={() => handleSort('amount')}
                          className="group inline-flex"
                        >
                          <span
                            className={clsx(
                              'ml-2 flex-none rounded text-gray-900',
                              sortKey === 'amount'
                                ? 'bg-gray-100 group-hover:bg-gray-200'
                                : 'invisible text-gray-400 group-hover:visible group-focus:visible'
                            )}
                          >
                            {sortKey === 'amount' &&
                            sortDirection === 'descending' ? (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
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
                          onClick={() => handleSort('dueDate')}
                          className="group inline-flex"
                        >
                          <span
                            className={clsx(
                              'ml-2 flex-none rounded text-gray-900',
                              sortKey === 'dueDate'
                                ? 'bg-gray-100 group-hover:bg-gray-200'
                                : 'invisible text-gray-400 group-hover:visible group-focus:visible'
                            )}
                          >
                            {sortKey === 'dueDate' &&
                            sortDirection === 'descending' ? (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
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
                          onClick={() => handleSort('autoPaid')}
                          className="group inline-flex"
                        >
                          <span
                            className={clsx(
                              'ml-2 flex-none rounded text-gray-900',
                              sortKey === 'autoPaid'
                                ? 'bg-gray-100 group-hover:bg-gray-200'
                                : 'invisible text-gray-400 group-hover:visible group-focus:visible'
                            )}
                          >
                            {sortKey === 'autoPaid' &&
                            sortDirection === 'descending' ? (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
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
                          onClick={() => handleSort('balance')}
                          className="group inline-flex"
                        >
                          <span
                            className={clsx(
                              'ml-2 flex-none rounded text-gray-900',
                              sortKey === 'balance'
                                ? 'bg-gray-100 group-hover:bg-gray-200'
                                : 'invisible text-gray-400 group-hover:visible group-focus:visible'
                            )}
                          >
                            {sortKey === 'balance' &&
                            sortDirection === 'descending' ? (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
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
                            checked={bill.autoPaid}
                            disabled
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          {toCurrency(bill.balance)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <Link
                            href={`/bills/${bill.id}`}
                            className="text-cyan-600 hover:text-cyan-700"
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
              <p>You have no bills. Add one above to get started.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BillList;
