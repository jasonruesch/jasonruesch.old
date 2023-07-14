import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { Page } from '../app/app';
import { isActive } from '../lib';

export interface NavMenuProps {
  className?: string;
  navItems: [string, Page][];
  onWillNavigate: (page: Page) => void;
}

export function Nav({ className, navItems, onWillNavigate }: NavMenuProps) {
  const { pathname } = useLocation();

  return (
    <div className={clsx('space-x-8', className)}>
      {navItems.map(([path, page]) => (
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
          onMouseOver={() => onWillNavigate(page)}
          onTouchStart={() => onWillNavigate(page)}
        >
          {page.name}
        </NavLink>
      ))}
    </div>
  );
}
