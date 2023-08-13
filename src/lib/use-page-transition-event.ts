import { createContext, useState } from 'react';
import { PageTransitionType } from './animations/animations';

export const PageTransitionContext = createContext<
  [PageTransitionType, (type: PageTransitionType) => void]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(['fade', () => {}]);

export const usePageTransitionEvent = (): [
  PageTransitionType,
  (type: PageTransitionType) => void
] => {
  const [pageTransitionType, setType] = useState<PageTransitionType>(
    (localStorage.getItem('pageTransitionType') as PageTransitionType) || 'fade'
  );

  const setPageTransitionType = (type: PageTransitionType) => {
    localStorage.setItem('pageTransitionType', type);
    setType(type);
  };

  return [pageTransitionType, setPageTransitionType];
};
