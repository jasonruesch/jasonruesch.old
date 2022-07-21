import { Transition } from '@headlessui/react';
import { ClipboardCopyIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';

export default function CopyButton({ value }: { value: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  const handleClick = (e) => {
    clearTimeout(timeout.current);
    setIsCopied(true);

    navigator.clipboard.writeText(value);

    timeout.current = setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <button
      className="text-neutral-inverse hover:text-neutral group relative -m-2 flex items-center rounded-full p-2"
      onClick={handleClick}
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
  );
}
