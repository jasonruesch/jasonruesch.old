import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Beams } from '../components/Beams';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { PageTransitions } from '../components/PageTransitions';
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
            <Header className="z-30">
              <div className="mx-auto flex h-14 max-w-screen-lg items-center px-4 sm:h-16 sm:px-8">
                <Navbar />
              </div>
            </Header>
            <Beams className="z-10" />
            <PageTransitions>
              <main className="flex min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
                <div className="z-20 mx-auto w-full max-w-screen-lg py-16 px-4 sm:py-20 sm:px-8">
                  <Component {...pageProps} />
                </div>
              </main>
            </PageTransitions>
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
