import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const DURATION = 1;
const DELAY = 1.25;
const SCALE = 0.6;
const BORDER_RADIUS = '16px';

// const variants: Variants = {
//   in: {
//     height: '100vh',
//     // width: '100vh',
//     overflow: 'hidden',
//     scale: SCALE,
//     opacity: 0,
//     x: '100vw',
//     borderRadius: BORDER_RADIUS,
//     transition: {
//       duration: 0,
//     },
//   },
//   center: {
//     opacity: 1,
//     x: 0,
//     // x: 'calc((100vw / 2) - (100vh / 2))',
//     transition: {
//       duration: DURATION,
//     },
//   },
//   scaleUp: {
//     // width: 'auto',
//     scale: 1,
//     borderRadius: 0,
//     transition: {
//       duration: DURATION,
//       delay: DELAY,
//     },
//   },
//   resetPage: {
//     height: 'auto',
//     overflow: 'visible',
//     transition: {
//       duration: 0.1,
//       delay: DURATION + DELAY,
//     },
//   },
//   adjustPage: {
//     height: '100vh',
//     overflow: 'hidden',
//     transition: {
//       duration: 0,
//     },
//   },
//   scaleDown: {
//     // width: '100vh',
//     scale: SCALE,
//     borderRadius: BORDER_RADIUS,
//     transition: {
//       duration: DURATION,
//     },
//   },
//   out: {
//     opacity: 0,
//     x: '-100vw',
//     transition: {
//       duration: DURATION,
//       delay: DELAY,
//     },
//   },
// };

const variants: Variants = {
  enter: {
    x: '100vw',
    opacity: 0,
    scale: 0.6,
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30, duration: 0.4 },
      opacity: { duration: 0.2 },
      scale: { delay: 0.4, duration: 0.4 },
    },
  },
  exit: {
    zIndex: 0,
    x: '-100vw',
    opacity: 0,
    scale: 0.6,
    transition: {
      x: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: 0.4,
        duration: 0.4,
      },
      opacity: { delay: 0.4, duration: 0.2 },
      scale: { duration: 0.4 },
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
      className="overflow-hidden after:fixed after:inset-0 after:-z-[1] after:block after:h-full after:w-full
      after:bg-gradient-to-b after:from-neutral-100 after:via-cyan-500
      after:to-fuchsia-500 dark:after:from-neutral-800 dark:after:via-violet-400 dark:after:to-teal-400"
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
          variants={!shouldReduceMotion ? variants : undefined}
          initial="enter"
          // animate={['center', 'scaleUp', 'resetPage']}
          // exit={['adjustPage', 'scaleDown', 'out']}
          animate="center"
          exit="exit"
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
