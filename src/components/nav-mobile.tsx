import { PageMeta, isCurrentPath } from '@/lib';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { PageNavLink } from './page-nav-link';

export interface NavMobileProps {
  className?: string;
  primaryNavItems: [string, PageMeta][];
  secondaryNavItems: [string, PageMeta][];
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const NavMobile = ({
  className,
  primaryNavItems,
  secondaryNavItems,
  onLinkClick,
}: NavMobileProps) => {
  const { pathname } = useLocation();

  return (
    <nav className="h-full">
      <ul className={clsx('flex h-full flex-col', className)}>
        <li className="space-y-1 pb-4 pt-2">
          {primaryNavItems.map(([path, page]) => (
            <Disclosure.Button
              key={path}
              as={PageNavLink}
              to={path}
              className={clsx(
                'block border-l-4 py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-400 dark:hover:text-neutral-50',
                isCurrentPath(path, pathname)
                  ? 'border-cyan-500 dark:border-violet-400'
                  : 'border-transparent'
              )}
              onClick={onLinkClick}
            >
              {page.name}
            </Disclosure.Button>
          ))}
        </li>
        <li className="space-y-1 pb-4 pt-2">
          {/* <div className="pl-4 text-xs font-semibold leading-6 text-neutral-500 dark:text-neutral-400">
            My Values
          </div> */}
          {secondaryNavItems.map(([path, page]) => (
            <Disclosure.Button
              key={path}
              as={PageNavLink}
              to={path}
              className={clsx(
                'block border-l-4 py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-400 dark:hover:text-neutral-50',
                isCurrentPath(path, pathname)
                  ? 'border-cyan-500 dark:border-violet-400'
                  : 'border-transparent'
              )}
              onClick={onLinkClick}
            >
              {page.name}
            </Disclosure.Button>
          ))}
        </li>
        <li className="mt-auto space-y-1 pt-2 pb-safe-offset-4">
          {/* TODO: Add profile avatar or something here */}
        </li>
      </ul>
    </nav>
  );
};
