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

const pageAdjustment = {
  height: '100vh',
  overflow: 'hidden',
};
const pageReset = {
  height: 'auto',
  overflow: 'visible',
};
const variants: Variants = {
  in: {
    ...pageAdjustment,
    scale: SCALE,
    x: '100%',
    transition: {
      duration: 0,
    },
  },
  center: {
    x: 0,
    transition: {
      duration: DURATION,
    },
  },
  scaleUp: {
    scale: 1,
    transition: {
      duration: DURATION,
      delay: DELAY,
    },
  },
  resetPage: {
    ...pageReset,
    transition: {
      duration: 0,
      delay: DURATION + DELAY,
    },
  },
  adjustPage: {
    ...pageAdjustment,
    transition: {
      duration: 0,
    },
  },
  scaleDown: {
    scale: SCALE,
    transition: {
      duration: DURATION,
    },
  },
  out: {
    opacity: 0,
    x: '-100%',
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
      dark:after:from-neutral-800 dark:after:via-violet-400 dark:after:to-teal-400"
    >
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          id="page"
          className={className}
          key={route}
          variants={!shouldReduceMotion ? variants : undefined}
          initial="in"
          animate={['center', 'scaleUp', 'resetPage']}
          exit={['adjustPage', 'scaleDown', 'out']}
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
