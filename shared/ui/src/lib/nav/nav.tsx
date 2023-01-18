import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

/* eslint-disable-next-line */
export interface NavProps {
  currentPath: string;
}

export function Nav({ currentPath }: NavProps) {
  const isCurrentRoute = (path: string): boolean => {
    return (
      (path === '/' && currentPath === '/') ||
      (path !== '/' && currentPath.includes(path))
    );
  };

  return (
    <nav className="space-x-8">
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

export default Nav;
