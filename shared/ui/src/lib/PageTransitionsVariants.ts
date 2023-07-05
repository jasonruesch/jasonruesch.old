import { Variants } from 'framer-motion';

const scale = 0.6;

export const variants: Variants = {
  hidden: ({ windowSize, isNavigating, slideRight, shouldReduceMotion }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const opacityAnimation = {
      opacity: 0,
    };
    const otherAnimations = {
      x: slideRight
        ? `-${windowSize.width * scale}px`
        : `${windowSize.width}px`,
      overflow: 'hidden',
      borderRadius: '16px',
      height: `${windowSize.height}px`,
      width: `${height}px`,
      scale,
    };

    return isNavigating
      ? {
          ...opacityAnimation,
          ...(!shouldReduceMotion ? otherAnimations : {}),
        }
      : {};
  },
  enter: ({
    windowSize,
    isNavigating,
    slideRight,
    duration,
    shouldReduceMotion,
  }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const centerX = windowSize.width / 2 - height / 2;
    const x = [
      slideRight ? `-${windowSize.width * scale}px` : `${windowSize.width}px`,
      `${centerX}px`,
      '0px',
    ];
    const opacityAnimation = { opacity: 1 };
    const otherAnimations = {
      x,
      overflow: 'visible',
      borderRadius: '0',
      height: 'auto',
      width: 'auto',
      scale: 1,
    };
    const opacityTransition = {
      opacity: !shouldReduceMotion ? { duration: duration / 3 } : { duration },
    };
    const otherTransitions = {
      x: {
        duration,
        times: [0, 0.5, 1],
      },
      overflow: { delay: duration, duration: 0.1 },
      borderRadius: { delay: duration, duration: 0.1 },
      height: { delay: duration, duration: 0.1 },
      width:
        windowSize.width < windowSize.height
          ? { delay: duration, duration: 0.1 }
          : { delay: duration / 2, duration: duration / 2 },
      default: { delay: duration / 2, duration: duration / 2 },
    };

    return isNavigating
      ? {
          ...opacityAnimation,
          ...(!shouldReduceMotion ? otherAnimations : {}),
          transition: {
            ...opacityTransition,
            ...(!shouldReduceMotion ? otherTransitions : {}),
          },
        }
      : {};
  },
  exit: ({ windowSize, slideRight, duration, shouldReduceMotion }) => {
    const height = Math.min(windowSize.width, windowSize.height);
    const centerX = windowSize.width / 2 - height / 2;
    const x = [
      '0px',
      `${centerX}px`,
      slideRight ? `${windowSize.width}px` : `-${windowSize.width * scale}px`,
    ];
    const opacityAnimation = { opacity: 0 };
    const otherAnimations = {
      x,
      overflow: 'hidden',
      borderRadius: '16px',
      height: `${windowSize.height}px`,
      width: `${height}px`,
      scale,
    };
    const opacityTransition = {
      opacity: !shouldReduceMotion
        ? { delay: 2 * (duration / 3), duration: duration / 3 }
        : { duration },
    };
    const otherTransitions = {
      x: {
        duration,
        times: [0, 0.5, 1],
      },
      overflow: { duration: 0 },
      borderRadius: { duration: 0 },
      height: { duration: 0 },
      width:
        windowSize.width < windowSize.height
          ? { duration: 0 }
          : { duration: duration / 2 },
      default: { duration: duration / 2 },
    };

    return {
      ...opacityAnimation,
      ...(!shouldReduceMotion ? otherAnimations : {}),
      transition: {
        ...opacityTransition,
        ...(!shouldReduceMotion ? otherTransitions : {}),
      },
    };
  },
};
