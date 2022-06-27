import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Beams from '@/components/Beams';

import '../styles/tailwind.css';

function CustomApp({ Component, pageProps }: AppProps) {
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
        <Beams />
        <Navbar />

        <main className="mx-auto h-full max-w-7xl overflow-hidden p-4 sm:px-6 lg:px-8">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
