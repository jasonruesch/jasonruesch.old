import { eventbus } from './event-bus';
import { PageMeta } from './page-meta';

type NavigateBus = {
  onWillNavigate: (payload: { page?: PageMeta; pathname: string }) => void;

  onNavigateStart: () => void;
  onNavigateEnd: () => void;
};

export const navigateEventChannel = eventbus<NavigateBus>();
