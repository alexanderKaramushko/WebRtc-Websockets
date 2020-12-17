import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { StoreContext } from './StoreProvider';
import Fields from './Fields/Fields';

const TicTocTae: FC = (): ReactElement => {
  const { playersStore } = useContext(StoreContext);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.addEventListener('message', (message) => {
      const { data } = message;

      if (data === 'ping') {
        ws.send('pong');
      } else {
        const onlinePlayers = new Array(+data).fill(true);

        playersStore.updatePlayers(onlinePlayers);
      }
    });
  }, []);

  return (
    <Fields />
  );
};

export default TicTocTae;
