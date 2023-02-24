/* eslint-disable @next/next/no-img-element */
import { PlusIcon } from '@heroicons/react/20/solid';
import { HashtagIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import BillList from '../components/BillList';
import BillListSkeleton from '../components/BillListSkeleton';
import Layout from '../components/Layout';
import { OverviewCards } from '../components/OverviewCards';
import { OverviewCardsSkeleton } from '../components/OverviewCardsSkeleton';
import { BillType } from '../lib/bill.model';
import { useBillStore } from '../lib/bills.store';
import useFilters from '../lib/use-filters';
import { toCurrency } from '../lib/utils';

export function Index() {
  const { data: session } = useSession();
  const { bills, isLoading, hasError, remove } = useBillStore();
  const { filters, query, onFiltersChange } = useFilters();

  const cards = [
    {
      name: 'Number of Bills',
      icon: HashtagIcon,
      value: (
        <dl className="grid grid-cols-2 py-1">
          <dt className="text-sm">Monthly:</dt>
          <dd className="leading-5">
            {bills?.filter((b) => b.type === BillType.MONTHLY).length}
          </dd>
          <dt className="text-sm">Yearly:</dt>
          <dd className="leading-5">
            {bills?.filter((b) => b.type === BillType.YEARLY).length}
          </dd>
        </dl>
      ),
    },
    {
      name: 'Total Amount',
      icon: ScaleIcon,
      value: toCurrency(bills?.reduce((acc, { amount }) => acc + amount, 0)),
    },
    {
      name: 'Total Balance',
      icon: ScaleIcon,
      value: toCurrency(bills?.reduce((acc, { balance }) => acc + balance, 0)),
    },
  ];

  const [greeting, setGreeting] = useState('Good morning');
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const greeting =
      hours < 12
        ? 'Good morning'
        : hours < 18
        ? 'Good afternoon'
        : 'Good evening';
    setGreeting(greeting);
  }, []);

  return (
    <Layout>
      <>
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                  {session?.user.image && (
                    <img
                      className="mr-3 hidden h-16 w-16 rounded-full sm:block"
                      src={session?.user.image}
                      alt=""
                    />
                  )}
                  <div>
                    <div className="flex items-center">
                      {session?.user.image && (
                        <img
                          className="mr-3 h-16 w-16 rounded-full sm:hidden"
                          src={session?.user.image}
                          alt=""
                        />
                      )}
                      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        {greeting}, {session?.user.name || 'Anonymous User'}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <Link
                  href={`/bills/new${query}`}
                  className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  <PlusIcon className="h-3.5 w-3.5 mr-2" aria-hidden="true" />
                  Add bill
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Cards */}
              {isLoading ? (
                <OverviewCardsSkeleton />
              ) : (
                <OverviewCards cards={cards} />
              )}
            </div>
          </div>

          <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
            Bills
          </h2>

          {hasError ? (
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mt-2 flex flex-col">
                <p>An unexpected error occurred.</p>
              </div>
            </div>
          ) : isLoading ? (
            <BillListSkeleton />
          ) : bills?.length ? (
            <BillList
              bills={bills}
              filters={filters}
              onFiltersChange={onFiltersChange}
              onDelete={remove}
            />
          ) : (
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mt-2 flex flex-col">
                <p>You have no bills. Add one above to get started.</p>
              </div>
            </div>
          )}
        </div>
      </>
    </Layout>
  );
}

export default Index;
