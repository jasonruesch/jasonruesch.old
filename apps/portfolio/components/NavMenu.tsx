import { forwardRef, Fragment, MutableRefObject, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

const menuItems = [{ name: 'Privacy Policy', href: '/privacy' }];

export interface MenuLinkProps {
  href: string;
  isCurrent?: boolean;
  children: ReactNode;
}

const MenuLink = forwardRef(
  (
    { href, children, isCurrent, ...rest }: MenuLinkProps,
    ref: MutableRefObject<HTMLAnchorElement>
  ) => (
    <Link href={href}>
      <a
        ref={ref}
        className={clsx(
          'group flex w-full items-center px-4 py-2 text-sm text-neutral-900 hover:bg-neutral-200 dark:text-neutral-50 dark:hover:bg-neutral-700',
          isCurrent
            ? '!text-cyan-500 hover:!text-neutral-900 dark:!text-violet-400 dark:hover:!text-neutral-50'
            : ''
        )}
        aria-current={isCurrent ? 'page' : undefined}
        {...rest}
      >
        {children}
      </a>
    </Link>
  )
);
MenuLink.displayName = 'MenuLink';

export interface NavMenuProps {
  className?: string;
}

export function NavMenu({ className }: NavMenuProps) {
  const { asPath } = useRouter();

  const isCurrentRoute = (href: string): boolean => {
    return (
      (href === '/' && asPath === '/') ||
      (href !== '/' && asPath.startsWith(href))
    );
  };
  const hasCurrent = menuItems.some(({ href }) => isCurrentRoute(href));

  return (
    <Menu
      as="div"
      className={clsx(
        'relative inline-block text-left text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
        className
      )}
    >
      <div>
        <Menu.Button
          className={({ open }) =>
            clsx(
              'rounded-md p-2',
              open ? 'text-on-background' : '',
              hasCurrent
                ? 'text-cyan-500 hover:text-neutral-900 dark:text-violet-400 dark:hover:text-neutral-50'
                : ''
            )
          }
        >
          <span className="sr-only">Open nav menu</span>
          <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-neutral-50 text-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:text-neutral-50 dark:shadow-black dark:ring-opacity-50">
          <div className="py-1">
            {menuItems.map(({ name, href }) => (
              <Menu.Item key={name}>
                <MenuLink href={href} isCurrent={isCurrentRoute(href)}>
                  {name}
                </MenuLink>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
