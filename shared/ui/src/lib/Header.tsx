import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

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

  const header = useRef<HTMLElement>(null);

  return (
    <Disclosure
      ref={header}
      as="header"
      className={({ open }) =>
        clsx(
          'fixed inset-x-0 top-0 transition-colors duration-200',
          open || isScrolled
            ? 'bg-neutral-50 shadow dark:bg-neutral-900 dark:shadow-black'
            : '',
          className
        )
      }
    >
      {({ open, close }) => {
        const themeColor = document.querySelector(
          'meta[name="theme-color"]'
        ) as HTMLMetaElement;

        const darkColor =
          open || isScrolled
            ? window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--color-neutral-900')
            : window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--color-neutral-800');
        const lightColor =
          open || isScrolled
            ? window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--color-neutral-100')
            : window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--color-neutral-50');
        themeColor.content = resolvedTheme === 'dark' ? darkColor : lightColor;

        return children({ open, close });
      }}
    </Disclosure>
  );
}
