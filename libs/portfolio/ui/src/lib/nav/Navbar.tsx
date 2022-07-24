import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { ThemeSelector } from '../ThemeSelector';
import { LogoImage } from '../LogoImage';
import { MobileNav } from './MobileNav';
import { NavMenu } from './NavMenu';
import { Nav } from './Nav';
import { GitHubLink } from './GitHubLink';
import { createPortal } from 'react-dom';
import { MobileScrollNav } from './MobileScrollNav';
import { SubNav } from './SubNav';
import { ScrollSubNav } from './ScrollSubNav';
import { SearchInput } from '../SearchInput';
import { useTheme } from 'next-themes';

export interface NavItem {
  name: string;
  href: string;
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];
const menu: NavItem[] = [
  { name: 'Style Guide', href: '/styleguide' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export function Navbar({
  className,
  searchInput,
  subNav,
  mobileSubNav,
}: {
  className?: string;
  searchInput?: ReactElement<typeof SearchInput>;
  subNav?: ReactElement<typeof SubNav | typeof ScrollSubNav>;
  mobileSubNav?: ReactElement<typeof MobileNav | typeof MobileScrollNav>;
}) {
  // Make sure the navbar is in the ODM before portaling to it.
  const [header, setHeader] = useState<HTMLElement>();
  useEffect(() => {
    const header = document?.getElementById('header');
    if (header) {
      setHeader(header);
    }
  }, []);

  // Know when the page has been scrolled to help style the navbar.
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

  const { resolvedTheme } = useTheme();
  useEffect(() => {
    const themeColor = document.head.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement;

    if (isScrolled) {
      themeColor.content = resolvedTheme === 'dark' ? '#171717' : '#fafafa';
    } else {
      themeColor.content = resolvedTheme === 'dark' ? '#262626' : '#f5f5f5';
    }
  }, [resolvedTheme, isScrolled]);

  return header
    ? createPortal(
        <Disclosure
          as="div"
          className={({ open }) =>
            clsx(
              'navbar',
              open || isScrolled ? 'bg-surface shadow dark:shadow-black' : '',
              className
            )
          }
        >
          {({ open, close }) => {
            return (
              <div className="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8">
                <div
                  className={clsx(
                    searchInput
                      ? 'divide-neutral-border divide-y'
                      : subNav
                      ? ''
                      : 'md:divide-y-0',
                    subNav ? 'md:divide-neutral-border md:divide-y' : ''
                  )}
                >
                  <div className="relative flex h-16 items-center">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="text-neutral hover:text-on-background inline-flex items-center justify-center rounded-md p-2">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuAlt1Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div
                      className={clsx(
                        'flex flex-1 items-center justify-center md:items-stretch md:justify-start',
                        searchInput ? 'md:flex-initial' : ''
                      )}
                    >
                      <div className="flex flex-shrink-0 items-center">
                        <Link href="/" scroll={false}>
                          <a className="flex items-center">
                            <LogoImage className="h-10 w-10 lg:mr-2" />
                            <span className="font-display hidden text-3xl font-bold lg:inline">
                              Jason Ruesch
                            </span>
                          </a>
                        </Link>
                      </div>
                      <div className="hidden md:mx-6 md:block">
                        <Nav items={navigation} onClick={close} />
                      </div>
                    </div>

                    {searchInput && (
                      <div className="mr-6 hidden flex-1 items-center justify-end px-2 md:flex">
                        {searchInput}
                      </div>
                    )}

                    <div className="absolute inset-y-0 right-0 flex flex-shrink-0 items-center space-x-2 md:static md:inset-auto">
                      <ThemeSelector />
                      <GitHubLink />
                      <NavMenu
                        className="hidden md:inline-block"
                        items={menu}
                      />
                    </div>
                  </div>

                  {searchInput && (
                    <div className="flex h-14 w-full items-center justify-center md:hidden">
                      {searchInput}
                    </div>
                  )}
                  {subNav && (
                    <div className="hidden overflow-x-auto md:flex md:h-14 md:w-full md:items-center">
                      {subNav}
                    </div>
                  )}
                </div>

                <Disclosure.Panel
                  as="nav"
                  className="md:hidden"
                  unmount={false}
                >
                  <>
                    <div className="space-y-1 pt-2 pb-4">
                      <MobileNav items={navigation} />
                      <MobileNav items={menu} />
                    </div>

                    {mobileSubNav && (
                      <div className="border-neutral-border space-y-1 border-t py-4">
                        {mobileSubNav}
                      </div>
                    )}
                  </>
                </Disclosure.Panel>
              </div>
            );
          }}
        </Disclosure>,
        header
      )
    : null;
}
