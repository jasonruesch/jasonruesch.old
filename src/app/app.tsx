import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Beams, Header, Navbar, PageTransitions } from '@jasonruesch/shared/ui';

export function App() {
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
            className="mx-auto max-w-screen-lg px-4 sm:px-8"
            disclosureRenderPropArg={disclosureRenderPropArg}
          />
        )}
      </Header>
      <Beams className="z-10" />
      <PageTransitions>
        <main className="flex min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
          <div className="z-20 mx-auto w-full max-w-screen-lg px-4 sm:px-8">
            <Outlet />
          </div>
        </main>
      </PageTransitions>
    </ThemeProvider>
  );
}

export default App;
