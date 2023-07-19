import { Disclosure } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Page, PagePath, easterEggPath, eventBus } from '../lib';
import { GitHubLink } from './github-link';
import { Logo } from './logo';
import { Nav } from './nav';
import { NavMenu } from './nav-menu';
import { NavMobile } from './nav-mobile';
import { PageNavLink } from './page-nav-link';
import { ThemeSelector } from './theme-selector';

interface NavbarProps {
  className?: string;
  isScrolled?: boolean;
  pages: Map<PagePath, Page>;
}

export function Navbar({ className, isScrolled, pages }: NavbarProps) {
  const { pathname } = useLocation();
  const isEasterEggPage = pathname === easterEggPath;

  const primaryNavItems = [...pages].filter(
    ([, page]) => page.type === 'primary'
  );

  const secondaryNavItems = [...pages].filter(
    ([, page]) => page.type === 'secondary'
  );

  const handleOpenChange = useCallback((isOpen: boolean) => {
    eventBus.dispatch('navbar:openChange', { isOpen });
  }, []);

  return (
    <Disclosure
      as="nav"
      className={({ open }) =>
        clsx(
          (isScrolled && !isEasterEggPage) || open
            ? 'bg-gradient-to-b from-neutral-100 to-neutral-50/75 backdrop-blur-sm dark:from-neutral-800 dark:to-neutral-900/75'
            : '',
          open ? 'via-neutral-50/75 dark:via-neutral-900/75' : '',
          // The supports utilities here are added to fix a space between the device's status bar and the navbar on iOS
          'w-full supports-[-webkit-touch-callout:_none]:-mt-px supports-[-webkit-touch-callout:_none]:pt-px',
          className
        )
      }
    >
      {({ open }) => (
        <>
          <div className="relative z-10 flex h-12 justify-between mt-safe mx-safe-offset-4 sm:h-16 sm:mx-safe-offset-8">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button
                className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                onClick={() => handleOpenChange(!open)}
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
                <PageNavLink to="/">
                  <Logo className="h-8 w-8" />
                </PageNavLink>
              </div>
              <Nav
                className="hidden sm:ml-6 sm:flex"
                navItems={primaryNavItems}
              />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ThemeSelector />
              <GitHubLink className="sm:ml-3" />
              <NavMenu
                className="hidden sm:ml-3 sm:block"
                navItems={secondaryNavItems}
              />
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <NavMobile
              className="h-[calc(100vh-3rem)] supports-[-webkit-touch-callout:_none]:pb-20"
              primaryNavItems={primaryNavItems}
              secondaryNavItems={secondaryNavItems}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
