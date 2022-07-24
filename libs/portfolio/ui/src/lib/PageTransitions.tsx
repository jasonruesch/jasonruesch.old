import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
  in: {
    scale: 0.8,
    y: 100,
    x: '100%',
    transition: {
      duration: 0.4,
    },
  },
  center: {
    x: 0,
    scale: 0.8,
    transformOrigin: 'top',
    transition: {
      duration: 0.4,
    },
  },
  scaleUp: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.5,
    },
    // transitionEnd: {},
  },
  scaleDown: {
    scale: 0.8,
    y: 100,
    transition: {
      duration: 0.4,
    },
  },
  out: {
    opacity: 0,
    x: '-100%',
    transition: {
      duration: 0.4,
      delay: 0.5,
    },
  },
};

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs
 */
export const PageTransitions = ({ children }) => {
  const { route } = useRouter();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="effect">
      <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          key={route}
          variants={!shouldReduceMotion ? variants : null}
          initial="in"
          animate={['center', 'scaleUp']}
          exit={['scaleDown', 'out']}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
