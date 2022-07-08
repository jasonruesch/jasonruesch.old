import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { animateScroll as scroll } from 'react-scroll';
import useScrollOffset from '@/hooks/useScrollOffset';

export function BackToTopButton() {
  const [showTopButton, setShowTopButton] = useState(false);
  const scrollOffset = useScrollOffset();

  useEffect(() => {
    const handleScroll = () => {
      // Show top button when the user scrolls down the height of the page title
      if (document.documentElement.scrollTop > -scrollOffset) {
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
  }, [scrollOffset]);

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
        className="focus:ring-primary-500 dark:focus:ring-primary-400 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:disabled:bg-primary-300 fixed bottom-8 right-12 z-40 inline-flex items-center justify-center rounded-full border border-transparent p-6 text-base font-medium text-black shadow-sm hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:text-neutral-500 dark:disabled:text-neutral-600 print:hidden"
        onClick={() => scroll.scrollToTop()}
      >
        <ChevronUpIcon className="h-6 w-6" />
      </button>
    </Transition>
  );
}
