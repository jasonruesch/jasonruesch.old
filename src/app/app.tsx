import { AnimatedRoutes, EasterEggLink, Header } from '@/components';
import {
  NavigatingContext,
  WillNavigateContext,
  WindowResizeContext,
  useNavigateEvents,
  useWindowResizeEvent,
} from '@/lib';

export function App() {
  const { navigatingValue, willNavigateValue } = useNavigateEvents();
  const windowResizeValue = useWindowResizeEvent();

  return (
    <NavigatingContext.Provider value={navigatingValue}>
      <WillNavigateContext.Provider value={willNavigateValue}>
        <WindowResizeContext.Provider value={windowResizeValue}>
          <div className="relative overflow-hidden">
            <Header />
            <AnimatedRoutes />
            <EasterEggLink />
          </div>
        </WindowResizeContext.Provider>
      </WillNavigateContext.Provider>
    </NavigatingContext.Provider>
  );
}

export default App;
