import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { NavItem } from './Navbar';
import { NavLink } from './NavLink';

export function Nav({
  className,
  items,
}: {
  className?: string;
  items: NavItem[];
}) {
  const { asPath } = useRouter();

  return (
    <nav className={clsx('h-full md:flex md:space-x-8', className)}>
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
              'text-neutral hover:text-on-background hover:border-neutral inline-flex items-center border-b-2 border-transparent px-1 pb-2 pt-3',
              isCurrent ? '!border-primary hover:!border-neutral' : ''
            )}
            isCurrent={isCurrent}
          >
            {item.name}
          </Disclosure.Button>
        );
      })}
    </nav>
  );
}
