import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Navbar from '@/components/Navbar';
import Beams from '@/components/Beams';
import profileImage from '@/images/jasonruesch-512.png';
import profileDarkImage from '@/images/jasonruesch-dark-512.png';

import '../styles/tailwind.css';

function CustomApp({ Component, pageProps, router }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const {
    theme,
    shouldCenter = false,
    shouldShowProfileImage = false,
    shouldShowSearch = false,
    secondaryNavigation = null,
  } = pageProps;

  const searchInput: string = router.query.q
    ? Array.isArray(router.query.q)
      ? router.query.q[0]
      : router.query.q
    : '';
  pageProps.searchInput = searchInput;

  return (
    <>
      <Head>
        <title>Jason Ruesch</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        forcedTheme={theme || null}
      >
        {isHydrated && (
          <>
            <Beams className="print:hidden" />
            <Navbar
              className="min-h-16 fixed top-0 z-40 w-full px-2 print:hidden sm:px-6 lg:px-8"
              secondaryNavigation={secondaryNavigation}
              shouldShowSearch={shouldShowSearch}
            />
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <main
                key={router.route}
                className={clsx(
                  shouldShowSearch ? 'pt-32' : 'pt-18',
                  secondaryNavigation
                    ? 'md:pt-32'
                    : shouldShowSearch
                    ? 'md:pt-18'
                    : '',
                  'w-full px-4 pb-4 print:pt-4 sm:px-6 lg:px-8',
                  shouldCenter
                    ? 'sm-min-h:absolute sm-min-h:top-1/2 sm-min-h:left-1/2 sm-min-h:-translate-y-1/2 sm-min-h:-translate-x-1/2 sm-min-h:pt-4'
                    : ''
                )}
              >
                {shouldShowProfileImage && (
                  <figure
                    className={clsx(
                      'relative mx-auto mb-4 h-36 w-36 overflow-hidden rounded-full ring-2 ring-black/10 dark:ring-black',
                      shouldCenter ? 'sm:sm-min-h:h-72 sm:sm-min-h:w-72' : ''
                    )}
                  >
                    <Image
                      layout="fill"
                      src={profileImage}
                      alt="Jason Ruesch"
                      className="dark:hidden"
                      priority
                    />
                    <Image
                      layout="fill"
                      src={profileDarkImage}
                      alt="Jason Ruesch"
                      className="hidden dark:block"
                      priority
                    />
                  </figure>
                )}

                <Component {...pageProps} />
              </main>
            </AnimatePresence>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
