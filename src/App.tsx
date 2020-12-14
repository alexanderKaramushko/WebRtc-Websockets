import React, { FC } from 'react';
import Tab from './components/Navigation/Tab/Tab';
import TabPanel from './components/Navigation/TabPanel/TabPanel';
import TicTocTae from './components/tic-toc-tae/TicTocTae';

const App: FC = () => (
  <TabPanel
    tabs={[
      {
        content: <TicTocTae />,
      },
    ]}
  >
    <Tab
      label="Крестики-нолики"
      href="/tic-toc-tae"
    />
    <Tab
      label="Coming soon..."
      href="/in-progress"
    />
  </TabPanel>
);

export default App;
