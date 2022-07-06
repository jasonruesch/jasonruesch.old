import { forwardRef, Fragment, MutableRefObject, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

const NavLink = forwardRef(
  (
    {
      active,
      route,
      href,
      children,
      ...rest
    }: { active: boolean; route: string; href: string; children: ReactNode },
    ref: MutableRefObject<HTMLAnchorElement>
  ) => (
    <Link href={href}>
      <a
        ref={ref}
        {...rest}
        className={clsx(
          active
            ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-white'
            : route === href
            ? 'text-primary-500 dark:text-primary-400'
            : '',
          'group flex w-full items-center px-4 py-2 text-sm'
        )}
        aria-current={route === href ? 'page' : undefined}
      >
        {children}
      </a>
    </Link>
  )
);
NavLink.displayName = 'NavLink';

export default function NavMenu({ className }: { className?: string }) {
  const { route } = useRouter();

  return (
    <Menu
      as="div"
      className={clsx(
        'inline-block text-left text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300',
        className
      )}
    >
      <div>
        <Menu.Button
          className={({ open }) =>
            clsx(
              'rounded-md p-2',
              open ? 'text-neutral-500 dark:text-neutral-300' : ''
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
            <Menu.Item>
              {({ active }) => (
                <NavLink active={active} route={route} href="/styleguide">
                  Style Guide
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <NavLink active={active} route={route} href="/privacy">
                  Privacy Policy
                </NavLink>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
