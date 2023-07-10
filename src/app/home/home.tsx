import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { NavLink, ProfileImage, useWindowSize } from '@jasonruesch/shared/ui';
import { eventBus } from '@jasonruesch/shared/utils';
import {
  Variants,
  motion,
  useAnimation,
  useReducedMotion,
} from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const [, isXSmallScreen] = useWindowSize();
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();
  const [isNavigating, setIsNavigating] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventBus.on('isNavigating', ({ isNavigating }: any) => {
    setIsNavigating(isNavigating);
  });

  const variants: Variants = {
    initial: (isXSmallScreen) => ({ x: !isXSmallScreen ? -24 : -12 }),
    hover: (isXSmallScreen) => ({ x: !isXSmallScreen ? -24 : -12 }),
    animate: (isXSmallScreen) => ({
      x: !isXSmallScreen ? [-24, -48, 0, -24] : [-12, -24, 0, -12],
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

  const handleHoverStart = useCallback(async () => {
    controls.stop();
    controls.set('hover');
  }, [controls]);

  const handleHoverEnd = useCallback(async () => {
    controls.start('animate');
  }, [controls]);

  // Pause animation when navigating
  useEffect(() => {
    if (isNavigating) {
      handleHoverStart();
    } else {
      handleHoverEnd();
    }
  }, [isNavigating, handleHoverStart, handleHoverEnd]);

  // Reset animation when screen size changes
  useEffect(() => {
    handleHoverStart();
    handleHoverEnd();
  }, [isXSmallScreen, handleHoverStart, handleHoverEnd]);

  return (
    <div className="grid h-full place-items-center">
      <div className="mx-auto max-w-xl w-full">
        <ProfileImage large className="mb-4" />

        <h1 className="mb-4 text-center text-neutral-500 dark:text-neutral-400">
          Hi, I&apos;m
          <br />
          <span className="text-cyan-500 dark:text-violet-400">
            Jason Ruesch
          </span>
          <br />
          and I am a
          <br />
          <span className="text-neutral-900 dark:text-teal-400">
            Software Engineer
          </span>
          <br />
          focusing on
          <br />
          Web Development and Design
        </h1>

        <motion.div
          onHoverStart={() => handleHoverStart()}
          onHoverEnd={() => handleHoverEnd()}
        >
          <NavLink
            to="/about"
            aria-label="Learn more about me"
            className="mx-auto flex w-12 cursor-pointer justify-end text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500 sm:w-24"
          >
            <motion.div
              initial="initial"
              custom={isXSmallScreen}
              animate={controls}
              variants={
                !shouldReduceMotion && !isNavigating ? variants : undefined
              }
              className="w-6 -translate-x-3 sm:w-12 sm:-translate-x-6"
            >
              <ChevronDoubleRightIcon
                className="h-6 w-6 sm:h-12 sm:w-12"
                aria-hidden="true"
              />
            </motion.div>
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
