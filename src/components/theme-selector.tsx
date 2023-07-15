import { Menu, Transition } from '@headlessui/react';
import {
  MoonIcon as MoonIconOutline,
  SunIcon as SunIconOutline,
} from '@heroicons/react/24/outline';
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Fragment, useEffect } from 'react';

const menuItems = [
  {
    name: 'Light',
    theme: 'light',
    icon: <SunIcon className="mr-3 h-5 w-5" aria-hidden="true" />,
  },
  {
    name: 'Dark',
    theme: 'dark',
    icon: <MoonIcon className="mr-3 h-5 w-5" aria-hidden="true" />,
  },
  {
    name: 'System',
    theme: 'system',
    icon: <ComputerDesktopIcon className="mr-3 h-5 w-5" aria-hidden="true" />,
  },
];

export interface ThemeSelectorProps {
  className?: string;
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = match.matches ? 'dark' : 'light';
    const themeColor = document.querySelector(
      `meta[name="theme-color"][media*="${systemTheme}"]`
    ) as HTMLMetaElement | null;

    if (themeColor) {
      themeColor.content = `#${resolvedTheme === 'dark' ? '262626' : 'f5f5f5'}`;
    }
  }, [resolvedTheme]);

  return (
    <Menu
      as="div"
      className={clsx(
        'relative inline-block text-left text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200',
        className
      )}
    >
      <div>
        <Menu.Button
          className={({ open }) =>
            clsx(
              'rounded-md p-2',
              theme !== 'system'
                ? 'text-cyan-500 hover:text-neutral-700 dark:text-violet-400 dark:hover:text-neutral-200'
                : '',
              open ? '!text-neutral-900 dark:!text-neutral-50' : ''
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
        <Menu.Items className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-neutral-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:shadow-black dark:ring-opacity-50">
          <div className="py-1">
            {menuItems.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    className={clsx(
                      'group flex w-full items-center px-4 py-2 text-sm',
                      active ? 'bg-neutral-200 dark:bg-neutral-700' : '',
                      theme === item.theme
                        ? active
                          ? 'text-neutral-900 dark:text-neutral-50'
                          : 'text-cyan-500 dark:text-violet-400'
                        : 'text-neutral-900 dark:text-neutral-50'
                    )}
                    onClick={() => setTheme(item.theme)}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
