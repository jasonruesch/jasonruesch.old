import { useState } from 'react';
import { useOutlet } from 'react-router-dom';

const DURATION = 2;
const SCALE = 0.6;

export const ANIMATIONS_DISABLED = false;

export const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return outlet;
};

interface VariantProps {
  shouldSlideLeft?: boolean;
}

export const headerVariants = {
  initial: {
    y: '-100%',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
    opacity: 0,
  },
  animate: {
    y: 0,
    boxShadow: '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
    opacity: 1,
    transition: {
      y: {
        delay: (DURATION / 3) * 2,
        duration: DURATION / 3,
        ease: 'easeInOut',
      },
      boxShadow: {
        delay: DURATION,
        duration: 0,
      },
      opacity: {
        delay: (DURATION / 3) * 2,
        duration: 0,
      },
    },
  },
  exit: {
    y: '-100%',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
    opacity: 0,
    transition: {
      y: {
        duration: DURATION / 3,
        ease: 'easeInOut',
      },
      boxShadow: {
        duration: 0,
      },
      opacity: {
        delay: DURATION / 3,
        duration: 0,
      },
    },
  },
};

export const mainVariants = {
  initial: ({ shouldSlideLeft }: VariantProps) => ({
    x: shouldSlideLeft ? '100%' : '-100%',
    overflow: 'hidden',
    boxShadow:
      '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
    borderRadius: '2rem',
    scale: SCALE,
  }),
  animate: {
    x: 0,
    overflow: 'scroll',
    boxShadow: '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
    borderRadius: '0rem',
    scale: 1,
    transition: {
      x: {
        duration: DURATION / 2,
        type: 'spring',
      },
      overflow: {
        delay: DURATION,
        duration: 0,
      },
      boxShadow: {
        delay: DURATION,
        duration: 0,
      },
      default: {
        delay: DURATION / 2,
        duration: DURATION / 2,
        ease: 'backIn',
      },
    },
  },
  exit: ({ shouldSlideLeft }: VariantProps) => ({
    x: shouldSlideLeft ? '-100%' : '100%',
    overflow: 'hidden',
    boxShadow:
      '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
    borderRadius: '2rem',
    scale: SCALE,
    transition: {
      x: {
        delay: DURATION / 2,
        duration: DURATION / 2,
        ease: 'anticipate',
      },
      overflow: {
        duration: DURATION,
      },
      boxShadow: {
        duration: 0,
      },
      default: {
        duration: DURATION / 2,
        ease: 'backOut',
      },
    },
  }),
};
