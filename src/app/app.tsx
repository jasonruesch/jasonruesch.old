import { AnimatedRoutes, EasterEggLink, Header } from '@/components';
import {
  NavigatingContext,
  PageAnimationsContext,
  WillNavigateContext,
  WindowResizeContext,
  useNavigateEvents,
  usePageAnimationsEvent,
  useWindowResizeEvent,
} from '@/lib';
import { ThemeProvider } from 'next-themes';

export function App() {
  const { navigatingValue, willNavigateValue } = useNavigateEvents();
  const windowResizeValue = useWindowResizeEvent();
  const pageAnimations = usePageAnimationsEvent();

  return (
    <NavigatingContext.Provider value={navigatingValue}>
      <WillNavigateContext.Provider value={willNavigateValue}>
        <WindowResizeContext.Provider value={windowResizeValue}>
          <PageAnimationsContext.Provider value={pageAnimations}>
            <ThemeProvider attribute="class">
              <div className="relative overflow-hidden">
                <Header />
                <AnimatedRoutes />
                <EasterEggLink />
              </div>
            </ThemeProvider>
          </PageAnimationsContext.Provider>
        </WindowResizeContext.Provider>
      </WillNavigateContext.Provider>
    </NavigatingContext.Provider>
  );
}

export default App;
