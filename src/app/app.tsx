import { AnimatedRoutes, EasterEggLink, Header } from '@/components';
import {
  NavigatingContext,
  WillNavigateContext,
  useNavigateContextsEvents,
} from '@/lib';

export function App() {
  const { navigatingValue, willNavigateValue } = useNavigateContextsEvents();

  return (
    <NavigatingContext.Provider value={navigatingValue}>
      <WillNavigateContext.Provider value={willNavigateValue}>
        <div className="relative overflow-hidden">
          <Header />
          <AnimatedRoutes />
          <EasterEggLink />
        </div>
      </WillNavigateContext.Provider>
    </NavigatingContext.Provider>
  );
}

export default App;
