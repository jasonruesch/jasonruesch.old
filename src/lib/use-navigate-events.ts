import { createContext, useEffect, useState } from 'react';
import { navigateEventChannel } from './navigate-event-channel';
import { getPage } from './page-meta';

export interface NavigatingValue {
  navigating: boolean;
}

export interface WillNavigateValue {
  slideRight: boolean;
}

export const NavigatingContext = createContext<NavigatingValue>({
  navigating: false,
});

export const WillNavigateContext = createContext<WillNavigateValue>({
  slideRight: false,
});

export const useNavigateEvents = () => {
  const [navigatingValue, setNavigatingValue] = useState<NavigatingValue>({
    navigating: false,
  });
  const [willNavigateValue, setWillNavigateValue] = useState<WillNavigateValue>(
    {
      slideRight: false,
    }
  );

  useEffect(() => {
    const unsubscribeOnNavigateStart = navigateEventChannel.on(
      'onNavigateStart',
      () => setNavigatingValue({ navigating: true })
    );
    const unsubscribeOnNavigateEnd = navigateEventChannel.on(
      'onNavigateEnd',
      () => setNavigatingValue({ navigating: false })
    );

    const unsubscribeOnWillNavigate = navigateEventChannel.on(
      'onWillNavigate',
      ({ page, pathname }) => {
        if (page) {
          const currentPage = getPage(pathname);
          const currentPageIndex = currentPage?.index as number;
          const slideRight = currentPageIndex > page.index;
          setWillNavigateValue({ slideRight });
        }
      }
    );

    return () => {
      unsubscribeOnNavigateStart();
      unsubscribeOnNavigateEnd();

      unsubscribeOnWillNavigate();
    };
  }, []);

  return { navigatingValue, willNavigateValue };
};
