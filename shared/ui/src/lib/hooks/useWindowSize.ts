import { useState, useEffect, useCallback } from 'react';

export function useWindowSize() {
  const hasWindow = typeof window !== 'undefined';

  const getWindowSize = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;

    return {
      width,
      height,
    };
  }, [hasWindow]);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    setWindowSize(getWindowSize());

    if (hasWindow) {
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow, getWindowSize]);

  return windowSize;
}

export default useWindowSize;
