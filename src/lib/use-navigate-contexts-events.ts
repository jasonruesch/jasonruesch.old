import { useEffect, useState } from 'react';
import { NavigatingValue, WillNavigateValue } from './navigate-contexts';
import { navigateEventChannel } from './navigate-event-channel';
import { getPage } from './page-meta';

export const useNavigateContextsEvents = () => {
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
