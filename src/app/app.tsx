import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { Beams, Header, Navbar, PageTransitions } from '@jasonruesch/shared/ui';
import { eventBus } from '@jasonruesch/shared/utils';

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

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navigateForward = (current: string) => {
    if (current === '/') {
      eventBus.dispatch('intendToNavigate', { to: '/about' });
      navigate('/about');
    } else if (current === '/about') {
      eventBus.dispatch('intendToNavigate', { to: '/contact' });
      navigate('/contact');
    }
  };

  const navigateBackward = (current: string) => {
    if (current === '/contact') {
      eventBus.dispatch('intendToNavigate', { to: '/about' });
      navigate('/about');
    } else if (current === '/about') {
      eventBus.dispatch('intendToNavigate', { to: '/' });
      navigate('/');
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateForward(pathname),
    onSwipedRight: () => navigateBackward(pathname),
    preventScrollOnSwipe: true,
  });

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
        <main
          className="flex min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
          {...swipeHandlers}
        >
          <div className="z-20 mx-auto w-full max-w-screen-lg px-4 sm:px-8">
            <AnimatedOutlet />
          </div>
        </main>
      </PageTransitions>
    </ThemeProvider>
  );
}

export default App;
