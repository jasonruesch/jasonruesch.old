import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { getBills } from '../lib/bills.facade';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      <Head>
        <title>Welcome to bills!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
