import { useState } from 'react';
import { useOutlet } from 'react-router-dom';

const DURATION = 1.5;
const SCALE = 0.6;

export const ANIMATIONS_DISABLED = false;

export const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return outlet;
};

export const homeVariants = {
  initial: (isXSmallScreen: boolean) => ({ x: !isXSmallScreen ? -24 : -16 }),
  animate: (isXSmallScreen: boolean) => ({
    x: !isXSmallScreen ? [-24, -48, 0, -24] : [-16, -32, 0, -16],
    transition: {
      delay: 0.5,
      times: [0, 0.5, 0.675, 1],
      ease: ['linear', 'linear', 'backOut'],
      duration: 0.75,
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  }),
};

interface HeaderVariantProps {
  theme: 'light' | 'dark';
  isEasterEggPage?: boolean;
}

export const headerVariants = {
  initial: ({ theme, isEasterEggPage }: HeaderVariantProps) => {
    return {
      y: '-100%',
      // backgroundColor: tw`bg-neutral-100 dark:bg-neutral-800`,
      backgroundColor: isEasterEggPage
        ? 'transparent'
        : theme === 'dark'
        ? '#262626'
        : '#f5f5f5',
      boxShadow: isEasterEggPage
        ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
        : '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
      opacity: 0,
    };
  },
  animate: ({ isEasterEggPage }: HeaderVariantProps) => {
    return {
      y: 0,
      backgroundColor: 'transparent',
      boxShadow: '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
      opacity: 1,
      transition: {
        y: {
          delay: (DURATION / 3) * 2,
          duration: DURATION / 3,
          ease: 'easeInOut',
        },
        backgroundColor: {
          delay: DURATION,
          duration: 0,
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
    };
  },
  exit: ({ theme, isEasterEggPage }: HeaderVariantProps) => {
    return {
      y: '-100%',
      // backgroundColor: tw`bg-neutral-100 dark:bg-neutral-800`,
      backgroundColor: isEasterEggPage
        ? 'transparent'
        : theme === 'dark'
        ? '#262626'
        : '#f5f5f5',
      boxShadow: isEasterEggPage
        ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
        : '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
      opacity: 0,
      transition: {
        y: {
          duration: DURATION / 3,
          ease: 'easeInOut',
        },
        backgroundColor: {
          duration: 0,
        },
        boxShadow: {
          duration: 0,
        },
        opacity: {
          delay: DURATION / 3,
          duration: 0,
        },
      },
    };
  },
};

interface MainVariantProps {
  shouldSlideRight?: boolean;
  isEasterEggPage?: boolean;
}

export const mainVariants = {
  initial: ({ shouldSlideRight, isEasterEggPage }: MainVariantProps) => {
    return {
      ...(!isEasterEggPage
        ? { x: shouldSlideRight ? '-100vw' : '100vw' }
        : { y: '-100vh' }),
      overflow: 'hidden',
      height: '100vh',
      maxHeight: '-webkit-fill-available',
      boxShadow: isEasterEggPage
        ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
        : '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
      borderRadius: '2rem',
      scale: SCALE,
    };
  },
  animate: () => {
    return {
      x: 0,
      y: 0,
      overflow: 'auto',
      height: 'auto',
      maxHeight: 'none',
      boxShadow: '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
      borderRadius: '0rem',
      scale: 1,
      transition: {
        x: {
          duration: DURATION / 2,
          type: 'spring',
        },
        y: {
          duration: DURATION / 2,
          type: 'spring',
        },
        overflow: {
          delay: DURATION,
          duration: 0,
        },
        height: {
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
    };
  },
  exit: ({ shouldSlideRight, isEasterEggPage }: MainVariantProps) => {
    return {
      ...(!isEasterEggPage
        ? { x: shouldSlideRight ? '100vw' : '-100vw' }
        : { y: '-100vh' }),
      overflow: 'hidden',
      height: '100vh',
      maxHeight: '-webkit-fill-available',
      boxShadow: isEasterEggPage
        ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
        : '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
      borderRadius: '2rem',
      scale: SCALE,
      transition: {
        x: {
          delay: DURATION / 2,
          duration: DURATION / 2,
          ease: 'anticipate',
        },
        y: {
          delay: DURATION / 2,
          duration: DURATION / 2,
          ease: 'anticipate',
        },
        overflow: {
          duration: 0,
        },
        height: {
          duration: 0,
        },
        boxShadow: {
          duration: 0,
        },
        default: {
          duration: DURATION / 2,
          ease: 'backOut',
        },
      },
    };
  },
};

export const mainInnerVariants = {
  animate: {
    y: 0,
  },
  exit: (pageScrollOffset: number) => ({
    y: `-${pageScrollOffset}px`,
    transition: {
      duration: 0,
    },
  }),
};
