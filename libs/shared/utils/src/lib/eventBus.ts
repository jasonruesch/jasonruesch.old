/* eslint-disable @typescript-eslint/no-explicit-any */
export const eventBus = {
  on(event: any, callback: any) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event: any, data: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: any, callback: any) {
    document.removeEventListener(event, callback);
  },
};
