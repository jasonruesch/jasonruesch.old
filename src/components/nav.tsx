import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { Page, PagePath, isActive } from '../lib';
import { PageNavLink } from './page-nav-link';

export interface NavMenuProps {
  className?: string;
  navItems: [PagePath, Page][];
}

export function Nav({ className, navItems }: NavMenuProps) {
  const { pathname } = useLocation();

  return (
    <div className={clsx('space-x-8', className)}>
      {navItems.map(([path, page]) => (
        <PageNavLink
          key={path}
          to={path}
          className={clsx(
            'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
            isActive(path, pathname)
              ? 'border-cyan-500 text-neutral-900 dark:border-violet-400 dark:text-neutral-50'
              : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200'
          )}
          aria-current={isActive(path, pathname) ? 'page' : undefined}
        >
          {page.name}
        </PageNavLink>
      ))}
    </div>
  );
}
