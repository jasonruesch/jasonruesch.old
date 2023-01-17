import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import {
  MutableRefObject,
  ReactElement,
  // useCallback,
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
  // Detect when the page has been scrolled to help style the header.
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

  // Update the theme color when the discosure is opened or closed, or when the page has been scrolled.
  // const { resolvedTheme } = useTheme();
  const isOpened = useRef(false);
  // const updateThemeColor = useCallback(() => {
  //   const themeColor = document.head.querySelector(
  //     'meta[name="theme-color"]'
  //   ) as HTMLMetaElement;

  //   if (isOpened.current || isScrolled) {
  //     themeColor.content = resolvedTheme === 'dark' ? '#171717' : '#fafafa';
  //   } else {
  //     themeColor.content = resolvedTheme === 'dark' ? '#262626' : '#f5f5f5';
  //   }
  // }, [isScrolled, resolvedTheme]);
  // useEffect(() => {
  //   updateThemeColor();
  // }, [updateThemeColor]);

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
        isOpened.current = open;
        // updateThemeColor();
        return children({ open, close });
      }}
    </Disclosure>
  );
}
