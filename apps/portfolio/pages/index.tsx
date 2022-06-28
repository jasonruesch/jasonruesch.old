import ProfileImage from '@/components/ProfileImage';
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
    <div className="sm-h:min-h-0 sm-h:pt-16 sm-h:pb-4 flex min-h-screen flex-col justify-center">
      <ProfileImage className="sm-h:mt-4 mx-auto mb-4" isHome />
      <motion.section
        layoutId="content"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ ease: 'easeInOut' }}
      >
        <h1 className="font-display mb-4 text-center text-2xl font-bold sm:text-4xl">
          Hi, I&apos;m
          <br />
          <div className="text-primary">Jason Ruesch</div>
          and I am a<br />
          <div className="text-secondary">Software Engineer</div>
          focusing on
          <br />
          Web Development and Design
        </h1>

        <Link href="/about">
          <motion.a
            onHoverStart={() => handleHoverStart()}
            onHoverEnd={() => handleHoverEnd()}
            aria-label="Learn more about me"
            className="text-primary sm-h:hidden mx-auto flex w-24 cursor-pointer justify-end text-sm font-medium"
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
      </motion.section>
    </div>
  );
}

/**
 * Example of forcing a theme on the page.
 */
// export async function getServerSideProps() {
//   return {
//     props: { theme: 'light' },
//   };
// }

export default Index;
