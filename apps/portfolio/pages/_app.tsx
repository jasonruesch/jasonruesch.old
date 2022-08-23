import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Beams } from '../components/Beams';
import { GitHubLink } from '../components/GitHubLink';
import { LogoImage } from '../components/LogoImage';
import { Nav } from '../components/Nav';
import { Navbar } from '../components/Navbar';
import { NavMenu } from '../components/NavMenu';
import { PageTransitions } from '../components/PageTransitions';
import { ThemeSelector } from '../components/ThemeSelector';
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
            <Navbar>
              <div className="mx-auto flex h-14 max-w-screen-lg items-center px-4 sm:h-16 sm:px-8">
                <div className="flex w-full items-center">
                  <Link href="/">
                    <a className="flex items-center">
                      <LogoImage className="h-10 w-10 lg:mr-2" />
                      <span className="hidden font-display text-3xl font-bold lg:inline">
                        Jason Ruesch
                      </span>
                    </a>
                  </Link>
                  <Nav className="mx-8 hidden sm:block" />
                  <div className="flex flex-auto items-center justify-end">
                    <ThemeSelector />
                    <GitHubLink />
                    <NavMenu className="hidden md:inline-block" />
                  </div>
                </div>
              </div>
            </Navbar>
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
