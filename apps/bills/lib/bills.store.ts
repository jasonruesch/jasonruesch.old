import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Bill } from './bill.model';
import { api } from './bills.api';

export interface BillStore {
  // State
  bills: Bill[];
  hasError: boolean;
  isLoading: boolean;

  // API
  loadAll: () => void;
  loadById: (id: string) => Promise<Bill>;
  add: (bill: Partial<Bill>) => void;
  update: (bill: Bill) => void;
  remove: (bill: Bill) => void;
}

// ****************************************
// Private Zustand Instances
// ****************************************

const initState = () => ({
  bills: [],
  hasError: false,
  isLoading: false,
});

const isLoading = (status: boolean) => (state: BillStore) => {
  state.isLoading = status;
};

export function makeBillStore() {
  return createStore<BillStore>()(
    immer((set, get) => ({
      ...initState(),

      loadAll: async (): Promise<Bill[]> => {
        let { bills } = get();

        if (!bills.length) {
          set(isLoading(true));

          bills = await api.getAll();
          set((state) => {
            state.bills = bills;
            state.isLoading = false;
          });
        }
        return bills;
      },

      loadById: async (id: string): Promise<Bill> => {
        let bill = get().bills.find((b) => b.id === id);

        if (!bill) {
          set(isLoading(true));

          bill = await api.get(id);
          if (bill) {
            set((state) => {
              state.bills = [...new Set([...state.bills, bill])];
              state.isLoading = false;
            });
          }
        }
        return bill;
      },

      add: async (bill: Partial<Bill>): Promise<boolean> => {
        set(isLoading(true));

        const createdBill = await api.create(bill);
        if (createdBill) {
          set((state) => {
            state.bills = [...state.bills, createdBill];
            state.isLoading = false;
          });
        }
        return !!createdBill;
      },

      update: async (bill: Bill): Promise<boolean> => {
        set(isLoading(true));

        const updatedBill = await api.update(bill);
        if (updatedBill) {
          set((state) => {
            const filteredBills = state.bills.filter(
              (b) => b.id !== updatedBill.id
            );
            state.bills = [...filteredBills, updatedBill];
            state.isLoading = false;
          });
        }
        return !!updatedBill;
      },

      remove: async (bill: Bill): Promise<boolean> => {
        set(isLoading(true));

        const success = await api.delete(bill);
        if (success) {
          set((state) => {
            state.bills = state.bills.filter((b) => b.id !== bill.id);
            state.isLoading = false;
          });
        }
        return success;
      },
    }))
  );
}

/**
 * Global singleton store
 */
const store = makeBillStore();

store.getState().loadAll();

export function useBillStore(): BillStore {
  return useStore(store);
}
