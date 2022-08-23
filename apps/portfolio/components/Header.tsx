import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { MutableRefObject, ReactElement, useEffect, useState } from 'react';

export interface DisclosureRenderPropArg {
  open?: boolean;
  close?: (
    focusableElement?: HTMLElement | MutableRefObject<HTMLElement>
  ) => void;
}

export interface HeaderProps {
  children: ({ open, close }: DisclosureRenderPropArg) => ReactElement;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  // Detect when the page has been scrolled to help style the navbar.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Disclosure
      as="header"
      className={({ open }) =>
        clsx(
          'fixed inset-x-0 top-0',
          open || isScrolled
            ? 'bg-neutral-50 shadow dark:bg-neutral-900 dark:shadow-black'
            : '',
          className
        )
      }
    >
      {({ open, close }) => children({ open, close })}
    </Disclosure>
  );
}
