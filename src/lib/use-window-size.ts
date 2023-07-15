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

  const [isXSmallScreen, setIsXSmallScreen] = useState(false);

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        const windowSize = getWindowSize();
        setIsXSmallScreen(windowSize.width ? windowSize.width < 640 : false);
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow, getWindowSize]);

  return [isXSmallScreen] as const;
}

export default useWindowSize;
