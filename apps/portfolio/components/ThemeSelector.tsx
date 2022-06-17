import { Fragment } from 'react';

import { useTheme } from 'next-themes';
import { Menu, Transition } from '@headlessui/react';
import { DesktopComputerIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';
import {
  MoonIcon as MoonIconOutline,
  SunIcon as SunOutlineIcon,
} from '@heroicons/react/outline';

export const ThemeSelector = ({ className }) => {
  const { theme, resolvedTheme, setTheme, forcedTheme } = useTheme();

  return (
    !forcedTheme && (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`${
              theme === 'system' ? 'text-neutral' : 'text-primary'
            } rounded-md p-2 focus:outline-none focus-visible:ring-2 ${className}`}
          >
            <span className="sr-only">Open theme menu</span>
            {resolvedTheme === 'light' ? (
              <SunOutlineIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <MoonIconOutline className="h-6 w-6" aria-hidden="true" />
            )}
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
          <Menu.Items className="divide-on-surface bg-surface ring-on-background-5 absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg ring-1 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-secondary text-on-secondary'
                        : 'text-on-surface'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setTheme('light')}
                  >
                    <SunIcon
                      className={`${
                        active ? 'text-on-secondary' : 'text-on-surface'
                      } mr-2 h-5 w-5`}
                      aria-hidden="true"
                    />
                    Light
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-secondary text-on-secondary'
                        : 'text-on-surface'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setTheme('dark')}
                  >
                    <MoonIcon
                      className={`${
                        active ? 'text-on-secondary' : 'text-on-surface'
                      } mr-2 h-5 w-5`}
                      aria-hidden="true"
                    />
                    Dark
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-secondary text-on-secondary'
                        : 'text-on-surface'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setTheme('system')}
                  >
                    <DesktopComputerIcon
                      className={`${
                        active ? 'text-on-secondary' : 'text-on-surface'
                      } mr-2 h-5 w-5`}
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
};

export default ThemeSelector;
