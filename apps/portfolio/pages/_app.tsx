import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import Navbar from '@/components/Navbar';
import Beams from '@/components/Beams';

import '../styles/tailwind.css';

function CustomApp({ Component, pageProps, router }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <Head>
        <title>Jason Ruesch</title>
      </Head>
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        forcedTheme={pageProps.theme || null}
      >
        {isHydrated && (
          <>
            <Beams />
            <Navbar className="min-h-16 fixed top-0 z-40 w-full px-2 sm:px-6 lg:px-8" />
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <main
                key={router.route}
                className={clsx(
                  'px-2 pt-16 pb-4 sm:px-6 lg:px-8',
                  pageProps.shouldCenter
                    ? 'sm-h:!static sm-h:!top-0 sm-h:!left-0 sm-h:!translate-y-0 sm-h:!translate-x-0 sm-h:!pt-16 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 sm:pt-4'
                    : 'mx-auto w-full max-w-screen-sm'
                )}
              >
                {!pageProps.hideProfileImage && (
                  <motion.figure
                    layoutId="profile-image"
                    className={clsx(
                      'ring-offset-surface border-primary mx-auto mb-4 h-36 w-36 overflow-hidden rounded-full border-2 ring-0 ring-inset ring-offset-8',
                      pageProps.shouldCenter
                        ? 'sm-h:!h-36 sm-h:!w-36 sm:h-72 sm:w-72 sm:border-4 sm:ring-offset-[16px]'
                        : '',
                      'bg-primary dark:from-primary dark:to-secondary dark:bg-gradient-to-b'
                    )}
                  >
                    <motion.img
                      initial={{ rotate: -180 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      src="/images/profile.png"
                      alt="Jason Ruesch"
                    />
                  </motion.figure>
                )}

                <motion.section
                  layoutId="content"
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ ease: 'easeInOut' }}
                >
                  <Component {...pageProps} />
                </motion.section>
              </main>
            </AnimatePresence>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
