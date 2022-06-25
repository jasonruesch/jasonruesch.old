import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { SunIcon, MoonIcon, DesktopComputerIcon } from '@heroicons/react/solid';
import {
  SunIcon as SunIconOutline,
  MoonIcon as MoonIconOutline,
} from '@heroicons/react/outline';
import { useTheme } from 'next-themes';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ThemeSelector() {
  const { theme, setTheme, forcedTheme } = useTheme();

  return (
    !forcedTheme && (
      <Menu as="div" className="inline-block text-left">
        <div>
          <Menu.Button
            className={classNames(
              theme !== 'system' ? 'text-cyan-500' : '',
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
          <Menu.Items className="absolute right-0 z-50 mt-2 w-36 origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active
                        ? 'bg-neutral-100 text-neutral-900'
                        : 'text-neutral-700',
                      theme === 'light' ? 'text-cyan-500' : '',
                      'group flex w-full items-center px-4 py-2 text-sm'
                    )}
                    onClick={() => setTheme('light')}
                  >
                    <SunIcon
                      className={classNames(
                        theme === 'light' ? 'text-cyan-500' : '',
                        'mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500'
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
                    className={classNames(
                      active
                        ? 'bg-neutral-100 text-neutral-900'
                        : 'text-neutral-700',
                      theme === 'dark' ? 'text-cyan-500' : '',
                      'group flex w-full items-center px-4 py-2 text-sm'
                    )}
                    onClick={() => setTheme('dark')}
                  >
                    <MoonIcon
                      className={classNames(
                        theme === 'dark' ? 'text-cyan-500' : '',
                        'mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500'
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
                    className={classNames(
                      active
                        ? 'bg-neutral-100 text-neutral-900'
                        : 'text-neutral-700',
                      theme === 'system' ? 'text-cyan-500' : '',
                      'group flex w-full items-center px-4 py-2 text-sm'
                    )}
                    onClick={() => setTheme('system')}
                  >
                    <DesktopComputerIcon
                      className={classNames(
                        theme === 'system' ? 'text-cyan-500' : '',
                        'mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500'
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
