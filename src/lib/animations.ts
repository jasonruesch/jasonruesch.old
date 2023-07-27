import {
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  Variants,
} from 'framer-motion';

/** Duration in seconds */
export const duration = 2.5;

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
    keyFrames: { y: 0, opacity: 1 } as DOMKeyframesDefinition,
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
  initial: ({ transparent, slideRight }) => {
    return {
      ...(transparent ? { y: '-100%' } : { x: slideRight ? '-100%' : '100%' }),
      scale: 0.6,
      width: '100vw',
      height: '100vh',
      maxHeight: '-webkit-fill-available',
      position: 'fixed',
      overflow: 'hidden',
      borderRadius: '2rem',
      boxShadow: transparent
        ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
        : '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
    };
  },
  animate: ({ transparent, stageAnimations }) => {
    if (stageAnimations) {
      return {
        scale: 0.6,
        width: '100vw',
        height: '100vh',
        maxHeight: '-webkit-fill-available',
        position: 'fixed',
        overflow: 'hidden',
        borderRadius: '2rem',
        boxShadow: transparent
          ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
          : '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
      };
    }

    return {
      x: 0,
      y: 0,
      scale: 1,
      width: '100%',
      height: '100%',
      maxHeight: 'none',
      position: 'static',
      overflow: 'visible',
      boxShadow: '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
      borderRadius: '0rem',
      transition: {
        x: {
          delay: (4 / 10) * duration,
          duration: (3 / 10) * duration,
          type: 'spring',
        },
        y: {
          delay: (4 / 10) * duration,
          duration: (3 / 10) * duration,
          type: 'spring',
        },
        width: { delay: duration },
        height: { delay: duration },
        maxHeight: { delay: duration },
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
  exit: ({ transparent, slideRight }) => {
    return {
      ...(transparent ? { y: '-100%' } : { x: slideRight ? '100%' : '-100%' }),
      scale: 0.6,
      width: '100vw',
      height: '100vh',
      maxHeight: '-webkit-fill-available',
      position: 'fixed',
      overflow: 'hidden',
      borderRadius: '2rem',
      boxShadow: transparent
        ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
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

export const innerPageVariants: Variants = {
  animate: () => {
    return { y: 0 };
  },
  exit: () => {
    return { y: `-${window.scrollY}px` };
  },
};

export const footerVariants: Variants = {
  initial: () => {
    return { scale: 0 };
  },
  animate: ({ stageAnimations }) => {
    if (stageAnimations) {
      return { scale: 0 };
    }

    return {
      scale: 1,
      // A little extra delay to make sure the page is ready
      transition: {
        scale: {
          delay: (11 / 10) * duration,
          duration: 0.3,
          type: 'spring',
          bounce: 0.5,
        },
      },
    };
  },
  exit: () => {
    return {
      scale: 0,
      transition: {
        scale: { duration: 0 },
      },
    };
  },
};

export const homeVariants: Variants = {
  initial: (xSmallScreen: boolean) => {
    return { opacity: 0, x: !xSmallScreen ? -24 : -16 };
  },
  stop: (xSmallScreen: boolean) => {
    return { x: !xSmallScreen ? -24 : -16 };
  },
  animate: (xSmallScreen: boolean) => {
    return {
      opacity: 1,
      x: !xSmallScreen ? [-24, -48, 0, -24] : [-16, -32, 0, -16],
      transition: {
        opacity: {
          delay: duration,
          duration: 0.5,
        },
        x: {
          delay: 0.5,
          times: [0, 0.5, 0.675, 1],
          ease: ['linear', 'linear', 'backOut'],
          duration: 0.75,
          repeat: Infinity,
          repeatDelay: 0.5,
        },
      },
    };
  },
  exit: (xSmallScreen: boolean) => {
    return {
      opacity: 0,
      x: !xSmallScreen ? -24 : -16,
      transition: {
        opacity: { duration: 0 },
        x: { duration: 0 },
      },
    };
  },
};
