import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

export const AnimatedOutlet = ({ context }: { context?: unknown }) => {
  const o = useOutlet(context);
  const [outlet] = useState(o);

  return outlet;
};

export const AnimatedRoutes = () => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence initial={false}>
      <AnimatedOutlet key={pathname} />
    </AnimatePresence>
  );
};
