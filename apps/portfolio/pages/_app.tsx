import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
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
            <Navbar />
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <main
                key={router.route}
                className="mx-auto min-h-full max-w-screen-lg px-4 sm:px-6 lg:px-8"
              >
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
