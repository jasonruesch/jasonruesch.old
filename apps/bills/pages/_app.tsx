import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { BillStoreProvider } from '../lib/bill-store.context';
import './styles.css';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Bills - Jason Ruesch</title>
      </Head>
      <SessionProvider session={session}>
        <BillStoreProvider>
          <Component {...pageProps} />
        </BillStoreProvider>
      </SessionProvider>
    </>
  );
}

export default CustomApp;
