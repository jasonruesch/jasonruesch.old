import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import {
  motion,
  useAnimation,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { ProfileImage, NavLink, useWindowSize } from '@jasonruesch/shared/ui';
import { eventBus } from '@jasonruesch/shared/utils';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const { width } = useWindowSize();
  const isXSmallScreen = width && width < 640;
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

  useEffect(() => {
    if (isNavigating) {
      controls.stop();
      controls.set('hover');
    } else {
      controls.start('animate');
    }
  }, [controls, isNavigating]);

  return (
    <div className="mx-auto grid h-full max-w-xl place-items-center py-16 sm:py-20">
      <div className="w-full">
        <ProfileImage large className="pb-4" />

        <h1 className="text-center text-neutral-500 dark:text-neutral-400">
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

        <NavLink
          to="/about"
          aria-label="Learn more about me"
          className="mx-auto flex w-12 cursor-pointer justify-end text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500 sm:w-24"
        >
          <motion.div
            onHoverStart={() => handleHoverStart()}
            onHoverEnd={() => handleHoverEnd()}
          >
            <motion.div
              initial="initial"
              custom={isXSmallScreen}
              animate={controls}
              variants={!shouldReduceMotion ? variants : undefined}
              className="w-6 -translate-x-3 sm:w-12 sm:-translate-x-6"
            >
              <ChevronDoubleRightIcon
                className="h-6 w-6 sm:h-12 sm:w-12"
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
