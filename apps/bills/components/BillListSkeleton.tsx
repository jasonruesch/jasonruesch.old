import { BanknotesIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function BillListSkeleton() {
  const items = Array.from({ length: 10 }, (_, i) => i);

  return (
    <>
      {/* Bill list (smallest breakpoint only) */}
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden animate-pulse"
        >
          {items.map((item) => (
            <li key={item}>
              <div className="block w-full bg-white px-4 py-4 text-left hover:bg-gray-50">
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <BanknotesIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col truncate text-sm text-gray-500">
                      <div className="truncate h-5 flex items-center">
                        <div className="h-3.5 w-64 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <span>
                        <div className="font-medium text-gray-900 h-5 flex items-center">
                          <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                      </span>
                      <span>
                        <div className="font-medium text-gray-900 h-5 flex items-center">
                          <div className="h-3.5 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                      </span>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bill table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 animate-pulse">
                <thead>
                  <tr>
                    <th
                      className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      <div className="h-5 flex items-center">
                        <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </th>
                    <th
                      className="bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900"
                      scope="col"
                      align="right"
                    >
                      <div className="h-5 flex items-center">
                        <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </th>
                    <th
                      className="whitespace-nowrap bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900"
                      scope="col"
                      align="right"
                    >
                      <div className="h-5 flex items-center">
                        <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </th>
                    <th
                      className="whitespace-nowrap bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900"
                      scope="col"
                      align="right"
                    >
                      <div className="h-5 flex items-center">
                        <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </th>
                    <th
                      className="whitespace-nowrap bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900"
                      scope="col"
                      align="right"
                    >
                      <div className="h-5 flex items-center">
                        <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </th>
                    <th
                      className="whitespace-nowrap bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900 w-[52px]"
                      scope="col"
                      align="right"
                    >
                      <div className="h-5 flex items-center">
                        <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700 sr-only"></div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {items.map((item) => (
                    <tr key={item} className="bg-white">
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="h-5 flex items-center">
                          <div className="h-3.5 w-64 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        align="right"
                      >
                        <div className="h-5 flex items-center justify-end">
                          <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        align="right"
                      >
                        <div className="h-5 flex items-center justify-end">
                          <div className="h-3.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        align="right"
                      >
                        <div className="h-5 flex items-center justify-end">
                          <div className="h-4 w-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                        </div>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        align="right"
                      >
                        <div className="h-5 flex items-center justify-end">
                          <div className="h-3.5 w-24 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        align="right"
                      >
                        <div className="h-5 flex items-center justify-end">
                          <div className="h-5 w-5 inline-block bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          <div className="h-5 w-5 inline-block ml-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillListSkeleton;
