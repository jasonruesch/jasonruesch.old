import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { SunIcon, MoonIcon, DesktopComputerIcon } from '@heroicons/react/solid';
import {
  SunIcon as SunIconOutline,
  MoonIcon as MoonIconOutline,
} from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export function ThemeSelector({ className }: { className?: string }) {
  const { resolvedTheme, theme, setTheme, forcedTheme } = useTheme();

  useEffect(() => {
    const themeColor = document.head.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement;
    themeColor.content = resolvedTheme === 'dark' ? '#262626' : '#f5f5f5';
  }, [resolvedTheme]);

  return !forcedTheme ? (
    <Menu
      as="div"
      className={clsx(
        'text-neutral hover:text-on-background relative inline-block text-left',
        className
      )}
    >
      <div>
        <Menu.Button
          className={({ open }) =>
            clsx(
              'rounded-md p-2',
              open ? 'text-on-background' : '',
              theme !== 'system' ? 'text-primary hover:text-on-background' : ''
            )
          }
        >
          <span className="sr-only">Open theme menu</span>
          <SunIconOutline className="h-6 w-6 dark:hidden" aria-hidden="true" />
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
        <Menu.Items className="bg-surface absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:shadow-black dark:ring-opacity-50">
          <div className="py-1">
            <Menu.Item>
              <button
                className={clsx(
                  'text-on-surface hover:bg-neutral-muted group flex w-full items-center px-4 py-2 text-sm',
                  theme === 'light'
                    ? '!text-primary hover:!text-on-surface'
                    : ''
                )}
                onClick={() => setTheme('light')}
              >
                <SunIcon
                  className={clsx(
                    'mr-3 h-5 w-5',
                    theme === 'light'
                      ? 'text-primary group-hover:text-on-surface'
                      : ''
                  )}
                  aria-hidden="true"
                />
                <span>Light</span>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className={clsx(
                  'text-on-surface hover:bg-neutral-muted group flex w-full items-center px-4 py-2 text-sm',
                  theme === 'dark' ? '!text-primary hover:!text-on-surface' : ''
                )}
                onClick={() => setTheme('dark')}
              >
                <MoonIcon
                  className={clsx(
                    'mr-3 h-5 w-5',
                    theme === 'dark'
                      ? 'text-primary group-hover:text-on-surface'
                      : ''
                  )}
                  aria-hidden="true"
                />
                <span>Dark</span>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className={clsx(
                  'text-on-surface hover:bg-neutral-muted group flex w-full items-center px-4 py-2 text-sm',
                  theme === 'system'
                    ? '!text-primary hover:!text-on-surface'
                    : ''
                )}
                onClick={() => setTheme('system')}
              >
                <DesktopComputerIcon
                  className={clsx(
                    'mr-3 h-5 w-5',
                    theme === 'system'
                      ? 'text-primary group-hover:text-on-surface'
                      : ''
                  )}
                  aria-hidden="true"
                />
                <span>System</span>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : null;
}
