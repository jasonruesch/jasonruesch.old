import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from './hooks/useWindowSize';

const MULTIPLIER = 1;

const variants: Variants = {
  hidden: ({ didNavigate }) =>
    didNavigate
      ? {
          x: '100vw',
          opacity: 0,
          overflow: 'hidden',
          height: '100vh',
          width: '100vh',
          scale: 0.6,
          borderRadius: '16px',
        }
      : {},
  enter: ({ windowSize, didNavigate }) =>
    didNavigate
      ? {
          x: [
            `${windowSize.width}px`,
            `${windowSize.width / 2 - windowSize.height / 2}px`,
            '0px',
          ],
          opacity: 1,
          overflow: 'visible',
          height: 'auto',
          width: 'auto',
          scale: 1,
          borderRadius: '0',
          transition: {
            x: {
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.8 * MULTIPLIER,
              times: [0, 0.5, 1],
            },
            opacity: { duration: 0.2 * MULTIPLIER },
            overflow: { delay: 0.8 * MULTIPLIER, duration: 0.1 },
            height: { delay: 0.8 * MULTIPLIER, duration: 0.1 },
            default: { delay: 0.4 * MULTIPLIER, duration: 0.4 * MULTIPLIER },
          },
        }
      : {},
  exit: ({ windowSize }) => ({
    x: [
      '0px',
      `${windowSize.width / 2 - windowSize.height / 2}px`,
      `-${windowSize.width}px`,
    ],
    opacity: 0,
    overflow: 'hidden',
    height: '100vh',
    width: '100vh',
    scale: 0.6,
    borderRadius: '16px',
    transition: {
      x: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.8 * MULTIPLIER,
        times: [0, 0.5, 1],
      },
      opacity: { delay: 0.6 * MULTIPLIER, duration: 0.2 * MULTIPLIER },
      overflow: { duration: 0 },
      height: { duration: 0 },
      default: { duration: 0.4 * MULTIPLIER },
    },
  }),
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
