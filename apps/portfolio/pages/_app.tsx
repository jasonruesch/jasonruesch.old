import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import { ThemeProvider } from 'next-themes';

import { Beams, Layout, Navbar, PageTransitions } from '../components';

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
        {isHydrated && (
          <>
            <Beams />
            <Navbar />
            <PageTransitions>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PageTransitions>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
