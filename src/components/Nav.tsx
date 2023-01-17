import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export interface NavProps {
  className?: string;
}

export function Nav({ className }: NavProps) {
  const { pathname: asPath } = useLocation();

  const isCurrentRoute = (href: string): boolean => {
    return (
      (href === '/' && asPath === '/') ||
      (href !== '/' && asPath.startsWith(href))
    );
  };

  return (
    <nav className={clsx('space-x-8', className)}>
      {navItems.map(({ name, href }) => (
        <a
          href={href}
          key={name}
          className={clsx(
            'inline-flex items-center border-b-2 px-1 pb-2 pt-3 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
            isCurrentRoute(href)
              ? 'border-cyan-500 hover:border-neutral-500 dark:border-violet-400 dark:hover:border-neutral-400'
              : 'border-transparent hover:border-neutral-500 dark:hover:border-neutral-400'
          )}
        >
          {name}
        </a>
      ))}
    </nav>
  );
}
