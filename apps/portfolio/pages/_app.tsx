import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
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
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
