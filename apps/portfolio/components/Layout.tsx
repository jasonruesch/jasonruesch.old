import clsx from 'clsx';
import { ReactNode } from 'react';
import Navbar from './nav/Navbar';

export default function Layout({
  className,
  children,
  searchInput,
  subNav,
  mobileSubNav,
  shouldCenterVertically,
}: {
  className?: string;
  children: ReactNode;
  searchInput?: ReactNode;
  subNav?: ReactNode;
  mobileSubNav?: ReactNode;
  shouldCenterVertically?: boolean;
}) {
  return (
    <>
      <Navbar
        searchInput={searchInput}
        subNav={subNav}
        mobileSubNav={mobileSubNav}
      />

      <main
        className={clsx(
          'pt-18 mx-auto w-full max-w-screen-xl px-4 pb-4 print:!pt-4 sm:px-6 lg:px-8',
          searchInput ? 'pt-32' : 'pt-18',
          subNav ? 'md:pt-32' : '',
          shouldCenterVertically
            ? 'sm-min-h:absolute sm-min-h:top-1/2 sm-min-h:left-1/2 sm-min-h:-translate-y-1/2 sm-min-h:-translate-x-1/2 sm-min-h:!pt-4'
            : '',
          className
        )}
      >
        {children}
      </main>
    </>
  );
}
