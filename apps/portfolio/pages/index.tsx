import { ChevronRightIcon } from '@heroicons/react/outline';
import Layout from '@portfolio/components/Layout';
import { ProfileImage } from '@portfolio/components/ProfileImage';
import useOnScreen from '@portfolio/hooks/useOnScreen';
import { useAnimation, Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useCallback, useEffect } from 'react';

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
    <Layout shouldCenterVertically>
      <ProfileImage large />
      <div className="space-y-4">
        <h1 className="text-neutral text-center">
          Hi, I&apos;m
          <br />
          <div className="text-primary">Jason Ruesch</div>
          and I am a<br />
          <div className="dark:text-secondary text-on-background">
            Software Engineer
          </div>
          focusing on
          <br />
          Web Development and Design
        </h1>

        <Link href="/about" scroll={false}>
          <motion.a
            onHoverStart={() => handleHoverStart()}
            onHoverEnd={() => handleHoverEnd()}
            aria-label="Learn more about me"
            className="text-primary hover:text-primary-dark mx-auto flex w-24 cursor-pointer justify-end text-sm font-medium"
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
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      // theme: 'light',
    },
  };
}

export default Index;
