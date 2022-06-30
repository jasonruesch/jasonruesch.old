import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { SunIcon, MoonIcon, DesktopComputerIcon } from '@heroicons/react/solid';
import {
  SunIcon as SunIconOutline,
  MoonIcon as MoonIconOutline,
} from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export default function ThemeSelector({ className }: { className?: string }) {
  const { resolvedTheme, theme, setTheme, forcedTheme } = useTheme();

  useEffect(() => {
    (
      document.head.querySelector('meta[name="theme-color"]') as HTMLMetaElement
    ).content = resolvedTheme === 'dark' ? '#262626' : '#f5f5f5';
  }, [resolvedTheme]);

  return (
    !forcedTheme && (
      <Menu as="div" className={clsx('inline-block text-left', className)}>
        <div>
          <Menu.Button
            className={clsx(
              theme !== 'system' ? 'text-primary' : '',
              'rounded-md p-2'
            )}
          >
            <span className="sr-only">Open theme menu</span>
            <SunIconOutline
              className="h-6 w-6 dark:hidden"
              aria-hidden="true"
            />
            <MoonIconOutline
              className="hidden h-6 w-6 dark:inline"
              aria-hidden="true"
            />
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
                  <button
                    className={clsx(
                      active
                        ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-white'
                        : theme === 'light'
                        ? 'text-primary'
                        : '',
                      'group flex w-full items-center px-4 py-2 text-sm'
                    )}
                    onClick={() => setTheme('light')}
                  >
                    <SunIcon
                      className={clsx(
                        theme === 'light' ? 'text-primary' : '',
                        'mr-3 h-5 w-5 group-hover:text-neutral-500 dark:group-hover:text-neutral-300'
                      )}
                      aria-hidden="true"
                    />
                    Light
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active
                        ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-white'
                        : theme === 'dark'
                        ? 'text-primary'
                        : '',
                      'group flex w-full items-center px-4 py-2 text-sm'
                    )}
                    onClick={() => setTheme('dark')}
                  >
                    <MoonIcon
                      className={clsx(
                        theme === 'dark' ? 'text-primary' : '',
                        'mr-3 h-5 w-5 group-hover:text-neutral-500 dark:group-hover:text-neutral-300'
                      )}
                      aria-hidden="true"
                    />
                    Dark
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active
                        ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-white'
                        : theme === 'system'
                        ? 'text-primary'
                        : '',
                      'group flex w-full items-center px-4 py-2 text-sm'
                    )}
                    onClick={() => setTheme('system')}
                  >
                    <DesktopComputerIcon
                      className={clsx(
                        theme === 'system' ? 'text-primary' : '',
                        'mr-3 h-5 w-5 group-hover:text-neutral-500 dark:group-hover:text-neutral-300'
                      )}
                      aria-hidden="true"
                    />
                    System
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  );
}
