import {
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  Variants,
} from 'framer-motion';

/** Duration in seconds */
export const duration = 3;

export const headerAnimations = {
  out: {
    keyFrames: { y: '-100%', opacity: 0 } as DOMKeyframesDefinition,
    options: {
      y: {
        duration: (2 / 10) * duration,
        ease: 'easeOut',
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
        ease: 'easeIn',
      },
      opacity: {
        delay: (6 / 10) * duration,
        duration: 0,
      },
    } as DynamicAnimationOptions,
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
          ease: ['easeOut', 'easeInOut', 'backOut'],
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

export type PageAnimationType = 'fade' | 'slide';

export interface PageAnimationVariants {
  pageVariants: Variants;
  pageScrollVariants: Variants;
  pageContentVariants?: Variants;
  pageFooterVariants?: Variants;
}
