import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { NavLink } from './NavLink';

const navItems = [
  { href: '/', name: 'Home' },
  { href: '/about', name: 'About' },
  { href: '/contact', name: 'Contact' },
  { href: '/articles', name: 'Articles' },
  { href: '/privacy', name: 'Privacy Policy' },
];

export function MobileNav() {
  const pathname = usePathname();

  const isCurrentRoute = (href: string): boolean => {
    return pathname
      ? (href === '/' && pathname === '/') ||
          (href !== '/' && pathname.startsWith(href))
      : false;
  };

  return (
    <>
      {navItems.map((item) => {
        return (
          <Disclosure.Button
            key={item.name}
            as={NavLink}
            to={item.href}
            className={clsx(
              'dark:hover-neutral-400 block border-l-4 border-transparent py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
              isCurrentRoute(item.href)
                ? '!border-cyan-500 hover:!border-neutral-500 dark:!border-violet-400 dark:hover:!border-neutral-400'
                : ''
            )}
            aria-current={isCurrentRoute(item.href) ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        );
      })}
    </>
  );
}
