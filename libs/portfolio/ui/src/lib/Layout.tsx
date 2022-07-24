import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';
import { Beams } from './Beams';
import { MobileNav } from './nav/MobileNav';
import { MobileScrollNav } from './nav/MobileScrollNav';
import { Navbar } from './nav/Navbar';
import { ScrollSubNav } from './nav/ScrollSubNav';
import { SubNav } from './nav/SubNav';
import { SearchInput } from './SearchInput';

export function Layout({
  className,
  children,
  shouldCenterVertically,
  searchInput,
  subNav,
  mobileSubNav,
}: {
  className?: string;
  children: ReactNode;
  shouldCenterVertically?: boolean;
  searchInput?: ReactElement<typeof SearchInput>;
  subNav?: ReactElement<typeof SubNav | typeof ScrollSubNav>;
  mobileSubNav?: ReactElement<typeof MobileNav | typeof MobileScrollNav>;
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
          'bg-background min-h-screen py-4 print:!pt-4',
          shouldCenterVertically
            ? 'flex flex-col items-center justify-center'
            : '',
          searchInput ? 'pt-32' : 'pt-18',
          subNav ? 'md:pt-32' : '',
          className
        )}
      >
        <Beams className="z-0" />
        <div className="z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
