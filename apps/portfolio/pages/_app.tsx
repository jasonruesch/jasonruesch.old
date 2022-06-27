import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import profileImage from '@/images/profile.png';
import '../styles/tailwind.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function CustomApp({ Component, pageProps, router }: AppProps) {
  const isHome = router.pathname === '/';

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

        <main
          className={classNames(
            isHome ? 'flex flex-col justify-center' : '',
            'mx-auto min-h-full max-w-7xl overflow-hidden p-4 pt-16 sm:px-6 lg:px-8'
          )}
        >
          <div
            className={classNames(
              'relative mx-auto mb-4 h-36 w-36 rounded-full bg-cyan-500 dark:bg-violet-400',
              isHome ? 'sm:h-72 sm:w-72' : ''
            )}
          >
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
