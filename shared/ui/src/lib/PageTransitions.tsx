import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { eventBus } from '@jasonruesch/shared/utils';
import useWindowSize from './hooks/useWindowSize';

const DURATION = 1; // seconds

const variants: Variants = {
  hidden: ({ windowSize, didNavigate, slideRight }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const slideAnimation = {
      x: `${windowSize.width * (slideRight ? -1 : 1)}px`,
    };
    const otherAnimations = {
      opacity: 0,
      overflow: 'hidden',
      borderRadius: '16px',
      height: `${windowSize.height}px`,
      width: `${height}px`,
      scale: 0.6,
    };

    return didNavigate
      ? {
          ...slideAnimation,
          ...otherAnimations,
        }
      : {};
  },
  enter: ({ windowSize, didNavigate, slideRight, duration }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const centerX = windowSize.width / 2 - height / 2;
    const x = [
      `${windowSize.width * (slideRight ? -1 : 1)}px`,
      `${centerX}px`,
      '0px',
    ];
    const slideAnimation = { x };
    const otherAnimations = {
      opacity: 1,
      overflow: 'visible',
      borderRadius: '0',
      height: 'auto',
      width: 'auto',
      scale: 1,
    };
    const slideTransition = {
      x: {
        duration,
        times: [0, 0.5, 1],
      },
    };
    const otherTransitions = {
      opacity: { duration: duration / 3 },
      overflow: { delay: duration, duration: 0.1 },
      borderRadius: { delay: duration, duration: 0.1 },
      height: { delay: duration, duration: 0.1 },
      width:
        windowSize.width < windowSize.height
          ? { delay: duration, duration: 0.1 }
          : { delay: duration / 2, duration: duration / 2 },
      default: { delay: duration / 2, duration: duration / 2 },
    };

    return didNavigate
      ? {
          ...slideAnimation,
          ...otherAnimations,
          transition: {
            ...slideTransition,
            ...otherTransitions,
          },
        }
      : {};
  },
  exit: ({ windowSize, slideRight, duration }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const centerX = windowSize.width / 2 - height / 2;
    const x = [
      '0px',
      `${centerX}px`,
      `${windowSize.width * (slideRight ? 1 : -1)}px`,
    ];
    const slideAnimation = { x };
    const otherAnimations = {
      opacity: 0,
      overflow: 'hidden',
      borderRadius: '16px',
      height: `${windowSize.height}px`,
      width: `${height}px`,
      scale: 0.6,
    };
    const slideTransition = {
      x: {
        duration,
        times: [0, 0.5, 1],
      },
    };
    const otherTransitions = {
      opacity: { delay: 2 * (duration / 3), duration: duration / 3 },
      overflow: { duration: 0 },
      borderRadius: { duration: 0 },
      height: { duration: 0 },
      width:
        windowSize.width < windowSize.height
          ? { duration: 0 }
          : { duration: duration / 2 },
      default: { duration: duration / 2 },
    };

    return {
      ...slideAnimation,
      ...otherAnimations,
      transition: {
        ...slideTransition,
        ...otherTransitions,
      },
    };
  },
};

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
  const windowSize = useWindowSize();
  const shouldReduceMotion =
    useReducedMotion() || (windowSize.width && windowSize.width < 640); // disable animations on small screens
  const { pathname } = useLocation();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [didNavigate, setDidNavigate] = useState(false);
  const [slideRight, setSlideRight] = useState(false);
  const duration = shouldReduceMotion ? DURATION / 2 : DURATION;

  const isDirectionRight = (current: string, next: string) => {
    if (current === '/about' && next === '/') {
      return true;
    }

    if (current === '/contact') {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (previousPathname !== pathname) {
      setDidNavigate(true);
      eventBus.dispatch('isNavigating', { isNavigating: true });
    }

    setPreviousPathname(pathname);
  }, [pathname, previousPathname]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleIntendToNavigate = ({ to }: any) => {
      const slideRight = isDirectionRight(pathname, to);
      setSlideRight(slideRight);
    };

    eventBus.on('intendToNavigate', handleIntendToNavigate);

    return () => {
      eventBus.remove('intendToNavigate', handleIntendToNavigate);
    };
  }, [pathname]);

  return (
    <div
      className="overflow-hidden after:fixed after:inset-0 after:-z-[1] after:block after:h-full after:w-full
      after:bg-gradient-to-b after:from-neutral-100 after:via-cyan-500
      after:to-fuchsia-500 dark:after:from-neutral-800 dark:after:via-violet-400 dark:after:to-teal-400"
    >
      <AnimatePresence
        initial={false} // Disabled for now because the animate keyframes are running when the page loads
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          id="page"
          key={pathname}
          className={className}
          custom={{
            windowSize,
            didNavigate,
            slideRight,
            duration,
          }}
          variants={!shouldReduceMotion ? variants : undefined}
          initial="hidden"
          animate="enter"
          exit="exit"
          onAnimationComplete={(definition) => {
            if (definition === 'enter') {
              setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const page = document.getElementById('page')!;
                page.style.transform = 'none';

                setDidNavigate(false);
                eventBus.dispatch('isNavigating', { isNavigating: false });
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
