import clsx from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Background, Navbar, TransitionBackground } from '../components';
import {
  ANIMATIONS_DISABLED,
  Page,
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

  const handleWillNavigate = useCallback(
    (page?: Page) => {
      if (page) {
        const currentPageIndex = pages.get(pathname)?.index as number;
        const shouldSlideLeft = currentPageIndex < page.index;
        setShouldSlideLeft(shouldSlideLeft);
      }

      setPageScrollOffset(window.scrollY);
    },
    [pathname]
  );

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

  // Reset the scroll and menu open statuses when the route changes
  useEffect(() => {
    setIsScrolled(false);
    setPageScrollOffset(0);

    // Reset what handleOpenChange does
    document.body.classList.remove('overflow-hidden');
  }, [pathname]);

  useEffect(() => {
    if (previousPathname !== pathname) {
      eventBus.dispatch('navigate', { isNavigating: true });
    }

    setPreviousPathname(pathname);
  }, [pathname, previousPathname]);

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className="relative bg-gradient-to-b from-neutral-100 via-cyan-600 to-fuchsia-600 dark:from-neutral-800 dark:via-violet-500 dark:to-teal-500"
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <TransitionBackground />

        <motion.header
          className={clsx(
            ANIMATIONS_DISABLED || isScrolled
              ? // shadow marked as important to override the animate variant
                '!shadow !shadow-black/50'
              : '',
            // 'hidden', // Uncomment to test hiding the header
            'fixed inset-x-0 top-0 z-20 text-neutral-900 dark:text-neutral-50'
          )}
          custom={{ theme: resolvedTheme }}
          variants={
            ANIMATIONS_DISABLED || shouldReduceMotion
              ? undefined
              : headerVariants
          }
        >
          <Navbar
            className="px-safe-offset-4 sm:px-safe-offset-8"
            isScrolled={isScrolled}
            pages={pages}
            onWillNavigate={handleWillNavigate}
            onOpenChange={handleOpenChange}
          />
        </motion.header>

        <motion.main
          className={clsx(
            ANIMATIONS_DISABLED
              ? 'h-screen scale-[0.6] overflow-hidden rounded-2xl shadow-2xl shadow-black/75 ring-1 ring-black ring-opacity-5'
              : '',
            // 'hidden', // Uncomment to test hiding the main content
            'relative z-10 min-h-screen bg-neutral-100 text-neutral-900 px-safe-offset-4 dark:bg-neutral-800 dark:text-neutral-50 sm:px-safe-offset-8'
          )}
          custom={{ shouldSlideLeft }}
          variants={
            ANIMATIONS_DISABLED || shouldReduceMotion ? undefined : mainVariants
          }
          onAnimationComplete={() => {
            eventBus.dispatch('navigate', { isNavigating: false });
          }}
        >
          {/* Background */}
          <Background />

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
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransitions;
