import { Fragment, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

export type NotificatonType = 'success' | 'error';

export interface NotificationProps {
  children: ReactNode;
  className?: string;
  type: NotificatonType;
  onHide: () => void;
}

export function Notification({
  children,
  className,
  type,
  onHide,
}: NotificationProps) {
  return createPortal(
    <Transition
      show
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:shadow-black dark:ring-opacity-50 ${
          type === 'error' ? 'bg-red-500 text-white' : ''
        } ${type === 'success' ? 'bg-green-500 text-white' : ''} ${className}`}
      >
        <div className="p-4">
          <div className="flex items-center">
            <p className="w-0 flex-1 text-sm font-medium">{children}</p>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-current"
                onClick={() => {
                  onHide();
                }}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>,
    document.getElementById('live')
  );
}