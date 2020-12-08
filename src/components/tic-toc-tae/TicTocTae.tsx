import React, { FC, ReactElement, useEffect, useState } from 'react';
import Fields from './Fields/Fields';
import RootStore from './store/rootStore';
import StoreProvider from './StoreProvider';

const store = new RootStore();

const TicTocTae: FC = (): ReactElement => {
  const [players, setPlayers] = useState(0);

  function renderPlayers(playersCount: number): JSX.Element[] {
    const playersFill = new Array(playersCount).fill(null);

    return playersFill.map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={index}>
        player
        {' '}
        {index}
      </span>
    ));
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.addEventListener('message', (message) => {
      const { data } = message;

      if (data === 'ping') {
        ws.send('pong');
      } else {
        setPlayers(+data);
      }
    });
  }, []);

  return (
    <StoreProvider store={store}>
      <Fields />
      {players && renderPlayers(players)}
    </StoreProvider>
  );
};

export default TicTocTae;
