import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { getBills } from '../lib/bills.facade';
import './styles.css';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      <Head>
        <title>Bills - Jason Ruesch</title>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default CustomApp;
