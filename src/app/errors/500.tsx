import { useRouteError } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

import { Beams, Header, Navbar } from '@jasonruesch/shared/ui';

export function Error500() {
  const error = useRouteError();
  console.error(error);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return !isHydrated ? null : (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      // forcedTheme={pageProps.theme || null}
    >
      <Header className="z-30">
        {(disclosureRenderPropArg) => (
          <Navbar
            className="relative mx-auto max-w-screen-lg px-4 sm:px-8"
            disclosureRenderPropArg={disclosureRenderPropArg}
          />
        )}
      </Header>
      <Beams className="z-10" />
      <main className="flex min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
        <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-8">
          <div className="mx-auto grid h-full max-w-xl pt-16 pb-4 sm:place-items-center sm:py-20">
            <div className="w-full">
              <div className="space-y-4">
                <h1>500</h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                  You just hit an unexpected error... the horror.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default Error500;
