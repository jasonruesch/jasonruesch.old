import { Page, PageNavLink } from '@/components';

import { ProfileImage } from '@/components';
import { homeVariants, useWindowSize } from '@/lib';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect } from 'react';

export const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const [xSmallScreen] = useWindowSize();

  const stopAnimation = useCallback(async () => {
    controls.stop();
    controls.set('initial');
  }, [controls]);

  const startAnimation = useCallback(async () => {
    controls.start('animate');
  }, [controls]);

  const resetAnimation = useCallback(async () => {
    await stopAnimation();
    await startAnimation();
  }, [startAnimation, stopAnimation]);

  // Reset animation when screen size changes
  useEffect(() => {
    resetAnimation();
  }, [xSmallScreen, resetAnimation]);

  return (
    <Page hideFooter>
      <div className="mx-auto w-full max-w-xl space-y-4 text-center">
        <ProfileImage large />

        <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
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
          with focus on
          <br />
          Web Development and Design
        </h1>

        <motion.div
          className="mx-auto w-16 sm:w-24"
          onHoverStart={() => stopAnimation()}
          onHoverEnd={() => startAnimation()}
        >
          <PageNavLink
            to="/about"
            aria-label="Learn more about me"
            className="flex justify-end text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
          >
            <motion.div
              initial={false}
              custom={xSmallScreen}
              animate={controls}
              variants={shouldReduceMotion ? undefined : homeVariants}
              className="w-8 -translate-x-3 sm:w-12 sm:-translate-x-6"
            >
              <ChevronDoubleRightIcon
                className="h-8 w-8 sm:h-12 sm:w-12"
                aria-hidden="true"
              />
            </motion.div>
          </PageNavLink>
        </motion.div>
      </div>
    </Page>
  );
};
