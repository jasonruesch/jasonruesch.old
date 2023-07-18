import { ThemeProvider } from 'next-themes';
import { useRouteError } from 'react-router-dom';
import { Navbar, TransitionBackground } from '../components';
import { pages } from '../lib';

interface RouteError {
  statusText?: string;
  message?: string;
}

export function Error() {
  const error = useRouteError() as RouteError | undefined;
  if (error) {
    console.error(error);
  }

  const errorMessage = error?.statusText || error?.message;

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <div className="relative overflow-hidden">
        <TransitionBackground />

        <header className="fixed inset-x-0 top-0 z-20 text-neutral-900 dark:text-neutral-50">
          <Navbar pages={pages} />
        </header>

        <main className="relative z-10 min-h-screen bg-neutral-100 text-neutral-900 px-safe-offset-4 dark:bg-neutral-800 dark:text-neutral-50 sm:px-safe-offset-8">
          <div className="grid min-h-screen place-items-center pb-safe-offset-8 pt-safe-offset-16 sm:pt-safe-offset-20">
            <div className="mx-auto w-full max-w-xl space-y-4 text-center">
              <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
                Oops
              </h1>
              <p>Sorry, an unexpected error has occurred.</p>

              {errorMessage ? (
                <p>
                  <i>{errorMessage}</i>
                </p>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default Error;
