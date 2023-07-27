import { AnimatedRoutes, EasterEggLink, Header } from '@/components';
import {
  NavigatingContext,
  WillNavigateContext,
  WindowResizeContext,
  useNavigateEvents,
  useWindowResizeEvent,
} from '@/lib';
import { ThemeProvider } from 'next-themes';

export function App() {
  const { navigatingValue, willNavigateValue } = useNavigateEvents();
  const windowResizeValue = useWindowResizeEvent();

  return (
    <NavigatingContext.Provider value={navigatingValue}>
      <WillNavigateContext.Provider value={willNavigateValue}>
        <WindowResizeContext.Provider value={windowResizeValue}>
          <ThemeProvider attribute="class">
            <div className="relative overflow-hidden">
              <Header />
              <AnimatedRoutes />
              <EasterEggLink />
            </div>
          </ThemeProvider>
        </WindowResizeContext.Provider>
      </WillNavigateContext.Provider>
    </NavigatingContext.Provider>
  );
}

export default App;
