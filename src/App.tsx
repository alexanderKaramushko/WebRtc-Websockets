import React, { FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import Statuses from './components/Statuses/Statuses';
import RootStore from './components/tic-toc-tae/store/rootStore';
import StoreProvider from './components/tic-toc-tae/StoreProvider';
import TicTocTae from './components/tic-toc-tae/TicTocTae';
import './styles/global.scss';

const store = new RootStore();

const App: FC = () => (
  <StoreProvider store={store}>
    <Box padding={2}>
      <Grid container>
        <Grid item xs={6}>
          <TicTocTae />
        </Grid>
        <Grid item xs={6}>
          <Statuses />
        </Grid>
      </Grid>
    </Box>
  </StoreProvider>
);

export default App;
