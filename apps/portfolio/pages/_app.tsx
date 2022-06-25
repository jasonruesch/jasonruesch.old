import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import profileImage from '@/images/profile.png';
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
        <Navbar />

        <main className="mx-auto max-w-7xl p-4 pt-16 sm:px-6 lg:px-8">
          <div className="relative mx-auto mb-5 h-36 w-36 rounded-full bg-cyan-500 dark:bg-teal-400 sm:h-72 sm:w-72">
            <Image
              src={profileImage}
              alt="Jason Ruesch"
              layout="fill"
              unoptimized
              priority
            />
          </div>

          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
