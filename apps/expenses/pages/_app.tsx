import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push({
      pathname: '/login',
      query: {
        redirect: router.asPath,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Expenses</title>
      </Head>
      <header className="bg-neutral-200 flex justify-end p-4">
        <button
          type="button"
          className="rounded-md border border-black bg-white px-4 py-2"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </header>
      <main className="bg-neutral-50 min-h-screen p-4">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
