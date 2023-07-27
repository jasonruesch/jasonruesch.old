import { createContext, useEffect, useState } from 'react';

const smallScreenWidth = 640;

export interface WindowResizeValue {
  xSmallScreen: boolean;
}

export const WindowResizeContext = createContext<WindowResizeValue>({
  xSmallScreen: window.innerWidth < smallScreenWidth,
});

export const useWindowResizeEvent = () => {
  const [windowResizeValue, setWindowResizeValue] = useState<WindowResizeValue>(
    {
      xSmallScreen: window.innerWidth < smallScreenWidth,
    }
  );

  useEffect(() => {
    const handleResize = () => {
      const xs = window.innerWidth < smallScreenWidth;
      if (xs !== windowResizeValue.xSmallScreen)
        setWindowResizeValue({
          xSmallScreen: xs,
        });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowResizeValue.xSmallScreen]);

  return windowResizeValue;
};
