import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

import { ChevronRightIcon } from '@heroicons/react/outline';
import { motion, useAnimation, Variants } from 'framer-motion';

import { useOnScreen } from '../hooks';

export function Home() {
  const el = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(el);
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
    if (isOnScreen) {
      controls.start('animate');
    } else {
      controls.stop();
    }
  }, [isOnScreen, controls]);

  return (
    <>
      <h1 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        Hi! I&apos;m
        <br />
        <span className="text-primary">Jason Ruesch</span>
        <br />
        and I am a<br />
        <span className="text-secondary">Software Engineer</span>
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
          className="text-link hover:text-link-hover mx-auto flex w-24 cursor-pointer justify-end text-sm font-medium sm-max-h:hidden"
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
    </>
  );
}

export default Home;
