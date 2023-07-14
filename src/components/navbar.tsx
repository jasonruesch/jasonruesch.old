import { Disclosure } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Page } from '../app/app';
import { GitHubLink } from './github-link';
import { Logo } from './logo';
import { Nav } from './nav';
import { NavMenu } from './nav-menu';
import { NavMobile } from './nav-mobile';
import { ThemeSelector } from './theme-selector';

interface NavbarProps {
  className?: string;
  isScrolled?: boolean;
  pages: Map<string, Page>;
  onWillNavigate: (page?: Page) => void;
  onOpenChange: (open: boolean) => void;
}

export function Navbar({
  className,
  isScrolled,
  pages,
  onWillNavigate,
  onOpenChange,
}: NavbarProps) {
  const primaryNavItems = [...pages].filter(
    ([, page]) => page.type === 'primary'
  );

  const secondaryNavItems = [...pages].filter(
    ([, page]) => page.type === 'secondary'
  );

  const homePage = pages.get('/') as Page;

  return (
    <Disclosure
      as="nav"
      className={({ open }) =>
        clsx(
          isScrolled || open
            ? 'bg-gradient-to-b from-neutral-100 to-neutral-50/95 backdrop-blur-sm dark:from-neutral-800 dark:to-neutral-900/75'
            : 'bg-neutral-100 dark:bg-neutral-800',
          open ? 'via-neutral-50/95 dark:via-neutral-900/75' : '',
          // The supports utilities here are added to fix a space between the device's status bar and the navbar on iOS
          'relative w-full supports-[-webkit-touch-callout:_none]:-mt-px supports-[-webkit-touch-callout:_none]:pt-px',
          className
        )
      }
    >
      {({ open }) => (
        <>
          <div className="relative z-10 flex h-12 justify-between sm:h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button
                className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                onClick={() => onOpenChange(!open)}
              >
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
                  onMouseOver={() => onWillNavigate(homePage)}
                  onTouchStart={() => onWillNavigate(homePage)}
                >
                  <Logo className="h-8 w-8" />
                </NavLink>
              </div>
              <Nav
                className="hidden sm:ml-6 sm:flex"
                navItems={primaryNavItems}
                onWillNavigate={onWillNavigate}
              />
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

          <Disclosure.Panel className="h-[calc(100vh-3rem)] overflow-scroll sm:hidden sm:h-[calc(100vh-4rem)]">
            <NavMobile
              navItems={primaryNavItems.concat(secondaryNavItems)}
              onWillNavigate={onWillNavigate}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
