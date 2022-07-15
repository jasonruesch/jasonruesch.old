import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        forcedTheme={pageProps.theme || null}
      >
        {isHydrated && (
          <>
            <Beams className="print:hidden" />
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Component key={router.route} {...pageProps} />
            </AnimatePresence>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
