import { createContext } from 'react';

export interface WillNavigate {
  slideRight: boolean;
}

export const WillNavigateContext = createContext<WillNavigate>({
  slideRight: false,
});
