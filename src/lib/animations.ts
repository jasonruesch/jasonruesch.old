import {
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  Variants,
} from 'framer-motion';

export const duration = 2;

export const headerAnimations = {
  out: {
    keyFrames: { y: '-100%', opacity: 0 } as DOMKeyframesDefinition,
    options: {
      y: {
        duration: (2 / 10) * duration,
        ease: 'easeInOut',
      },
      opacity: {
        delay: (2 / 10) * duration,
        duration: 0,
      },
    } as DynamicAnimationOptions,
  },
  in: {
    keyFrames: {
      y: 0,
      opacity: 1,
    } as DOMKeyframesDefinition,
    options: {
      y: {
        delay: (6 / 10) * duration,
        duration: (2 / 10) * duration,
        ease: 'easeInOut',
      },
      opacity: {
        delay: (6 / 10) * duration,
        duration: 0,
      },
    } as DynamicAnimationOptions,
  },
};

export const pageVariants: Variants = {
  initial: ({ transparent }) => {
    return {
      ...(transparent ? { y: '-100%' } : { x: '100%' }),
      scale: 0.6,
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: '2rem',
      boxShadow: transparent
        ? 'none'
        : '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
    };
  },
  animate: () => {
    return {
      x: 0,
      y: 0,
      scale: 1,
      width: '100%',
      height: '100%',
      position: 'static',
      overflow: 'visible',
      boxShadow: 'none',
      borderRadius: '0rem',
      transition: {
        x: {
          delay: (4 / 10) * duration,
          duration: (3 / 10) * duration,
          type: 'spring',
          bounce: 0.25,
        },
        y: {
          delay: (4 / 10) * duration,
          duration: (3 / 10) * duration,
          type: 'spring',
          bounce: 0.25,
        },
        width: { delay: duration },
        height: { delay: duration },
        position: { delay: duration },
        overflow: { delay: duration },
        boxShadow: { delay: duration },
        default: {
          delay: (7 / 10) * duration,
          duration: (3 / 10) * duration,
          ease: 'backIn',
        },
      },
    };
  },
  exit: ({ transparent }) => {
    return {
      ...(transparent ? { y: '-100%' } : { x: '-100%' }),
      scale: 0.6,
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: '2rem',
      boxShadow: transparent
        ? 'none'
        : '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
      transition: {
        x: {
          delay: (3 / 10) * duration,
          duration: (3 / 10) * duration,
          ease: 'anticipate',
        },
        y: {
          delay: (3 / 10) * duration,
          duration: (3 / 10) * duration,
          ease: 'anticipate',
        },
        scale: { duration: (3 / 10) * duration, ease: 'backOut' },
        borderRadius: { duration: (3 / 10) * duration, ease: 'backOut' },
        default: { duration: 0 },
      },
    };
  },
};
