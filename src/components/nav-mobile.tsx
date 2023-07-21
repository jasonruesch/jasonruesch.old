import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { Page, isActive } from '../lib';
import { PageNavLink } from './page-nav-link';

export interface NavMenuProps {
  className?: string;
  primaryNavItems: [string, Page][];
  secondaryNavItems: [string, Page][];
}

export function NavMobile({
  className,
  primaryNavItems,
  secondaryNavItems,
}: NavMenuProps) {
  const { pathname } = useLocation();

  return (
    <ul className={clsx('flex flex-col', className)}>
      <li className="flex-1 space-y-1 overflow-scroll pb-4 pt-2">
        {primaryNavItems.map(([path, page]) => (
          <Disclosure.Button
            key={path}
            as={PageNavLink}
            to={path}
            className={clsx(
              'block border-l-4 border-transparent py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-400 dark:hover:text-neutral-50',
              isActive(path, pathname)
                ? '!border-cyan-500 hover:!border-neutral-500 dark:!border-violet-400 dark:hover:!border-neutral-400'
                : ''
            )}
            aria-current={isActive(path, pathname) ? 'page' : undefined}
          >
            {page.name}
          </Disclosure.Button>
        ))}
      </li>
      <li className="space-y-1 pt-2 pb-safe-offset-4">
        {secondaryNavItems.map(([path, page]) => (
          <Disclosure.Button
            key={path}
            as={PageNavLink}
            to={path}
            className={clsx(
              'block border-l-4 border-transparent py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-400 dark:hover:text-neutral-50',
              isActive(path, pathname)
                ? '!border-cyan-500 hover:!border-neutral-500 dark:!border-violet-400 dark:hover:!border-neutral-400'
                : ''
            )}
            aria-current={isActive(path, pathname) ? 'page' : undefined}
          >
            {page.name}
          </Disclosure.Button>
        ))}
      </li>
    </ul>
  );
}
