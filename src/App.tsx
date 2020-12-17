import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import Tab from './components/Navigation/Tab/Tab';
import TabPanel from './components/Navigation/TabPanel/TabPanel';
import Statuses from './components/Statuses/Statuses';
import RootStore from './components/tic-toc-tae/store/rootStore';
import StoreProvider from './components/tic-toc-tae/StoreProvider';
import TicTocTae from './components/tic-toc-tae/TicTocTae';
import './styles/global.scss';

const store = new RootStore();

const App: FC = () => (
  <StoreProvider store={store}>
    <Box
      right={50}
      top={100}
      position="absolute"
    >
      <Statuses />
    </Box>
    <TabPanel
      tabs={[
        {
          content: <TicTocTae />,
        },
      ]}
      height="100vh"
    >
      <Tab
        label="Крестики-нолики"
        href="/tic-toc-tae"
      />
    </TabPanel>
  </StoreProvider>
);

export default App;
