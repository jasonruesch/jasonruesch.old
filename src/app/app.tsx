import { Disclosure } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Outlet } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

import { Background, Logo } from '../components';

export function App() {
  return (
    <>
      <Background />

      <Disclosure
        as="header"
        className={({ open }) =>
          clsx(
            'bg-gradient-to-b from-neutral-100 to-neutral-50/75 shadow-sm shadow-black/20 backdrop-blur-sm dark:from-neutral-800 dark:to-neutral-900/75 dark:shadow-black/50',
            open ? 'via-neutral-50/75 dark:via-neutral-900/75' : '',
            'fixed inset-x-0 top-0 z-20'
          )
        }
      >
        {({ open, close }) => (
          <>
            <div className="box-content flex h-12 items-center pt-safe px-safe-offset-4 sm:h-16 sm:px-safe-offset-8">
              <div className="flex-1 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center rounded-md p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars2Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex justify-center sm:flex-none sm:justify-start">
                <Link to="/">
                  <Logo className="h-8 w-8" />
                </Link>
              </div>

              <nav className="ml-6 hidden space-x-8 sm:block">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    clsx(
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                      isActive
                        ? 'border-cyan-500 text-neutral-900 dark:border-violet-400 dark:text-neutral-50'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200'
                    )
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/privacy"
                  className={({ isActive }) =>
                    clsx(
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                      isActive
                        ? 'border-cyan-500 text-neutral-900 dark:border-violet-400 dark:text-neutral-50'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200'
                    )
                  }
                >
                  Privacy
                </NavLink>
              </nav>

              <div className="flex-1 sm:flex-none"></div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <nav>
                <ul className="flex flex-col space-y-4">
                  <li>
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }: { isActive: boolean }) =>
                        clsx(
                          'block border-l-4 py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-400 dark:hover:text-neutral-50',
                          isActive
                            ? 'border-cyan-500 dark:border-violet-400'
                            : 'border-transparent'
                        )
                      }
                      onClick={() => close()}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/privacy"
                      className={({ isActive }: { isActive: boolean }) =>
                        clsx(
                          'block border-l-4 py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-400 dark:hover:text-neutral-50',
                          isActive
                            ? 'border-cyan-500 dark:border-violet-400'
                            : 'border-transparent'
                        )
                      }
                      onClick={() => close()}
                    >
                      Privacy
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main
        className={clsx(
          'bg-neutral-100 dark:bg-neutral-800',
          'relative z-10 grid min-h-full place-content-center pb-safe-offset-8 pt-safe-offset-20 px-safe-offset-4 supports-[-web-touch-callout:_none]:box-content sm:pt-safe-offset-24 sm:px-safe-offset-8'
        )}
      >
        <Outlet />
      </main>
    </>
  );
}

export default App;
