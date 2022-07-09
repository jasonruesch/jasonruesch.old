import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
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
        className="btn-primary fixed bottom-8 right-12 z-40 rounded-full p-6 print:hidden"
        onClick={() => window.scrollTo(0, 0)}
      >
        <ChevronUpIcon className="h-6 w-6" />
      </button>
    </Transition>
  );
}
