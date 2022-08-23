import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

export interface HeaderProps {
  children: ReactNode;
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
    <header
      className={clsx(
        'fixed inset-x-0 top-0',
        isScrolled
          ? 'bg-neutral-50 shadow dark:bg-neutral-900 dark:shadow-black'
          : '',
        className
      )}
    >
      {children}
    </header>
  );
}
