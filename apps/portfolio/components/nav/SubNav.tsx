import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { NavItem } from './Navbar';
import NavLink from './NavLink';

export const SubNav = ({
  className,
  items,
}: {
  className?: string;
  items: NavItem[];
}) => {
  const { asPath } = useRouter();

  return (
    <nav className={clsx('space-x-8', className)}>
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
              'text-neutral-inverse hover:bg-neutral-muted hover:text-neutral inline-flex items-center rounded-md py-2 px-3 text-sm font-medium',
              isCurrent
                ? '!bg-secondary-light hover:!bg-neutral-muted hover:!text-neutral !text-black'
                : ''
            )}
            isCurrent={isCurrent}
          >
            {item.name}
          </Disclosure.Button>
        );
      })}
    </nav>
  );
};
