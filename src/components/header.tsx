import { easterEggId, headerAnimations } from '@/lib';
import { useAnimate } from 'framer-motion';
import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { pathname } = useLocation();
  const [scope, animate] = useAnimate();

  const handleAnimation = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href.endsWith(pathname)) {
        return;
      }

      await animate(
        scope.current,
        headerAnimations.out.keyFrames,
        headerAnimations.out.options
      );
      await animate(
        scope.current,
        headerAnimations.in.keyFrames,
        headerAnimations.in.options
      );
    },
    [scope, animate, pathname]
  );

  return (
    <header ref={scope} className="fixed inset-x-0 z-20">
      <nav className="flex h-12 items-center space-x-4 pt-safe px-safe-offset-4">
        <Link to="/" onClick={handleAnimation}>
          Home
        </Link>
        <Link to="/about" onClick={handleAnimation}>
          About
        </Link>
        <Link to="/contact" onClick={handleAnimation}>
          Contact
        </Link>
        <Link to="/privacy" onClick={handleAnimation}>
          Privacy
        </Link>
        <Link to={`/easter-egg/${easterEggId}`} onClick={handleAnimation}>
          Easter Egg
        </Link>
      </nav>
    </header>
  );
};
