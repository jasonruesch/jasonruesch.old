import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import { ThemeProvider } from 'next-themes';

import { AnimatePresence } from 'framer-motion';

import { Beams, Layout, Navbar } from '../components';
import './styles.css';

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
              <Layout key={router.route}>
                <Component {...pageProps} />
              </Layout>
            </AnimatePresence>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
