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

export default function Navbar({ className }: { className?: string }) {
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
          open || scrolled
            ? 'bg-white/75 shadow backdrop-blur dark:bg-neutral-900/75 dark:shadow-black/75'
            : '',
          className
        )
      }
    >
      {({ open }) => (
        <>
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuAlt1Icon className="block h-6 w-6" aria-hidden="true" />
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
                            : 'border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-white',
                          'inline-flex items-center border-b-2 px-1 pb-2 pt-3 text-sm font-medium'
                        )}
                        aria-current={route === item.href ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto">
              <Link href="/privacy-policy">
                <a
                  className={clsx(
                    route === '/privacy-policy'
                      ? 'border-primary'
                      : 'border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-white',
                    'hidden items-center border-b-2 px-1 pb-2 pt-3 text-sm font-medium sm:inline-flex'
                  )}
                  aria-current={
                    route === '/privacy-policy' ? 'page' : undefined
                  }
                >
                  Privacy Policy
                </a>
              </Link>
              <ThemeSelector className="ml-8 text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300" />
              <a
                href="https://github.com/jasonruesch"
                className="ml-2 block rounded-md p-2 text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300"
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
                          ? 'border-primary bg-cyan-100/75 text-cyan-700 dark:bg-violet-700/75 dark:text-violet-50'
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
                <Disclosure.Button as={Link} href="/privacy-policy">
                  <a
                    className={clsx(
                      route === '/privacy-policy'
                        ? 'border-primary bg-cyan-100/75 text-cyan-700 dark:bg-violet-700/75 dark:text-violet-50'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white',
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                    )}
                    aria-current={
                      route === '/privacy-policy' ? 'page' : undefined
                    }
                    onClick={() => close()}
                  >
                    Privacy Policy
                  </a>
                </Disclosure.Button>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
