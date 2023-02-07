import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Inter, Alegreya_Sans_SC } from '@next/font/google';
import { Beams, Header, Navbar, PageTransitions } from '@jasonruesch/web/ui';

import '../styles/tailwind.css';
import 'focus-visible';

const inter = Inter({ subsets: ['latin'] });
const alegreyaSansSC = Alegreya_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '800', '900'],
});

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function CustomApp({ Component, pageProps, router }: AppProps) {
  const previousPathname = usePrevious(router.pathname);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return !isHydrated ? null : (
    <>
      <Head>
        <title>Jason Ruesch</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <style jsx global>
        {`
          :root {
            --inter-font: ${inter.style.fontFamily};
            --alegreya-sans-sc-font: ${alegreyaSansSC.style.fontFamily};
          }
        `}
      </style>
      <ThemeProvider defaultTheme="system" attribute="class">
        <Header className="z-30">
          {(disclosureRenderPropArg) => (
            <Navbar
              className="relative mx-auto max-w-screen-lg px-4 sm:px-8"
              disclosureRenderPropArg={disclosureRenderPropArg}
            />
          )}
        </Header>
        <PageTransitions>
          <main className="flex min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
            <Beams className="z-10" />
            <div className="relative z-20 mx-auto w-full max-w-screen-lg px-4 sm:px-8">
              <Component previousPathname={previousPathname} {...pageProps} />
            </div>
          </main>
        </PageTransitions>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
