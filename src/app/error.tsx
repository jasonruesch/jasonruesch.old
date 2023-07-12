import { ThemeProvider } from 'next-themes';
import { useRouteError } from 'react-router-dom';
import { Background, Navbar } from '../components';
import { pages } from './app';

export function Error() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  console.error(error);

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <div className="relative bg-gradient-to-b from-neutral-100 via-cyan-600 to-fuchsia-600 dark:from-neutral-800 dark:via-violet-500 dark:to-teal-500">
        <Background />

        <header className="fixed inset-x-0 top-0 z-20 text-neutral-900 dark:text-neutral-50">
          <Navbar className="px-4 sm:px-8" pages={pages} />
        </header>

        <main className="relative z-10 h-screen overflow-scroll bg-neutral-100 px-4 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 sm:px-8">
          <div className="mx-auto grid h-screen max-w-xl place-content-center text-center">
            <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
              Oops
            </h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default Error;
