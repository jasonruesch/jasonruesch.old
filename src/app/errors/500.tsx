import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouteError } from 'react-router-dom';

import { Beams, Header, Navbar } from '@jasonruesch/shared/ui';

export function Error500() {
  const error = useRouteError();
  console.error(error);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return !isHydrated ? null : (
    <ThemeProvider defaultTheme="system" attribute="class">
      <Header className="z-30">
        {(disclosureRenderPropArg) => (
          <Navbar
            className="relative mx-auto max-w-screen-lg px-4 sm:px-8"
            disclosureRenderPropArg={disclosureRenderPropArg}
          />
        )}
      </Header>
      <main className="flex min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
        <div className="relative z-20 mx-auto w-full max-w-screen-lg px-4 py-16 sm:px-8 sm:py-20">
          <div className="grid h-full sm:place-items-center">
            <div className="mx-auto w-full max-w-xl pt-6 sm:pt-0">
              <div className="space-y-4">
                <h1>500</h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                  You just hit an unexpected error... the horror.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Beams className="z-10" />
      </main>
    </ThemeProvider>
  );
}

export default Error500;
