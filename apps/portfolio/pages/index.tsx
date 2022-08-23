import { ChevronRightIcon } from '@heroicons/react/outline';
import { motion, useAnimation, Variants } from 'framer-motion';
import Link from 'next/link';
import { useRef, useCallback, useEffect } from 'react';
import { ProfileImage } from '../components/ProfileImage';

export function Index() {
  const el = useRef<HTMLDivElement>(null);
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
    <div className="grid h-full place-content-center py-16 sm:py-20">
      <ProfileImage large className="pb-4" />

      <h1 className="text-center text-neutral-500 dark:text-neutral-400">
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
        focusing on
        <br />
        Web Development and Design
      </h1>

      <Link href="/about">
        <motion.a
          onHoverStart={() => handleHoverStart()}
          onHoverEnd={() => handleHoverEnd()}
          aria-label="Learn more about me"
          className="mx-auto flex w-24 cursor-pointer justify-end text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
        >
          <motion.div
            ref={el}
            initial="initial"
            animate={controls}
            variants={variants}
            className="w-12 -translate-x-6"
          >
            <ChevronRightIcon className="h-12 w-12" aria-hidden="true" />
          </motion.div>
        </motion.a>
      </Link>
    </div>
  );
}

export default Index;
