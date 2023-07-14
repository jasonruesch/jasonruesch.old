import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { Page } from '../app/app';
import { isActive } from '../lib';

export interface NavMenuProps {
  className?: string;
  navItems: [string, Page][];
  onWillNavigate: (page: Page) => void;
}

export function NavMobile({
  className,
  navItems,
  onWillNavigate,
}: NavMenuProps) {
  const { pathname } = useLocation();

  return (
    <div className="space-y-1 pb-4 pt-2">
      {navItems.map(([path, page]) => (
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
          onMouseOver={() => onWillNavigate(page)}
          onTouchStart={() => onWillNavigate(page)}
        >
          {page.name}
        </Disclosure.Button>
      ))}
    </div>
  );
}
