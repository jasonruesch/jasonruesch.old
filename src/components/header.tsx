import {
  NavigatingContext,
  headerAnimations,
  pages,
  useRouteHandle,
} from '@/lib';
import { Disclosure } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useAnimate } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GitHubLink } from './github-link';
import { Logo } from './logo';
import { Nav } from './nav';
import { NavMenu } from './nav-menu';
import { NavMobile } from './nav-mobile';
import { PageNavLink } from './page-nav-link';
import { ThemeSelector } from './theme-selector';

export const Header = () => {
  const { pathname } = useLocation();
  const [scope, animate] = useAnimate();
  const [scrolled, setScrolled] = useState(false);
  const { transparent } = useRouteHandle(pathname);
  const { navigating } = useContext(NavigatingContext);

  const primaryNavItems = [...pages].filter(
    ([, page]) => page.type === 'primary'
  );
  const secondaryNavItems = [...pages].filter(
    ([, page]) => page.type === 'secondary'
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const startAnimation = async () => {
      console.debug('[Header] startAnimation');

      await animate(
        scope.current,
        headerAnimations.out.keyFrames,
        headerAnimations.out.options
      );
      await animate(
        scope.current,
        headerAnimations.in.keyFrames,
        headerAnimations.in.options
      );
    };

    if (navigating) {
      startAnimation();
    }
  }, [navigating, scope, animate]);

  useEffect(() => {
    // Reset the scrolled status when the route changes
    setScrolled(false);
  }, [pathname]);

  return (
    <Disclosure
      ref={scope}
      as="header"
      className={({ open }) =>
        clsx(
          open || (scrolled && !transparent)
            ? 'bg-gradient-to-b from-neutral-100 to-neutral-50/75 shadow-sm shadow-black/20 backdrop-blur-sm dark:from-neutral-800 dark:to-neutral-900/75 dark:shadow-black/50'
            : '',
          open ? 'h-full via-neutral-50/75 dark:via-neutral-900/75' : '',
          'fixed inset-x-0 top-0 z-20 flex flex-col supports-[-webkit-touch-callout:_none]:-mt-px supports-[-webkit-touch-callout:_none]:pt-px'
        )
      }
    >
      {({ open }) => {
        // Prevent scrolling when the mobile menu is open
        document.body.classList.toggle('overflow-hidden', open);

        return (
          <>
            <div className="flex h-12 items-center pt-safe px-safe-offset-4 sm:h-16">
              <div className="flex-1 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center rounded-md p-2 text-neutral-500 hover:text-neutral-700 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="pointer-events-none block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars2Icon
                      className="pointer-events-none block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-shrink justify-center sm:justify-start">
                <PageNavLink to="/">
                  <Logo className="h-8 w-8" />
                </PageNavLink>
              </div>

              <Nav
                className="ml-6 hidden flex-1 sm:block"
                navItems={primaryNavItems}
              />

              <div className="flex flex-1 justify-end gap-1 sm:flex-none sm:gap-3">
                <ThemeSelector />
                <GitHubLink />
                <NavMenu
                  className="hidden sm:block"
                  navItems={secondaryNavItems}
                />
              </div>
            </div>

            <Disclosure.Panel className="flex-1 sm:hidden">
              <NavMobile
                primaryNavItems={primaryNavItems}
                secondaryNavItems={secondaryNavItems}
              />
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};
