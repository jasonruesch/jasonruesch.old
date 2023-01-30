import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { NavLink } from './NavLink';

const navItems = [
  { href: '/', name: 'Home' },
  { href: '/about', name: 'About' },
  { href: '/contact', name: 'Contact' },
  { href: '/privacy', name: 'Privacy Policy' },
];

export function MobileNav() {
  const { pathname } = useLocation();

  return (
    <>
      {navItems.map((item) => {
        const isCurrent =
          (item.href === '/' && pathname === '/') ||
          (item.href !== '/' && pathname.startsWith(item.href));

        return (
          <Disclosure.Button
            key={item.name}
            as={NavLink}
            to={item.href}
            className={clsx(
              'dark:hover-neutral-400 block border-l-4 border-transparent py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
              isCurrent
                ? '!border-cyan-500 hover:!border-neutral-500 dark:!border-violet-400 dark:hover:!border-neutral-400'
                : ''
            )}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        );
      })}
    </>
  );
}
