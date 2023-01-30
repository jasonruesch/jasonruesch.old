import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { useOutlet } from 'react-router-dom';

import { Beams, Header, Navbar, PageTransitions } from '@jasonruesch/shared/ui';

const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return outlet;
};

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
            className="relative mx-auto max-w-screen-lg px-4 sm:px-8"
            disclosureRenderPropArg={disclosureRenderPropArg}
          />
        )}
      </Header>
      <Beams className="z-10" />
      <PageTransitions>
        <main className="flex min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
          <div className="z-20 mx-auto w-full max-w-screen-lg px-4 sm:px-8">
            <AnimatedOutlet />
          </div>
        </main>
      </PageTransitions>
    </ThemeProvider>
  );
}

export default App;
