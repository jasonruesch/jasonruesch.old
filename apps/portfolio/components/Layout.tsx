import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';
import { MobileNav } from './nav/MobileNav';
import { MobileScrollNav } from './nav/MobileScrollNav';
import { Navbar } from './nav/Navbar';
import { ScrollSubNav } from './nav/ScrollSubNav';
import { SubNav } from './nav/SubNav';
import { SearchInput } from './SearchInput';

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
  searchInput?: ReactElement<typeof SearchInput>;
  subNav?: ReactElement<typeof SubNav | typeof ScrollSubNav>;
  mobileSubNav?: ReactElement<typeof MobileNav | typeof MobileScrollNav>;
  shouldCenterVertically?: boolean;
}) {
  return (
    <>
      <Navbar
        searchInput={searchInput}
        subNav={subNav}
        mobileSubNav={mobileSubNav}
      />

      <div
        className={clsx(
          'pt-18 px-4 pb-4 print:!pt-4 sm:px-6 lg:px-8',
          // 'mx-auto w-full max-w-screen-xl',
          searchInput ? 'pt-32' : 'pt-18',
          subNav ? 'md:pt-32' : '',
          shouldCenterVertically
            ? 'sm-min-h:absolute sm-min-h:top-1/2 sm-min-h:left-1/2 sm-min-h:-translate-y-1/2 sm-min-h:-translate-x-1/2 sm-min-h:!pt-4'
            : '',
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
