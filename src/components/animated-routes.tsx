import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { AnimatedOutlet } from './animated-outlet';

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <main className="relative h-full">
      <AnimatePresence initial={false}>
        <AnimatedOutlet key={location.pathname} />
      </AnimatePresence>
    </main>
  );
};
