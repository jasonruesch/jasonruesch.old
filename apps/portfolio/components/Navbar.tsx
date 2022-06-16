import { Disclosure } from '@headlessui/react';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Logo } from './Logo';
import { Mark } from './Mark';
import ThemeSelector from './ThemeSelector';

export const Navbar = () => {
  const { route } = useRouter();
  const isHome = route === '/';
  const isAbout = route === '/about';
  const isContact = route === '/contact';

  return (
    <Disclosure as="header" className="fixed top-0 w-full z-30">
      {({ open }) => (
        <div className={`${open ? 'bg-surface shadow' : 'bg-background'}`}>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className={`${
                    open ? 'focus:ring-on-surface' : 'focus:ring-on-background'
                  } inline-flex items-center justify-center p-2 rounded-md text-neutral focus:outline-none focus:ring-2 focus:ring-inset`}
                >
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
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Mark className="block lg:hidden h-8 w-auto" />
                  <Logo className="hidden lg:block h-8 w-auto" />
                </div>
                <nav className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                  <Link href="/">
                    <a
                      className={`inline-flex h-10 items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isHome
                          ? 'border-primary text-on-background'
                          : 'border-transparent hover:border-neutral text-neutral hover:text-on-background'
                      }`}
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/about">
                    <a
                      className={`inline-flex h-10 items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isAbout
                          ? 'border-primary text-on-background'
                          : 'border-transparent hover:border-neutral text-neutral hover:text-on-background'
                      }`}
                    >
                      About
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a
                      className={`inline-flex h-10 items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isContact
                          ? 'border-primary text-on-background'
                          : 'border-transparent hover:border-neutral text-neutral hover:text-on-background'
                      }`}
                    >
                      Contact
                    </a>
                  </Link>
                </nav>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ThemeSelector />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <nav className="pt-2 pb-4 space-y-1 px-2">
              <Disclosure.Button as={Link} href="/">
                <a
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isHome
                      ? 'border-primary text-on-background'
                      : 'border-transparent text-neutral hover:border-neutral hover:text-on-background'
                  }`}
                >
                  Home
                </a>
              </Disclosure.Button>
              <Disclosure.Button as={Link} href="/about">
                <a
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isAbout
                      ? 'border-primary text-on-background'
                      : 'border-transparent text-neutral hover:border-neutral hover:text-on-background'
                  }`}
                >
                  About
                </a>
              </Disclosure.Button>
              <Disclosure.Button as={Link} href="/contact">
                <a
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isContact
                      ? 'border-primary text-on-background'
                      : 'border-transparent text-neutral hover:border-neutral hover:text-on-background'
                  }`}
                >
                  Contact
                </a>
              </Disclosure.Button>
            </nav>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar;
