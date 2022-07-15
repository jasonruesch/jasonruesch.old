import { forwardRef, Fragment, MutableRefObject, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

const MenuLink = forwardRef(
  (
    {
      href,
      isCurrent,
      children,
    }: {
      href: string;
      isCurrent?: boolean;
      children: ReactNode;
    },
    ref: MutableRefObject<HTMLAnchorElement>
  ) => (
    <Link href={href}>
      <a
        ref={ref}
        className={clsx(
          'text-on-surface hover:bg-neutral-muted group flex w-full items-center px-4 py-2 text-sm',
          isCurrent ? '!text-primary hover:!text-on-surface' : ''
        )}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {children}
      </a>
    </Link>
  )
);
MenuLink.displayName = 'NavLink';

export default function NavMenu({
  className,
  items,
}: {
  className?: string;
  items: { name: string; href: string }[];
}) {
  const { route } = useRouter();
  const hasCurrent = items.some(({ href }) => href === route);

  return (
    <Menu
      as="div"
      className={clsx(
        'hover:text-neutral text-neutral-inverse relative inline-block text-left',
        className
      )}
    >
      <div>
        <Menu.Button
          className={({ open }) =>
            clsx(
              'rounded-md p-2',
              open ? 'text-neutral' : '',
              hasCurrent ? 'text-primary hover:text-neutral' : ''
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
        <Menu.Items className="bg-surface text-on-surface absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:shadow-black dark:ring-opacity-50">
          <div className="py-1">
            {items.map(({ name, href }) => (
              <Menu.Item key={name}>
                <MenuLink href={href} isCurrent={route === href}>
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
