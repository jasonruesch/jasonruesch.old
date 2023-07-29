import { PageAnimationVariants, duration } from './animations';

export const SlidePageAnimationVariants = {
  pageVariants: {
    initial: ({ transparent, slideRight }) => {
      return {
        opacity: 0,
        ...(transparent
          ? { y: '-100%' }
          : { x: slideRight ? '-100%' : '100%' }),
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
        opacity: 1,
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
          opacity: {
            duration: 0,
          },
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
        opacity: 0,
        ...(transparent
          ? { y: '-100%' }
          : { x: slideRight ? '100%' : '-100%' }),
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
          opacity: {
            delay: (5 / 10) * duration,
            duration: 0,
          },
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
  },

  pageScrollVariants: {
    animate: () => {
      return { y: 0 };
    },
    exit: () => {
      return { y: `-${window.scrollY}px` };
    },
  },
} satisfies PageAnimationVariants;
