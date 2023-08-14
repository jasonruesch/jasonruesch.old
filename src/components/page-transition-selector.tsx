import { PageTransitionContext, PageTransitionType } from '@/lib';
import { Menu, Transition } from '@headlessui/react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, useCallback, useContext } from 'react';
import { FadeIcon, SlideIcon } from './icons';

interface MenuItem {
  name: string;
  type: PageTransitionType;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  {
    name: 'Fade',
    type: 'fade',
    icon: <FadeIcon className="mr-3 h-5 w-5" />,
  },
  {
    name: 'Slide',
    type: 'slide',
    icon: <SlideIcon className="mr-3 h-5 w-5" />,
  },
];

export interface PageTransitionSelectorProps {
  className?: string;
}

export const PageTransitionSelector = ({
  className,
}: PageTransitionSelectorProps) => {
  const [pageTransitionType, setPageTransitionType] = useContext(
    PageTransitionContext
  );
  const handleSetPageTransitionType = useCallback(
    (type: PageTransitionType) => {
      if (type !== pageTransitionType) {
        setPageTransitionType(type);
      }
    },
    [pageTransitionType, setPageTransitionType]
  );

  return (
    <Menu
      as="div"
      className={clsx(
        'relative inline-block text-left text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200',
        className
      )}
    >
      {() => (
        <>
          <div>
            <Menu.Button
              className={({ open }) =>
                clsx(
                  'rounded-md p-2',
                  open ? 'text-neutral-900 dark:text-neutral-50' : ''
                )
              }
              title="Page transition"
            >
              <span className="sr-only">Open page transition menu</span>
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
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
                        type="button"
                        className={clsx(
                          'group flex w-full items-center px-4 py-2 text-sm',
                          active ? 'bg-neutral-200 dark:bg-neutral-700' : '',
                          pageTransitionType === item.type
                            ? active
                              ? 'text-neutral-900 dark:text-neutral-50'
                              : 'text-cyan-500 dark:text-violet-400'
                            : 'text-neutral-900 dark:text-neutral-50'
                        )}
                        onClick={() => handleSetPageTransitionType(item.type)}
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
        </>
      )}
    </Menu>
  );
};