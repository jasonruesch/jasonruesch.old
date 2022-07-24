import { PageTransitions } from '@portfolio/ui';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import '../styles/tailwind.css';
import '../styles/transitions.css';

function CustomApp({ Component, pageProps }: AppProps) {
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
            <header
              id="header"
              className="fixed inset-x-0 top-0 z-40 print:hidden"
            ></header>
            <PageTransitions>
              <Component {...pageProps} />
            </PageTransitions>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
