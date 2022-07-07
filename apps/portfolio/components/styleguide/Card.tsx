import { ReactNode, useRef, useState } from 'react';
import { ClipboardCopyIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';

export default function StyleguideCard({
  className,
  children,
  title,
  description,
}: {
  className?: string;
  children?: ReactNode;
  title?: string;
  description?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  const handleCopyToClipboard = (e) => {
    clearTimeout(timeout.current);
    setIsCopied(true);

    navigator.clipboard.writeText(description);

    timeout.current = setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div
      className={clsx(
        'bg-surface text-on-survface divide-y divide-black/10 rounded-lg shadow ring-1 ring-black/10 dark:divide-black dark:shadow-black dark:ring-0',
        className
      )}
    >
      <div className="relative flex min-h-[160px] items-stretch justify-center overflow-hidden rounded-t-lg">
        {children}
      </div>
      <div className="bg-neutral-10 rounded-b-lg px-5 py-3 dark:bg-neutral-700">
        <div className="flex text-sm">
          <div className="flex-1">
            <span>{title}</span>
            <p className="text-primary-500 dark:text-primary-400 pt-1 text-xs">
              {description}
            </p>
          </div>
          <div className="flex flex-shrink-0 self-start">
            <button
              className="group relative -m-2 flex items-center rounded-full p-2 text-neutral-900 hover:text-neutral-500 dark:text-white dark:hover:text-neutral-300"
              onClick={handleCopyToClipboard}
            >
              <Transition
                show={isCopied}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="bg-surface text-on-surface absolute -left-3/4 bottom-full flex justify-center rounded-md py-1 px-3 text-xs font-semibold uppercase leading-4 tracking-wide drop-shadow-md filter">
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="6"
                    viewBox="0 0 16 6"
                    className="absolute top-full left-1/2 -mt-px"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
                      className="fill-surface"
                    ></path>
                  </svg>
                  <span>Copied!</span>
                </div>
              </Transition>
              <span className="sr-only">Copy to clipboard</span>
              <ClipboardCopyIcon
                className="h-5 w-5 group-hover:-rotate-12"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
