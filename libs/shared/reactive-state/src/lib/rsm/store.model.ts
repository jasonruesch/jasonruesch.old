/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { elfHooks, deepFreeze } from '@ngneat/elf';
import { StatusState } from './utils/elf-requests';

/**
 * Selector to quickly determine isLoading state
 */
export type StoreState = { requestStatus?: StatusState };

export type StoreSelector<T> = (s: any) => T;

/**
 * AutoFreeze store state
 */
elfHooks.registerPreStoreUpdate((_, nextState) => {
  return deepFreeze(nextState);
});
