import { eventbus } from './event-bus';
import { PageMeta } from './page-meta';

type NavigateBus = {
  onWillNavigate: (payload: {
    page?: PageMeta;
    currentPathname: string;
  }) => void;
};

export const navigateEventChannel = eventbus<NavigateBus>();
