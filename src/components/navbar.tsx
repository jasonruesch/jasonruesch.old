import { Disclosure } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { Page } from '../app/app';
import { isActive } from '../lib';
import { GitHubLink } from './github-link';
import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { ThemeSelector } from './theme-selector';

interface NavbarProps {
  className?: string;
  isScrolled?: boolean;
  pages: Map<string, Page>;
  onWillNavigate?: (page: Page) => void;
}

export function Navbar({
  className,
  isScrolled,
  pages,
  onWillNavigate,
}: NavbarProps) {
  const { pathname } = useLocation();

  const primaryNavItems = [...pages].filter(
    ([, page]) => page.type === 'primary'
  );

  const secondaryNavItems = [...pages].filter(
    ([, page]) => page.type === 'secondary'
  );

  return (
    <Disclosure
      as="nav"
      className={({ open }) =>
        clsx(
          open ? 'min-h-screen overflow-y-scroll' : '',
          isScrolled || open
            ? 'bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-50 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-900'
            : 'bg-neutral-100 dark:bg-neutral-800',
          'relative w-full',
          className
        )
      }
    >
      {({ open }) => (
        <>
          <div className="relative z-10 flex h-16 justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars2Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <NavLink
                  to="/"
                  onMouseOver={() =>
                    onWillNavigate && onWillNavigate(pages.get('/') as Page)
                  }
                  onTouchStart={() =>
                    onWillNavigate && onWillNavigate(pages.get('/') as Page)
                  }
                >
                  <Logo className="h-8 w-8" />
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {primaryNavItems.map(([path, page]) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={clsx(
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                      isActive(path, pathname)
                        ? 'border-cyan-500 text-neutral-900 dark:border-violet-400 dark:text-neutral-50'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200'
                    )}
                    aria-current={isActive(path, pathname) ? 'page' : undefined}
                    onMouseOver={() => onWillNavigate && onWillNavigate(page)}
                    onTouchStart={() => onWillNavigate && onWillNavigate(page)}
                  >
                    {page.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ThemeSelector />
              <GitHubLink className="sm:ml-3" />
              <NavMenu
                className="hidden sm:ml-3 sm:block"
                navItems={secondaryNavItems}
                onWillNavigate={onWillNavigate}
              />
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {primaryNavItems.concat(secondaryNavItems).map(([path, page]) => (
                <Disclosure.Button
                  key={path}
                  as={NavLink}
                  to={path}
                  className={clsx(
                    'block border-l-4 border-transparent py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-400 dark:hover:text-neutral-50',
                    isActive(path, pathname)
                      ? '!border-cyan-500 hover:!border-neutral-500 dark:!border-violet-400 dark:hover:!border-neutral-400'
                      : ''
                  )}
                  aria-current={isActive(path, pathname) ? 'page' : undefined}
                  onMouseOver={() => onWillNavigate && onWillNavigate(page)}
                  onTouchStart={() => onWillNavigate && onWillNavigate(page)}
                >
                  {page.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
