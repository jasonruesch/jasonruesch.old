import { AnimatedRoutes, EasterEggLink, Header } from '@/components';

export function App() {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <AnimatedRoutes />
      <EasterEggLink />
    </div>
  );
}

export default App;
