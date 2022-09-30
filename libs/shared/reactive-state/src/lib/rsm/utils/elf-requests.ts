/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Store } from '@ngneat/elf';
import { pipe, defer, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

import { Entity } from '../reactive.store';
import { StoreState } from '../store.model';

export declare type StatusState = SuccessState | ErrorState | PendingState | InitializingState;
export interface SuccessState {
  value: 'success';
}
export interface PendingState {
  value: 'pending';
}
export interface InitializingState {
  value: 'initializing';
}
export interface ErrorState {
  value: 'error';
  error: unknown;
}

// ****************************************************
// Status Map Functions
// ****************************************************

export const getRequestStatus = (state: any) => {
  return state['requestStatus'] as StatusState;
};
export const getIsLoading = (s: any) => getRequestStatus(s).value === 'pending';
export const getIsReady = (s: any) => getRequestStatus(s).value !== 'initializing';

export function trackRequestStatus<S extends StoreState, T extends Entity>(
  store: Store,
  options?: { mapError?: (error: any) => any }
): MonoTypeOperatorFunction<T> {
  return function (source: Observable<T>) {
    return defer(() => {
      if (store.query(getRequestStatus).value !== 'initializing') {
        store.update(updateRequestStatus('', 'pending'));
      }

      return source.pipe(
        tap({
          error(error) {
            store.update(updateRequestStatus('', 'error', options?.mapError ? options?.mapError(error) : error));
          },
        })
      );
    });
  };
}

// ****************************************************
// Custom RxJS MonoTypeOperatorFunction(s)
// ****************************************************

export function selectRequestStatus(_: string) {
  return pipe(map(getRequestStatus), distinctUntilChanged());
}

export function selectReadyStatus(key: string) {
  return pipe(
    map(getRequestStatus),
    map((state: StatusState) => {
      return state.value !== 'initializing';
    })
  );
}

export function selectLoadingStatus(_: string) {
  return pipe(
    selectRequestStatus(_),
    map((state: StatusState) => state.value === 'pending'),
    distinctUntilChanged()
  );
}

export function selectSkeletonStatus(_: string) {
  return pipe(
    selectReadyStatus(_),
    map((isReady: boolean) => !isReady)
  );
}

export function updateRequestStatus<T extends StoreState>(_: string, flag: 'pending' | 'success' | 'initializing' | 'error', error?: any) {
  return (state: T): T => {
    return {
      ...state,
      requestStatus: resolveStatus(flag, error),
    };
  };
}

// ****************************************************
// Internal Status Utils
// ****************************************************

function resolveStatus(value: StatusState['value'], error?: any) {
  const newStatus = {
    value,
  } as StatusState;

  // NOTE: do NOT set 'success' here... that should be done
  //       as a nesting in `emitOnce()` which coalesces change notifications

  if (value === 'error') {
    (newStatus as ErrorState).error = error;
  }

  return newStatus;
}
