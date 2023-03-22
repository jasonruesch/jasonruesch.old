import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
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
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Detect when the page has been scrolled to help style the header.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update the theme color when the discosure is opened or closed, or when the page has been scrolled.
  useEffect(() => {
    const themeColor = document.head.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement;

    const darkColor = isOpen || isScrolled ? '#171717' : '#262626';
    const lightColor = isOpen || isScrolled ? '#fafafa' : '#f5f5f5';
    themeColor.content = resolvedTheme === 'dark' ? darkColor : lightColor;
  }, [isOpen, isScrolled, resolvedTheme]);

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
      {({ open, close }) => {
        setIsOpen(open);

        return children({ open, close });
      }}
    </Disclosure>
  );
}
