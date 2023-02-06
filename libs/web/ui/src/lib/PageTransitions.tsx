import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { eventBus } from '@jasonruesch/shared/utils';
import useWindowSize from './hooks/useWindowSize';
import { variants } from './PageTransitionsVariants';

const DURATION = 1; // seconds

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
  const windowSize = useWindowSize();
  const isXSmallScreen = windowSize.width && windowSize.width < 640;
  const shouldReduceMotion = useReducedMotion() || isXSmallScreen; // disable animations on x-small screens
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [isNavigating, setIsNavigating] = useState(false);
  const [slideRight, setSlideRight] = useState(false);
  const duration = !shouldReduceMotion ? DURATION : DURATION / 2;

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
    const shouldSlideRight = (current: string | null, next: string) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      current ? pageMap.get(next)! < pageMap.get(current)! : false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleIntendToNavigate = ({ to }: any) => {
      const slideRight = shouldSlideRight(pathname, to);
      setSlideRight(slideRight);
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
          ? 'after:bg-gradient-to-b after:from-neutral-100 after:via-cyan-500 after:to-fuchsia-500 dark:after:from-neutral-800 dark:after:via-violet-400 dark:after:to-teal-400'
          : ''
      )}
    >
      <AnimatePresence
        initial={false} // Disabled for now because the animate keyframes are running when the page loads
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          ref={pageRef}
          id="page"
          key={pathname}
          className={className}
          custom={{
            windowSize,
            isNavigating,
            slideRight,
            duration,
            shouldReduceMotion,
          }}
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
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
