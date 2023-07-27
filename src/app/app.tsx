import { AnimatedRoutes, EasterEggLink, Header } from '@/components';
import {
  NavigatingContext,
  WillNavigateContext,
  WindowResizeContext,
  useNavigateContextEvents,
  useWindowResizeContextEvent,
} from '@/lib';

export function App() {
  const { navigatingValue, willNavigateValue } = useNavigateContextEvents();
  const windowResizeValue = useWindowResizeContextEvent();

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
