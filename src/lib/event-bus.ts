export type EventType = 'navigate';
export interface CustomEventListener {
  (detail: EventDetail): void;
}
export interface EventDetail {
  isNavigating: boolean;
}

export const eventBus = {
  on(type: EventType, listener: CustomEventListener) {
    document.addEventListener(type, (e: Event) =>
      listener((e as CustomEvent).detail)
    );
  },
  dispatch(type: EventType, detail: EventDetail) {
    document.dispatchEvent(
      new CustomEvent(type, {
        detail: {
          ...detail,
          isNavigating: type === 'navigate' ? detail.isNavigating : false,
        },
      })
    );
  },
  off(type: EventType, listener: CustomEventListener) {
    document.removeEventListener(type, (e: Event) =>
      listener((e as CustomEvent).detail)
    );
  },
};
