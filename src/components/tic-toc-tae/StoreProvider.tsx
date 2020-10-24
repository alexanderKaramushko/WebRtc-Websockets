import React, { createContext, FC, ReactElement, ReactNode } from 'react';
import RootStore from './store/rootStore';

interface Props {
    children: ReactNode;
    store: RootStore;
}

export const StoreContext = createContext<RootStore>({} as RootStore);

const StoreProvider: FC<Props> = ({ children, store }): ReactElement => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export default StoreProvider;
