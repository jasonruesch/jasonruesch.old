import { PageMeta } from '@/lib';
import clsx from 'clsx';
import { PageNavLink } from './page-nav-link';

export interface NavProps {
  className?: string;
  navItems: [string, PageMeta][];
}

export const Nav = ({ className, navItems }: NavProps) => {
  return (
    <nav className={clsx('h-full space-x-8', className)}>
      {navItems.map(([path, page]) => (
        <PageNavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            clsx(
              'inline-flex h-full items-center border-b-2 px-1 pt-1 text-sm font-medium',
              isActive
                ? 'border-cyan-500 text-neutral-900 dark:border-violet-400 dark:text-neutral-50'
                : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200'
            )
          }
        >
          {page.name}
        </PageNavLink>
      ))}
    </nav>
  );
};
