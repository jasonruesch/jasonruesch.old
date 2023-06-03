import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { NavLink } from './NavLink';

const navItems = [
  { href: '/', name: 'Home' },
  { href: '/about', name: 'About' },
  { href: '/contact', name: 'Contact' },
  { href: '/articles', name: 'Articles' },
];

export interface NavProps {
  className?: string;
}

export function Nav({ className }: NavProps) {
  const pathname = usePathname();

  const isCurrentRoute = (href: string): boolean => {
    return pathname
      ? (href === '/' && pathname === '/') ||
          (href !== '/' && pathname.startsWith(href))
      : false;
  };

  return (
    <nav className={clsx('space-x-8', className)}>
      {navItems.map(({ name, href }) => (
        <NavLink
          to={href}
          key={name}
          className={clsx(
            'inline-flex items-center border-b-2 px-1 pb-2 pt-3 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
            isCurrentRoute(href)
              ? 'border-cyan-500 hover:border-neutral-500 dark:border-violet-400 dark:hover:border-neutral-400'
              : 'border-transparent hover:border-neutral-500 dark:hover:border-neutral-400'
          )}
        >
          {name}
        </NavLink>
      ))}
    </nav>
  );
}
