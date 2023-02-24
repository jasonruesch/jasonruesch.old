/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import {
  BanknotesIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

import { Bill, BillType } from '../lib/bill.model';
import useSortableData from '../lib/use-sortable-data';
import { toCurrency, toOrdinalString } from '../lib/utils';

const billTypes = [
  { id: BillType.MONTHLY, title: 'Monthly' },
  { id: BillType.YEARLY, title: 'Yearly' },
];

const filters = [
  { id: 'all', title: 'All' },
  { id: 'auto-paid', title: 'Auto-paid' },
  { id: 'has-balance', title: 'Has Balance' },
];

export interface BillListProps {
  bills: Bill[];
  filters: {
    type: BillType;
    filter: string;
  };
  onFiltersChange: (filters: { type: BillType; filter: string }) => void;
  onDelete: (bill: Bill) => void;
}

export function BillList({
  bills: initialValues,
  filters: filterParams,
  onFiltersChange,
  onDelete,
}: BillListProps) {
  const { type, filter } = filterParams;

  // Filter bill type
  const data = initialValues.filter((bill) => bill.type === type);

  // Sort bills
  const {
    items,
    handleSort,
    sortConfig: { key: sortKey, direction: sortDirection },
  } = useSortableData<Bill>(
    data,
    {
      key: 'name',
      direction: 'ascending',
    },
    {
      dueDate: type === BillType.MONTHLY ? 'number' : 'date',
    }
  );

  // Filter bills
  const filterBills = (bill: Bill) => {
    switch (filter) {
      case 'auto-paid':
        return bill.autoPaid;
      case 'has-balance':
        return !!bill.balance;
      default:
        return true;
    }
  };

  const bills = items.filter(filterBills);

  const handleTypeChange = (type: BillType) => {
    onFiltersChange({ ...filterParams, type });
  };

  const handleFilterChange = (filter: string) => {
    onFiltersChange({ ...filterParams, filter });
  };

  const handleDeleteBill = (bill: Bill) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      onDelete(bill);
    }
  };

  return (
    <>
      {/* Bill list (smallest breakpoint only) */}
      <div className="sm:hidden">
        {bills?.length ? (
          <div className="shadow">
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
          <p className="p-4">No bills found.</p>
        )}
      </div>

      {/* Bill table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4 text-gray-900 border-b border-gray-200 bg-white">
                <form className="flex items-center whitespace-nowrap w-full justify-between">
                  <fieldset>
                    <legend className="sr-only">Bill type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
                      {billTypes.map((t) => (
                        <div key={t.id} className="flex items-center">
                          <input
                            type="radio"
                            id={t.id}
                            name="bill-type"
                            className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-500"
                            defaultChecked={t.id === type}
                            onChange={() => handleTypeChange(t.id)}
                          />
                          <label
                            htmlFor={t.id}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {t.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <div className="flex items-center">
                    <label htmlFor="filter" className="mx-4">
                      Show only:
                    </label>
                    <fieldset>
                      <legend className="sr-only">Filter</legend>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
                        {filters.map((f) => (
                          <div key={f.id} className="flex items-center">
                            <input
                              type="radio"
                              id={f.id}
                              name="filter"
                              className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-500"
                              defaultChecked={f.id === filter}
                              onChange={() => handleFilterChange(f.id)}
                            />
                            <label
                              htmlFor={f.id}
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              {f.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>

              {bills?.length ? (
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
                              'mr-2 flex-none rounded text-gray-900',
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
                              'mr-2 flex-none rounded text-gray-900',
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
                              'mr-2 flex-none rounded text-gray-900',
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
                              'mr-2 flex-none rounded text-gray-900',
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
                            <PencilSquareIcon
                              className="h-5 w-5 inline"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Edit, {bill.name}</span>
                          </Link>
                          <button
                            type="button"
                            className="ml-3 text-red-400 hover:text-red-600"
                            onClick={() => handleDeleteBill(bill)}
                          >
                            <TrashIcon
                              className="h-5 w-5 inline"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Delete, {bill.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-6 py-3">No bills found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillList;
