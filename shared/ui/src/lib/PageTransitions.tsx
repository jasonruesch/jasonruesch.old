import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const DURATION = 0.4;
const DELAY = 0.5;
const SCALE = 0.6;
const BORDER_RADIUS = '16px';

const variants: Variants = {
  in: {
    height: '100vh',
    // width: '100vh',
    overflow: 'hidden',
    scale: SCALE,
    opacity: 0,
    originX: 0.5,
    x: '100vw',
    borderRadius: BORDER_RADIUS,
    transition: {
      duration: 0,
    },
  },
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION,
    },
  },
  scaleUp: {
    // width: 'auto',
    scale: 1,
    borderRadius: 0,
    transition: {
      duration: DURATION,
      delay: DELAY,
    },
  },
  resetPage: {
    height: 'auto',
    overflow: 'visible',
    transition: {
      duration: 0.1,
      delay: DURATION + DELAY,
    },
  },
  adjustPage: {
    height: '100vh',
    overflow: 'hidden',
    transition: {
      duration: 0,
    },
  },
  scaleDown: {
    // width: '100vh',
    scale: SCALE,
    borderRadius: BORDER_RADIUS,
    transition: {
      duration: DURATION,
    },
  },
  out: {
    opacity: 0,
    x: '-100vw',
    transition: {
      duration: DURATION,
      delay: DELAY,
    },
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
  const { pathname: route } = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="after:fixed after:inset-0 after:-z-[1] after:block after:h-full after:w-full after:bg-gradient-to-b
      after:from-neutral-100 after:via-cyan-500 after:to-fuchsia-500
      dark:after:from-neutral-800 dark:after:via-violet-400 dark:after:to-teal-400 overflow-hidden"
    >
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          id="page"
          key={route}
          className={className}
          initial="in"
          animate={['center', 'scaleUp', 'resetPage']}
          exit={['adjustPage', 'scaleDown', 'out']}
          variants={!shouldReduceMotion ? variants : undefined}
          onAnimationComplete={(definition) => {
            if (definition === 'resetPage') {
              setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const page = document.getElementById('page')!;
                page.style.transform = 'none';
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
