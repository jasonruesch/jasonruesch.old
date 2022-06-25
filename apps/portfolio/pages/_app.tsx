import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
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
        <header className="sticky top-0 z-40">
          <Navbar />
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
            <Component {...pageProps} />
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
