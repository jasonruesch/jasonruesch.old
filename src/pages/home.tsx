import { Page, PageNavLink } from '@/components';

import { ProfileImage } from '@/components';
import { WindowResizeContext, homeVariants } from '@/lib';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useCallback, useContext, useEffect } from 'react';

export const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const { xSmallScreen } = useContext(WindowResizeContext);

  const debugLog = useCallback(
    (name: string) => {
      console.debug(`[HomePage] ${name}`, {
        xSmallScreen,
      });
    },
    [xSmallScreen]
  );

  const stopAnimation = useCallback(async () => {
    debugLog('stopAnimation');
    controls.stop();
    controls.set('stop');
  }, [debugLog, controls]);

  const startAnimation = useCallback(async () => {
    debugLog('startAnimation');
    controls.start('animate');
  }, [debugLog, controls]);

  const resetAnimation = useCallback(async () => {
    debugLog('resetAnimation');
    await stopAnimation();
    await startAnimation();
  }, [debugLog, startAnimation, stopAnimation]);

  useEffect(() => {
    debugLog('useEffect');
    resetAnimation();
  }, [xSmallScreen, resetAnimation, debugLog]);

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
          onHoverStart={() => {
            debugLog('onHoverStart');
            stopAnimation();
          }}
          onHoverEnd={() => {
            debugLog('onHoverEnd');
            startAnimation();
          }}
        >
          <PageNavLink
            to="/about"
            aria-label="Learn more about me"
            className="flex justify-end text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
          >
            <motion.div
              initial="initial"
              animate={controls}
              exit="exit"
              custom={xSmallScreen}
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
