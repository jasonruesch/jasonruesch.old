/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint prefer-spread: "off" */
import { Observable, MonoTypeOperatorFunction, EMPTY } from 'rxjs';

import { emitOnce, Store, createStore, withProps } from '@ngneat/elf';
import {
  withEntities,
  withActiveIds,
  upsertEntities,
  resetActiveIds,
  getActiveIds,
  setActiveIds,
  getEntity,
  getAllEntities,
} from '@ngneat/elf-entities';

import { StatusState } from './utils/elf-requests';
import { StoreSelector, StoreState } from './store.model';
import {
  trackRequestStatus,
  updateRequestStatus,
  selectLoadingStatus,
  selectSkeletonStatus,
  selectRequestStatus,
  selectReadyStatus,
} from './utils/elf-requests';

export interface Entity {
  id: string;
}

/**
 *
 * Reactive Store without pagination
 * Supports single entity collection, selections, and status tracking
 */
export class ReactiveStore<T extends StoreState, K extends Entity> {
  protected _store: Store = {} as Store;

  public status$: Observable<StatusState> = EMPTY;
  public isLoading$: Observable<boolean> = EMPTY; // pending activity
  public isReady$: Observable<boolean> = EMPTY; // initial loads and full refreshes
  public showSkeleton$: Observable<boolean> = EMPTY; // store never 'loaded', show idle!

  get selectedIDs(): string[] {
    return this._store.query(getActiveIds);
  }

  get selectedItems(): K[] {
    return this._store.query(getActiveIds).map((id) => this._store.query(getEntity(id)));
  }

  /**
   * Store constructor
   * @param storeName
   * @param initState
   */
  constructor(protected storeName: string, protected initState: () => T) {
    /**
     * Create store and streams for  status$ and state$
     * Note: state$ includes computed properties and pagination
     */
    this._store = createStore(
      { name: storeName }, // store name
      withProps<T>({ ...initState(), requestStatus: { value: 'initializing' } }), // Store State
      withEntities<K>(), // entity collection for Items
      withActiveIds() // support selections of 0...n entity items
    );

    this.status$ = this._store.pipe(selectRequestStatus(storeName));
    this.isReady$ = this._store.pipe(selectReadyStatus(storeName));
    this.isLoading$ = this._store.pipe(selectLoadingStatus(storeName));
    this.showSkeleton$ = this._store.pipe(selectSkeletonStatus(storeName));
  }

  /**********************************************
   * Store Methods
   **********************************************/

  /**
   * Add page of items WITHOUT changing active page or pagination information
   */
  upsertItems(items: K[], reset = false) {
    emitOnce(() => {
      if (reset === true) this.reset();
      this._store.update(upsertEntities(items));
    });
  }

  /**
   * Query support for snapshots of current internal store state...
   * synchronously extract state value using selector
   */
  useQuery<T>(selector: StoreSelector<T>): T {
    return this._store.query<T>(selector);
  }

  /**
   * Is the specified item in memory (regardless of page location)
   * NOTE: 'id' may be the full ID or a partial GUID (from URL)
   */
  findItemByID<T extends Entity>(id: string): T | undefined {
    const findByPartialID = () => {
      const allEntities = this.useQuery<Entity[]>(getAllEntities());
      const usePartialIDMatch = ((it: T): boolean => it.id.startsWith(id)) as any;

      return allEntities.find(usePartialIDMatch);
    };
    return this.useQuery(getEntity(id)) || findByPartialID();
  }

  reset() {
    this._store.update(this.initState, resetActiveIds(), updateRequestStatus(this.storeName, 'initializing'));
  }

  showSkeleton(visible = true) {
    this.updateStatus(visible ? 'initializing' : 'success');
  }

  /**********************************************
   * Selection Methods
   **********************************************/

  clearAllSelections(): void {
    this._store.update(resetActiveIds());
  }

  /**
   * Select an item as 'active'
   * Remove any other selections if clearAll === true
   */
  selectItem(id: string, clearAll = true) {
    if (!id) return;

    const clearActives = clearAll ? resetActiveIds : () => (s: T) => s;
    const actives = clearAll ? [] : this._store.query(getActiveIds);
    const isActive = actives.indexOf(id) < 0;

    if (!isActive || clearAll) {
      this._store.update(clearActives(), setActiveIds([...actives, id]));
    }
  }

  /**********************************************
   * Status Features
   **********************************************/

  /**
   * Create RxJS operator to easily track REST calls
   * Specify a 'mapError' function to transform or log the error
   * NOTE: this is used in the Facade with HTTP service calls
   */
  trackLoadStatus(mapError?: (error: any) => any): MonoTypeOperatorFunction<any> {
    mapError = mapError || ((error: any) => error);
    return trackRequestStatus(this._store, { mapError });
  }

  /**
   * Easily update the status of the ReactiveStore
   * 'busy'|'succes'|'initializing'|'error' for store activity
   *
   * @see https://ngneat.github.io/elf/docs/features/requests/requests-status/#updaterequestsstatus
   */
  updateStatus(flag: 'success' | 'initializing' | 'pending' | 'error', error?: any) {
    this._store.update(updateRequestStatus(this.storeName, flag, error)); // eslint-disable prefer-spread
  }

  /**
   * 'busy' | 'success' for store activity
   */
  setLoading(isLoading = true) {
    this._store.update(updateRequestStatus(this.storeName, isLoading ? 'pending' : 'success'));
  }
}
