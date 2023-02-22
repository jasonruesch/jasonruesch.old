/* eslint-disable @next/next/no-img-element */
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import {
  ArrowUpOnSquareStackIcon,
  BanknotesIcon,
  Bars3CenterLeftIcon,
  CogIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

const navigation = [
  { name: 'Bills', href: '/', icon: BanknotesIcon },
  {
    name: 'Upload bills',
    href: '/bills/upload',
    icon: ArrowUpOnSquareStackIcon,
  },
];
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="grid h-screen place-content-center">Loading...</div>;
  }

  if (!session) {
    router.push('/api/auth/signin');
    return;
  }

  const isCurrentPage = (href: string) => {
    return router.asPath === href;
  };

  return (
    <div className="min-h-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <Link href="/">
                    <CurrencyDollarIcon className="h-8 w-8 text-white" />
                  </Link>
                </div>
                <nav
                  className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          isCurrentPage(item.href)
                            ? 'bg-cyan-800 text-white'
                            : 'text-cyan-100 hover:bg-cyan-600 hover:text-white',
                          'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                        )}
                        aria-current={
                          isCurrentPage(item.href) ? 'page' : undefined
                        }
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6">
                    <div className="space-y-1 px-2">
                      {secondaryNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white"
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 text-cyan-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <Link href="/">
              <CurrencyDollarIcon className="h-8 w-8 text-white" />
            </Link>
          </div>
          <nav
            className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    isCurrentPage(item.href)
                      ? 'bg-cyan-800 text-white'
                      : 'text-cyan-100 hover:bg-cyan-600 hover:text-white',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6'
                  )}
                  aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                >
                  <item.icon
                    className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6">
              <div className="space-y-1 px-2">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white"
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            {/* Search bar */}
            <div className="flex flex-1">
              <form className="flex w-full md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                  >
                    <MagnifyingGlassIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search-field"
                    name="search-field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Search bills"
                    type="search"
                  />
                </div>
              </form>
            </div>

            {/* Profile dropdown */}
            <div className="ml-4 flex items-center md:ml-6">
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                    {session?.user.image && (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={session.user.image}
                        alt=""
                      />
                    )}
                    <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                      <span className="sr-only">Open user menu for </span>
                      {session?.user.name || 'Anonymous User'}
                    </span>
                    <ChevronDownIcon
                      className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={clsx(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={clsx(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={clsx(
                            active ? 'bg-gray-100' : '',
                            'block w-full px-4 py-2 text-left text-sm text-gray-700'
                          )}
                          onClick={() => signOut()}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1 pb-8">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
