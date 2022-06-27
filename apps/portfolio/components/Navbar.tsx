import { Disclosure } from '@headlessui/react';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import ThemeSelector from './ThemeSelector';
import LogoImage from './LogoImage';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
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
      as="nav"
      className={({ open }) =>
        clsx(
          scrolled && !open
            ? 'bg-white/75 shadow backdrop-blur dark:bg-neutral-900/75 dark:shadow-black/75'
            : '',
          open ? 'bg-white shadow dark:bg-neutral-900 dark:shadow-black' : '',
          'fixed top-0 z-40 w-full'
        )
      }
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen-lg px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <a className="flex items-center">
                      <LogoImage className="h-10 w-10 lg:mr-2" />
                      <span className="font-display hidden text-3xl font-bold lg:inline">
                        {/* bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent */}
                        Jason Ruesch
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:mx-6 sm:block">
                  <div className="h-full sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            route === item.href
                              ? 'border-primary'
                              : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-white',
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
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto">
                <ThemeSelector />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {({ close }) => (
              <div className="space-y-1 pt-2 pb-4">
                {navigation.map((item) => (
                  <Disclosure.Button key={item.name} as={Link} href={item.href}>
                    <a
                      className={clsx(
                        route === item.href
                          ? 'border-primary bg-cyan-100 text-cyan-700 dark:bg-violet-700 dark:text-violet-50'
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
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
