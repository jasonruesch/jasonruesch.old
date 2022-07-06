import { Disclosure } from '@headlessui/react';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import ThemeSelector from './ThemeSelector';
import LogoImage from './LogoImage';
import NavMenu from './NavMenu';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export interface SecondaryNavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

export default function Navbar({
  className,
  secondaryNavigation,
  shouldShowSearch,
}: {
  className?: string;
  secondaryNavigation?: SecondaryNavigationItem[];
  shouldShowSearch?: boolean;
}) {
  const { route } = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Disclosure
      as="header"
      className={({ open }) =>
        clsx(
          open || scrolled
            ? 'bg-white/75 shadow backdrop-blur dark:bg-neutral-900/75 dark:shadow-black/75'
            : '',
          className
        )
      }
    >
      {({ open }) => (
        <>
          <div
            className={clsx(
              shouldShowSearch
                ? 'divide-y divide-neutral-300 dark:divide-neutral-600'
                : 'md:divide-y-0',
              secondaryNavigation
                ? 'md:divide-y md:divide-neutral-300 dark:md:divide-neutral-600'
                : ''
            )}
          >
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt1Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <a className="flex items-center">
                      <LogoImage className="h-10 w-10 lg:mr-2" />
                      <span className="font-display hidden text-3xl font-bold lg:inline">
                        {/* bg-gradient-to-r from-secondary-500 to-primary-500 dark:from-secondary-400 dark:to-primary-400 bg-clip-text text-transparent */}
                        Jason Ruesch
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="hidden md:mx-6 md:block">
                  <nav className="h-full md:flex md:space-x-8">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            route === item.href
                              ? 'border-primary-500 dark:border-primary-400'
                              : 'border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-white',
                            'inline-flex items-center border-b-2 px-1 pb-2 pt-3 text-sm font-medium'
                          )}
                          aria-current={
                            route === item.href ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>

              {shouldShowSearch && (
                <div className="mr-6 hidden flex-1 items-center justify-end px-2 md:flex">
                  <div className="w-full max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative focus-within:text-neutral-400">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon
                          className="h-5 w-5 text-neutral-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-400 block w-full rounded-md border border-neutral-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-neutral-500 focus:text-neutral-900 focus:placeholder-neutral-400 focus:outline-none focus:ring-1 dark:border-transparent dark:bg-neutral-700 dark:placeholder-neutral-400 dark:focus:border-white dark:focus:bg-white dark:focus:text-neutral-900 dark:focus:placeholder-neutral-500 dark:focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute inset-y-0 right-0 flex items-center space-x-2 md:static md:inset-auto">
                <ThemeSelector />
                <a
                  href="https://github.com/jasonruesch"
                  className="block rounded-md p-2 text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Jason Ruesch on GitHub</span>
                  <svg
                    viewBox="0 0 16 16"
                    className="h-6 w-6"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                <NavMenu className="hidden md:inline-block" />
              </div>
            </div>

            {secondaryNavigation && (
              <nav
                className="hidden h-14 space-x-8 overflow-auto md:flex md:items-center"
                aria-label="Secondary navigation"
              >
                {secondaryNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      item.current
                        ? 'bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-white'
                        : 'text-neutral-900 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-600 dark:hover:text-white',
                      'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            )}

            {shouldShowSearch && (
              <div className="flex h-14 items-center justify-center md:hidden">
                <div className="w-full max-w-lg">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative focus-within:text-neutral-400">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-400 block w-full rounded-md border border-neutral-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-neutral-500 focus:text-neutral-900 focus:placeholder-neutral-400 focus:outline-none focus:ring-1 dark:border-transparent dark:bg-neutral-700 dark:placeholder-neutral-400 dark:focus:border-white dark:focus:bg-white dark:focus:text-neutral-900 dark:focus:placeholder-neutral-500 dark:focus:ring-white sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Disclosure.Panel as="nav" className="md:hidden">
            {({ close }) => (
              <>
                <div className="space-y-1 pt-2 pb-4">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      href={item.href}
                    >
                      <a
                        className={clsx(
                          route === item.href
                            ? 'border-primary-500 dark:border-primary-400 bg-primary-100/75 text-primary-700 dark:bg-primary-700/75 dark:text-primary-50'
                            : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white',
                          'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                        )}
                        aria-current={route === item.href ? 'page' : undefined}
                        onClick={() => close()}
                      >
                        {item.name}
                      </a>
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button as={Link} href="/styleguide">
                    <a
                      className={clsx(
                        route === '/styleguide'
                          ? 'border-primary-500 dark:border-primary-400 bg-primary-100/75 text-primary-700 dark:bg-primary-700/75 dark:text-primary-50'
                          : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white',
                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                      )}
                      aria-current={
                        route === '/styleguide' ? 'page' : undefined
                      }
                      onClick={() => close()}
                    >
                      Style Guide
                    </a>
                  </Disclosure.Button>
                  <Disclosure.Button as={Link} href="/privacy">
                    <a
                      className={clsx(
                        route === '/privacy'
                          ? 'border-primary-500 dark:border-primary-400 bg-primary-100/75 text-primary-700 dark:bg-primary-700/75 dark:text-primary-50'
                          : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white',
                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                      )}
                      aria-current={route === '/privacy' ? 'page' : undefined}
                      onClick={() => close()}
                    >
                      Privacy
                    </a>
                  </Disclosure.Button>
                </div>
                {secondaryNavigation && (
                  <div className="border-t border-neutral-300 pt-4 pb-3 dark:border-neutral-600">
                    <div className="space-y-1 px-2">
                      {secondaryNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md py-2 px-3 text-base font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
