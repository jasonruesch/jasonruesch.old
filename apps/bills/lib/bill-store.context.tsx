import { createContext, ReactNode, useContext } from 'react';
import { BillStore, createBillStore } from './bills.facade';

let store: BillStore;
if (!store) {
  store = createBillStore();
  store.getBills();
}

export const BillStoreContext = createContext<BillStore | null>(null);

export const useBillStore = () => useContext(BillStoreContext);

export interface BillStoreProviderProps {
  children: ReactNode;
}

export function BillStoreProvider({ children }: BillStoreProviderProps) {
  // const [store, setStore] = useState<BillStore | null>(null);

  // useEffect(() => {
  //   const createStore = async () => {
  //     const store = createBillStore();
  //     await store.getBills();
  //     setStore(store);
  //   };

  //   createStore();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    store && (
      <BillStoreContext.Provider value={store}>
        {children}
      </BillStoreContext.Provider>
    )
  );
}

export default BillStoreProvider;
