import React, { FC, ReactElement } from 'react';
import { Fields } from './Field/Field';
import RootStore from './store/rootStore';
import StoreProvider from './StoreProvider';

const store = new RootStore();

const TicTocTae: FC = (): ReactElement => (
  <StoreProvider store={store}>
    <Fields />
  </StoreProvider>
);

export default TicTocTae;
