import {
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  Variants,
} from 'framer-motion';
import { navigateEventChannel } from './navigate-event-channel';
import { PageMeta, getPage } from './page-meta';

let slideRight = false;

export const handleWillNavigate = ({
  page,
  currentPathname,
}: {
  page?: PageMeta;
  currentPathname: string;
}) => {
  if (page) {
    const currentPage = getPage(currentPathname);
    const currentPageIndex = currentPage?.index as number;
    slideRight = currentPageIndex > page.index;
  }
};

navigateEventChannel.on('onWillNavigate', handleWillNavigate);

export const duration = 3;

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
  initial: ({ transparent }) => {
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
        ? 'none'
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
          ? 'none'
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
      ...(transparent ? { y: '-100%' } : { x: slideRight ? '100%' : '-100%' }),
      scale: 0.6,
      width: '100vw',
      height: '100vh',
      maxHeight: '-webkit-fill-available',
      position: 'fixed',
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
    return { position: 'static' };
  },
  animate: ({ stageAnimations }) => {
    if (stageAnimations) {
      return { position: 'static' };
    }

    return { position: 'absolute', transition: { delay: duration } };
  },
  exit: () => {
    return { position: 'static', transition: { duration: 0 } };
  },
};

export const homeVariants: Variants = {
  initial: (xSmallScreen: boolean) => {
    return { x: !xSmallScreen ? -24 : -16 };
  },
  animate: (xSmallScreen: boolean) => {
    return {
      x: !xSmallScreen ? [-24, -48, 0, -24] : [-16, -32, 0, -16],
      transition: {
        delay: 0.5,
        times: [0, 0.5, 0.675, 1],
        ease: ['linear', 'linear', 'backOut'],
        duration: 0.75,
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    };
  },
};
