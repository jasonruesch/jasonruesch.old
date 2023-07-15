import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfileImage } from '../../components';
import { EventDetail, eventBus, homeVariants, useWindowSize } from '../../lib';

export function Home() {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();
  const [isXSmallScreen] = useWindowSize();
  const [isNavigating, setIsNavigating] = useState(true);

  const handleHoverStart = useCallback(async () => {
    controls.stop();
    controls.set('hover');
  }, [controls]);

  const handleHoverEnd = useCallback(async () => {
    controls.start('animate');
  }, [controls]);

  useEffect(() => {
    const handleNavigate = (detail: EventDetail) => {
      setIsNavigating(detail.isNavigating);
    };
    eventBus.on('navigate', handleNavigate);

    return () => {
      eventBus.off('navigate', handleNavigate);
    };
  }, []);

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
        className="mx-auto w-12 sm:w-24"
        onHoverStart={() => handleHoverStart()}
        onHoverEnd={() => handleHoverEnd()}
      >
        <NavLink
          to="/about"
          aria-label="Learn more about me"
          className="flex cursor-pointer justify-end text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
        >
          <motion.div
            initial="initial"
            custom={isXSmallScreen}
            animate={controls}
            variants={
              !shouldReduceMotion && !isNavigating ? homeVariants : undefined
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
  );
}

export default Home;
