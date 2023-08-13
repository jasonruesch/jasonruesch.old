import { AnimatedRoutes, EasterEggLink, Header } from '@/components';
import {
  NavigatingContext,
  PageTransitionContext,
  WillNavigateContext,
  WindowResizeContext,
  useNavigateEvents,
  usePageTransitionEvent,
  useWindowResizeEvent,
} from '@/lib';
import { ThemeProvider } from 'next-themes';

export function App() {
  const { navigatingValue, willNavigateValue } = useNavigateEvents();
  const windowResizeValue = useWindowResizeEvent();
  const pageTransition = usePageTransitionEvent();

  return (
    <NavigatingContext.Provider value={navigatingValue}>
      <WillNavigateContext.Provider value={willNavigateValue}>
        <WindowResizeContext.Provider value={windowResizeValue}>
          <PageTransitionContext.Provider value={pageTransition}>
            <ThemeProvider attribute="class">
              <div className="relative overflow-hidden">
                <Header />
                <AnimatedRoutes />
                <EasterEggLink />
              </div>
            </ThemeProvider>
          </PageTransitionContext.Provider>
        </WindowResizeContext.Provider>
      </WillNavigateContext.Provider>
    </NavigatingContext.Provider>
  );
}

export default App;
