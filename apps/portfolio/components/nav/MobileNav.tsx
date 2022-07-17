import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { NavItem } from './Navbar';
import NavLink from './NavLink';

export const MobileNav = ({ items }: { items: NavItem[] }) => {
  const { asPath } = useRouter();

  return (
    <>
      {items.map((item) => {
        const isCurrent =
          (item.href === '/' && asPath === '/') ||
          (item.href !== '/' && asPath.startsWith(item.href));

        return (
          <Disclosure.Button
            key={item.name}
            as={NavLink}
            href={item.href}
            className={clsx(
              'text-neutral-inverse hover:text-neutral hover:border-neutral block border-l-4 border-transparent py-2 pl-3 pr-4',
              isCurrent ? '!border-primary hover:!border-neutral' : ''
            )}
            isCurrent={isCurrent}
          >
            {item.name}
          </Disclosure.Button>
        );
      })}
    </>
  );
};
