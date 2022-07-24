import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface ScrollOffsetSettings {
  navbarHasSecondaryNavigation?: boolean;
  navbarHasSearch?: boolean;
  mediaQuery?: string;
}

export const useScrollOffset = (settings?: ScrollOffsetSettings) => {
  const defaultSettings = {
    navbarHasSecondaryNavigation: false,
    navbarHasSearch: false,
    mediaQuery: '(min-width: 768px)',
  };
  const { navbarHasSecondaryNavigation, navbarHasSearch, mediaQuery } = {
    ...defaultSettings,
    ...settings,
  };

  const { route } = useRouter();
  const [scrollOffset, setScrollOffset] = useState(-72);
  const isMedium = useMediaQuery({ query: mediaQuery });

  useEffect(() => {
    if (
      (isMedium && navbarHasSecondaryNavigation) ||
      (!isMedium && navbarHasSearch)
    ) {
      setScrollOffset(-128);
    } else {
      setScrollOffset(-72);
    }
  }, [navbarHasSecondaryNavigation, navbarHasSearch, isMedium, route]);

  return scrollOffset;
};
