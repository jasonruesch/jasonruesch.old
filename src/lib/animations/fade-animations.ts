import { PageTransitionVariants, duration } from './animations';

const scale = 0.5;

export const FadePageAnimationVariants: PageTransitionVariants = {
  pageVariants: {
    initial: ({ transparent }) => {
      return {
        opacity: 0,
        scale,
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
          scale,
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
        opacity: 1,
        scale: 1,
        width: '100%',
        height: '100%',
        maxHeight: 'none',
        position: 'static',
        overflow: 'visible',
        boxShadow: '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
        borderRadius: '0rem',
        transition: {
          opacity: {
            delay: (5 / 10) * duration,
            duration: 0,
          },
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
    exit: ({ transparent }) => {
      return {
        opacity: 0,
        scale,
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
          opacity: {
            delay: (5 / 10) * duration,
            duration: 0,
          },
          scale: { duration: (3 / 10) * duration, ease: 'backOut' },
          borderRadius: { duration: (3 / 10) * duration, ease: 'backOut' },
          default: { duration: 0 },
        },
      };
    },
  },

  pageScrollVariants: {
    animate: () => {
      return { y: 0 };
    },
    exit: () => {
      return { y: `-${window.scrollY}px` };
    },
  },

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
          delay: (5 / 10) * duration,
          duration: (3 / 10) * duration,
        },
      };
    },
    exit: () => {
      return {
        opacity: 0,
        transition: {
          delay: (2 / 10) * duration,
          duration: (3 / 10) * duration,
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
          delay: (5 / 10) * duration,
          duration: (3 / 10) * duration,
        },
      };
    },
    exit: () => {
      return {
        opacity: 0,
        transition: {
          delay: (2 / 10) * duration,
          duration: (3 / 10) * duration,
        },
      };
    },
  },
};
