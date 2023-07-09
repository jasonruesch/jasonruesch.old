import { eventBus } from '@jasonruesch/shared/utils';
import clsx from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { VariantProps, variants } from './PageTransitionsVariants';
import useWindowSize from './hooks/useWindowSize';

export interface PageTransitionsProps {
  children: ReactNode;
  className?: string;
}

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs
 */
export const PageTransitions = ({
  children,
  className,
}: PageTransitionsProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [windowSize] = useWindowSize();
  const shouldReduceMotion = useReducedMotion(); // || isXSmallScreen; // Disable animations if reduce motion is requested or on x-small screens
  const { pathname } = useLocation();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [isNavigating, setIsNavigating] = useState(false);
  const [slideRight, setSlideRight] = useState(false);
  const { resolvedTheme } = useTheme();
  const [routingPageOffset, setRoutingPageOffset] = useState(0);

  useEffect(() => {
    if (previousPathname !== pathname) {
      setIsNavigating(true);
      eventBus.dispatch('isNavigating', { isNavigating: true });
    }

    setPreviousPathname(pathname);
  }, [pathname, previousPathname]);

  useEffect(() => {
    const pageMap = new Map<string, number>([
      ['/', 0],
      ['/about', 1],
      ['/contact', 2],
      ['/privacy', 3],
    ]);
    const shouldSlideRight = (current: string, next: string) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pageMap.get(next)! < pageMap.get(current)!;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleIntendToNavigate = ({ to, y }: any) => {
      const slideRight = shouldSlideRight(pathname, to);
      setSlideRight(slideRight);
      setRoutingPageOffset(y);
    };

    eventBus.on('intendToNavigate', handleIntendToNavigate);

    return () => {
      eventBus.remove('intendToNavigate', handleIntendToNavigate);
    };
  }, [pathname]);

  return (
    <div
      className={clsx(
        'overflow-hidden after:fixed after:inset-0 after:-z-[1] after:block after:h-full after:w-full',
        !shouldReduceMotion && isNavigating
          ? 'after:bg-gradient-to-b after:from-neutral-100 after:via-cyan-500 after:via-70% after:to-fuchsia-500 dark:after:from-neutral-800 dark:after:via-violet-400 dark:after:to-teal-400'
          : ''
      )}
    >
      <AnimatePresence
        initial={false} // Disabled for now because the animate keyframes are running when the page loads
        mode="wait"
        // onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          ref={pageRef}
          id="page"
          key={pathname}
          className={className}
          custom={
            {
              windowSize,
              isNavigating,
              slideRight,
              shouldReduceMotion,
              theme: resolvedTheme,
            } as VariantProps
          }
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          onAnimationComplete={(definition) => {
            if (definition === 'enter') {
              setIsNavigating(false);
              eventBus.dispatch('isNavigating', { isNavigating: false });

              setTimeout(() => {
                if (pageRef.current) {
                  pageRef.current.style.transform = 'none';
                }
              }, 100);
            }
          }}
        >
          <motion.div
            initial={false}
            animate={{
              y: 0,
            }}
            exit={{
              y: `-${routingPageOffset}px`,
              transition: {
                duration: 0,
              },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
