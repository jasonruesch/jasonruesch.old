import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Expenses</title>
      </Head>
      <main className="bg-neutral-50 min-h-screen p-4">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
