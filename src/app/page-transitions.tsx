import clsx from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageNavLink } from 'src/components/page-nav-link';
import { Background, Navbar, TransitionBackground } from '../components';
import {
  ANIMATIONS_DISABLED,
  EventDetail,
  PagePath,
  easterEggPath,
  eventBus,
  headerVariants,
  mainInnerVariants,
  mainVariants,
  pages,
} from '../lib';

interface LayoutProps {
  children: React.ReactNode;
}

export function PageTransitions({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldSlideLeft, setShouldSlideLeft] = useState(false);
  const [pageScrollOffset, setPageScrollOffset] = useState(0);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  const handleOpenChange = useCallback((open: boolean) => {
    document.body.classList.toggle('overflow-hidden', open);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleWillNavigate = (detail: EventDetail) => {
      if (detail.page) {
        const currentPageIndex = pages.get(pathname as PagePath)
          ?.index as number;
        const shouldSlideLeft = currentPageIndex < detail.page.index;
        setShouldSlideLeft(shouldSlideLeft);
      }

      setPageScrollOffset(window.scrollY);
    };

    // Reset the scroll and menu open statuses when the route changes
    setIsScrolled(false);
    setPageScrollOffset(0);
    // Reset what handleOpenChange does
    document.body.classList.remove('overflow-hidden');

    eventBus.on('willNavigate', handleWillNavigate);

    return () => {
      eventBus.off('willNavigate', handleWillNavigate);
    };
  }, [pathname]);

  useEffect(() => {
    if (previousPathname !== pathname) {
      eventBus.dispatch('navigate', { isNavigating: true });
    }

    setPreviousPathname(pathname);
  }, [pathname, previousPathname]);

  const isEasterEggPage = pathname === easterEggPath;

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className="relative overflow-hidden"
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <TransitionBackground />

        <motion.header
          className={clsx(
            (ANIMATIONS_DISABLED || isScrolled) && !isEasterEggPage
              ? // shadow marked as important to override the animate variant
                '!shadow !shadow-black/50'
              : '',
            // 'hidden', // Uncomment to test hiding the header
            'fixed inset-x-0 top-0 z-20 text-neutral-900 dark:text-neutral-50'
          )}
          custom={{ theme: resolvedTheme, isEasterEggPage }}
          variants={
            ANIMATIONS_DISABLED || shouldReduceMotion
              ? undefined
              : headerVariants
          }
        >
          <Navbar
            isScrolled={isScrolled}
            pages={pages}
            onOpenChange={handleOpenChange}
          />
        </motion.header>

        <motion.main
          className={clsx(
            ANIMATIONS_DISABLED
              ? 'h-screen scale-[0.6] overflow-hidden rounded-2xl shadow-2xl shadow-black/75 ring-1 ring-black ring-opacity-5'
              : '',
            // 'hidden', // Uncomment to test hiding the main content
            'relative z-10 min-h-screen text-neutral-900 px-safe-offset-4 dark:text-neutral-50 sm:px-safe-offset-8',
            !isEasterEggPage ? 'bg-neutral-100 dark:bg-neutral-800' : ''
          )}
          custom={{ shouldSlideLeft, isEasterEggPage }}
          variants={
            ANIMATIONS_DISABLED || shouldReduceMotion ? undefined : mainVariants
          }
          onAnimationComplete={() => {
            eventBus.dispatch('navigate', { isNavigating: false });
          }}
        >
          {/* Background */}
          {!isEasterEggPage && <Background />}

          <motion.div
            className="grid min-h-screen place-items-center py-16 sm:py-20"
            initial={false}
            animate="animate"
            exit="exit"
            custom={pageScrollOffset}
            variants={
              ANIMATIONS_DISABLED || shouldReduceMotion
                ? undefined
                : mainInnerVariants
            }
          >
            {children}
          </motion.div>
        </motion.main>

        <footer className="fixed bottom-0 right-0 z-20 h-8 w-8">
          <PageNavLink
            to={easterEggPath}
            className="flex h-full w-full cursor-default items-center justify-center"
          >
            <span className="sr-only">
              You found an easter egg! Click to view.
            </span>
          </PageNavLink>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransitions;
