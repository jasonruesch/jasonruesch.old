import { createContext, useState } from 'react';
import { PageAnimationType } from './animations/animations';

export const PageAnimationsContext = createContext<
  [PageAnimationType, (type: PageAnimationType) => void]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(['fade', () => {}]);

export const usePageAnimationsEvent = (): [
  PageAnimationType,
  (type: PageAnimationType) => void
] => {
  const [pageAnimationType, setType] = useState<PageAnimationType>(
    (localStorage.getItem('pageAnimationType') as PageAnimationType) || 'fade'
  );

  const setPageAnimationType = (type: PageAnimationType) => {
    localStorage.setItem('pageAnimationType', type);
    setType(type);
  };

  return [pageAnimationType, setPageAnimationType];
};
