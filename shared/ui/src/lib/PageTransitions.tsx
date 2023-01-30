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

    return didNavigate
      ? {
          x: `${windowSize.width * (slideRight ? -1 : 1)}px`,
          opacity: 0,
          overflow: 'hidden',
          borderRadius: '16px',
          height: `${windowSize.height}px`,
          width: `${height}px`,
          scale: 0.6,
        }
      : {};
  },
  enter: ({ windowSize, didNavigate, slideRight }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const centerX = windowSize.width / 2 - height / 2;

    return didNavigate
      ? {
          x: [
            `${windowSize.width * (slideRight ? -1 : 1)}px`,
            `${centerX}px`,
            '0px',
          ],
          opacity: 1,
          overflow: 'visible',
          borderRadius: '0',
          height: 'auto',
          width: 'auto',
          scale: 1,
          transition: {
            x: {
              duration: DURATION,
              times: [0, 0.5, 1],
            },
            opacity: { duration: DURATION / 3 },
            overflow: { delay: DURATION, duration: 0.1 },
            borderRadius: { delay: DURATION, duration: 0.1 },
            height: { delay: DURATION, duration: 0.1 },
            width:
              windowSize.width < windowSize.height
                ? { delay: DURATION, duration: 0.1 }
                : { delay: DURATION / 2, duration: DURATION / 2 },
            default: { delay: DURATION / 2, duration: DURATION / 2 },
          },
          // transitionEnd: {
          //   transform: 'none',
          // },
        }
      : {};
  },
  exit: ({ windowSize, slideRight }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const centerX = windowSize.width / 2 - height / 2;

    return {
      x: [
        '0px',
        `${centerX}px`,
        `${windowSize.width * (slideRight ? 1 : -1)}px`,
      ],
      opacity: 0,
      overflow: 'hidden',
      borderRadius: '16px',
      height: `${windowSize.height}px`,
      width: `${height}px`,
      scale: 0.6,
      transition: {
        x: {
          duration: DURATION,
          times: [0, 0.5, 1],
        },
        opacity: { delay: 2 * (DURATION / 3), duration: DURATION / 3 },
        overflow: { duration: 0 },
        borderRadius: { duration: 0 },
        height: { duration: 0 },
        width:
          windowSize.width < windowSize.height
            ? { duration: 0 }
            : { duration: DURATION / 2 },
        default: { duration: DURATION / 2 },
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
  const shouldReduceMotion = useReducedMotion();
  const { pathname } = useLocation();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [didNavigate, setDidNavigate] = useState(false);
  const windowSize = useWindowSize();
  const [slideRight, setSlideRight] = useState(false);

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
          key={`${pathname}-page`}
          className={className}
          custom={{
            windowSize,
            didNavigate,
            slideRight,
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
        {/* <motion.div
          key={pathname}
          className="absolute inset-0"
          initial={{ zIndex: -10 }}
          animate={{
            zIndex: [-10, 30, 30],
            transition: {
              times: [0, 0.1, DURATION - 0.1],
            },
            transitionEnd: { zIndex: -10 },
          }}
          exit={{ zIndex: -10 }}
        ></motion.div> */}
      </AnimatePresence>
    </div>
  );
};
