import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/tailwind.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jason Ruesch</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
