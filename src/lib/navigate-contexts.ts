import { createContext } from 'react';

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
