import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfileImage } from '../../components';
import {
  EventDetail,
  aboutPage,
  eventBus,
  homeVariants,
  useWindowSize,
} from '../../lib';

export function Home() {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const [isXSmallScreen] = useWindowSize();
  const [isNavigating, setIsNavigating] = useState<boolean | undefined>(true);

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

  useEffect(() => {
    const handleNavigate = ({ isNavigating }: EventDetail) => {
      setIsNavigating(isNavigating);
    };
    const handleOpenChange = ({ isOpen }: EventDetail) => {
      if (isOpen) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    eventBus.on('navigate', handleNavigate);
    eventBus.on('navbar:openChange', handleOpenChange);

    return () => {
      eventBus.off('navigate', handleNavigate);
      eventBus.off('navbar:openChange', handleOpenChange);
    };
  }, [stopAnimation, startAnimation]);

  // Pause animation when navigating
  useEffect(() => {
    if (isNavigating) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }, [isNavigating, stopAnimation, startAnimation]);
  // Reset animation when screen size changes
  useEffect(() => {
    resetAnimation();
  }, [isXSmallScreen, resetAnimation]);

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 text-center">
      <ProfileImage large />

      <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
        Hi, I&apos;m
        <br />
        <span className="text-cyan-500 dark:text-violet-400">Jason Ruesch</span>
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
        <NavLink
          to="/about"
          aria-label="Learn more about me"
          className="flex justify-end text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
          onMouseOver={() =>
            eventBus.dispatch('willNavigate', { page: aboutPage })
          }
          onTouchStart={() =>
            eventBus.dispatch('willNavigate', { page: aboutPage })
          }
        >
          <motion.div
            initial={false}
            custom={isXSmallScreen}
            animate={controls}
            variants={
              !shouldReduceMotion && !isNavigating ? homeVariants : undefined
            }
            className="w-8 -translate-x-3 sm:w-12 sm:-translate-x-6"
          >
            <ChevronDoubleRightIcon
              className="h-8 w-8 sm:h-12 sm:w-12"
              aria-hidden="true"
            />
          </motion.div>
        </NavLink>
      </motion.div>
    </div>
  );
}

export default Home;
