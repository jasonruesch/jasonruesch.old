import { useRef, useCallback, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { motion, useAnimation, Variants } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import Link from 'next/link';

export function Index() {
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
    <div className="space-y-4">
      <h1 className="dark:text-on-background text-center text-neutral-400">
        Hi, I&apos;m
        <br />
        <div className="text-primary-500 dark:text-primary-400">
          Jason Ruesch
        </div>
        and I am a<br />
        <div className="dark:text-secondary-400 text-on-background">
          Software Engineer
        </div>
        focusing on
        <br />
        Web Development and Design
      </h1>

      <Link href="/about">
        <motion.a
          onHoverStart={() => handleHoverStart()}
          onHoverEnd={() => handleHoverEnd()}
          aria-label="Learn more about me"
          className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-500 mx-auto flex w-24 cursor-pointer justify-end text-sm font-medium"
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

export async function getStaticProps() {
  return {
    props: {
      shouldShowProfileImage: true,
      shouldCenter: true,
      // theme: 'light',
    },
  };
}

export default Index;
