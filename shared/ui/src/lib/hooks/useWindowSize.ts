import { useCallback, useEffect, useState } from 'react';

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
  const [isXSmallScreen, setIsXSmallScreen] = useState(
    windowSize.width ? windowSize.width < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      const size = getWindowSize();
      setWindowSize(size);
      setIsXSmallScreen(size.width ? size.width < 640 : false);
    };

    const size = getWindowSize();
    setWindowSize(size);
    setIsXSmallScreen(size.width ? size.width < 640 : false);

    if (hasWindow) {
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow, getWindowSize]);

  return [windowSize, isXSmallScreen] as const;
}

export default useWindowSize;
