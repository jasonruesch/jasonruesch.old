import { PageTransitionVariants, duration } from './animations';

const fadeDuration = (3 / 20) * duration;

export const SimpleFadePageAnimationVariants: PageTransitionVariants = {
  pageContentVariants: {
    initial: () => {
      return {
        opacity: 0,
      };
    },
    animate: () => {
      return {
        opacity: 1,
        transition: {
          delay: fadeDuration,
          duration: fadeDuration,
        },
      };
    },
    exit: () => {
      return {
        opacity: 0,
        transition: {
          duration: fadeDuration,
        },
      };
    },
  },

  pageFooterVariants: {
    initial: () => {
      return {
        opacity: 0,
      };
    },
    animate: () => {
      return {
        opacity: 1,
        transition: {
          delay: fadeDuration,
          duration: fadeDuration,
        },
      };
    },
    exit: () => {
      return {
        opacity: 0,
        transition: {
          duration: fadeDuration,
        },
      };
    },
  },
};
