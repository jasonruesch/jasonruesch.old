import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from './hooks/useWindowSize';

const DURATION = 1; // seconds

const variants: Variants = {
  hidden: ({ windowSize, didNavigate }) => {
    const height = Math.min(windowSize.width, windowSize.height);

    return didNavigate
      ? {
          x: `${windowSize.width}px`,
          opacity: 0,
          overflow: 'hidden',
          borderRadius: '16px',
          height: `${windowSize.height}px`,
          width: `${height}px`,
          scale: 0.6,
        }
      : {};
  },
  enter: ({ windowSize, didNavigate }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const centerX = windowSize.width / 2 - height / 2;

    return didNavigate
      ? {
          x: [`${windowSize.width}px`, `${centerX}px`, '0px'],
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
        }
      : {};
  },
  exit: ({ windowSize }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const centerX = windowSize.width / 2 - height / 2;

    return {
      x: ['0px', `${centerX}px`, `-${windowSize.width}px`],
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

  useEffect(() => {
    if (previousPathname !== pathname) {
      setDidNavigate(true);
    }

    setPreviousPathname(pathname);
  }, [pathname, previousPathname]);

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
