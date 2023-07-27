import { Page, PageNavLink } from '@/components';

import { ProfileImage } from '@/components';
import { NavigatingContext, homeVariants, useWindowSize } from '@/lib';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useCallback, useContext, useEffect, useState } from 'react';

export const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const [ready, setReady] = useState(false);
  const { navigating } = useContext(NavigatingContext);
  const [xSmallScreen] = useWindowSize();

  const stopAnimation = useCallback(async () => {
    console.debug('[HomePage] stopAnimation');

    controls.stop();
    controls.set('initial');
  }, [controls]);

  const startAnimation = useCallback(async () => {
    console.debug('[HomePage] startAnimation');

    controls.start('animate');
  }, [controls]);

  const resetAnimation = useCallback(async () => {
    console.debug('[HomePage] resetAnimation');

    await stopAnimation();
    await startAnimation();
  }, [startAnimation, stopAnimation]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    console.debug('[HomePage] navigating', navigating);

    if (navigating) {
      stopAnimation();
    } else {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigating, startAnimation, stopAnimation]);

  // Reset animation when screen size changes
  useEffect(() => {
    if (!ready) {
      return;
    }

    console.debug('[HomePage] xSmallScreen', xSmallScreen);

    resetAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xSmallScreen, resetAnimation]);

  useEffect(() => {
    if (!navigating) {
      startAnimation();
    }

    console.debug('[HomePage] ready');

    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);

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
              className="pointer-events-none w-8 -translate-x-3 sm:w-12 sm:-translate-x-6"
            >
              <ChevronDoubleRightIcon
                className="pointer-events-none h-8 w-8 sm:h-12 sm:w-12"
                aria-hidden="true"
              />
            </motion.div>
          </PageNavLink>
        </motion.div>
      </div>
    </Page>
  );
};
