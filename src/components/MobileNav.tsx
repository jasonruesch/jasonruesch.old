import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { forwardRef, LegacyRef } from 'react';
import { useLocation } from 'react-router-dom';

const navItems = [
  { href: '/', name: 'Home' },
  { href: '/about', name: 'About' },
  { href: '/contact', name: 'Contact' },
  { href: '/privacy', name: 'Privacy Policy' },
];

export interface NavLinkProps {
  className?: string;
  href: string;
  children: React.ReactNode;
  isCurrent?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
}

export const NavLink = forwardRef(
  (
    { className, href, children, isCurrent, onClick }: NavLinkProps,
    ref: LegacyRef<HTMLAnchorElement>
  ) => {
    return (
      <a
        href={href}
        ref={ref}
        className={className}
        aria-current={isCurrent ? 'page' : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
);
NavLink.displayName = 'NavLink';

export function MobileNav() {
  const { pathname: asPath } = useLocation();

  return (
    <>
      {navItems.map((item) => {
        const isCurrent =
          (item.href === '/' && asPath === '/') ||
          (item.href !== '/' && asPath.startsWith(item.href));

        return (
          <Disclosure.Button
            key={item.name}
            as={NavLink}
            href={item.href}
            className={clsx(
              'dark:hover-neutral-400 block border-l-4 border-transparent py-2 pl-3 pr-4 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
              isCurrent
                ? '!border-cyan-500 hover:!border-neutral-500 dark:!border-violet-400 dark:hover:!border-neutral-400'
                : ''
            )}
            isCurrent={isCurrent}
          >
            {item.name}
          </Disclosure.Button>
        );
      })}
    </>
  );
}
