import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import { ThemeProvider } from 'next-themes';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
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
        {isHydrated && <Component {...pageProps} />}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
