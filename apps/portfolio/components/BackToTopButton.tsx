import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';

export function BackToTopButton() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show top button when the user scrolls down the height of the navbar
      if (document.documentElement.scrollTop > 72) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    document.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Transition
      as={Fragment}
      appear
      show={showTopButton}
      enter="ease-in-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <button
        className="btn-primary fixed bottom-8 right-12 z-40 hidden rounded-full p-6 print:hidden sm:block"
        onClick={() => window.scrollTo(0, 0)}
      >
        <ChevronUpIcon className="h-6 w-6" />
      </button>
    </Transition>
  );
}
