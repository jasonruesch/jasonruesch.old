import { Page } from './page';

export type EventType = 'navigate' | 'willNavigate' | 'navbar:openChange';
export interface CustomEventListener {
  (detail: EventDetail): void;
}
export interface EventDetail {
  isNavigating?: boolean;
  page?: Page;
  isOpen?: boolean;
}

export const eventBus = {
  on(type: EventType, listener: CustomEventListener) {
    document.addEventListener(type, (e: Event) =>
      listener((e as CustomEvent).detail)
    );
  },
  dispatch(type: EventType, detail: Partial<EventDetail>) {
    document.dispatchEvent(new CustomEvent(type, { detail }));
  },
  off(type: EventType, listener: CustomEventListener) {
    document.removeEventListener(type, (e: Event) =>
      listener((e as CustomEvent).detail)
    );
  },
};
