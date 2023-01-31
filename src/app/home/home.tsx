import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import {
  motion,
  useAnimation,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { useRef, useCallback, useEffect } from 'react';
import { ProfileImage, NavLink } from '@jasonruesch/shared/ui';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const el = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();

  const variants: Variants = {
    initial: { x: -24 },
    hover: { x: -24 },
    animate: {
      x: [-24, -48, 0, -24],
      transition: {
        delay: 0.5,
        times: [0, 0.5, 0.675, 1],
        ease: ['linear', 'linear', 'backOut'],
        duration: 0.75,
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  };

  const handleHoverStart = useCallback(async () => {
    controls.stop();
    controls.set('hover');
  }, [controls]);

  const handleHoverEnd = useCallback(async () => {
    controls.start('animate');
  }, [controls]);

  useEffect(() => {
    controls.start('animate');
  }, [controls]);

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
          className="mx-auto flex w-24 cursor-pointer justify-end text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
        >
          <motion.div
            onHoverStart={() => handleHoverStart()}
            onHoverEnd={() => handleHoverEnd()}
          >
            <motion.div
              ref={el}
              initial="initial"
              animate={controls}
              variants={!shouldReduceMotion ? variants : undefined}
              className="w-12 -translate-x-6"
            >
              <ChevronDoubleRightIcon
                className="h-12 w-12"
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
