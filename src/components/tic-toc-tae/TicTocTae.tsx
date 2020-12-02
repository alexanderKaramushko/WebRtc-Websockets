import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Player } from '../../server/types';
import Fields from './Fields/Fields';
import RootStore from './store/rootStore';
import StoreProvider from './StoreProvider';

const store = new RootStore();

const TicTocTae: FC = (): ReactElement => {
  const [players, setPlayers] = useState<Player[]>([]);

  function sendPlayer(player: Player, ws: WebSocket): void {
    const strPlayer = JSON.stringify(player);

    ws.send(strPlayer);
  }

  function renderOnlinePlayers(onlinePlayers: Player[]): JSX.Element[] {
    return onlinePlayers.map(({ isOnline }: Player) => <span>{isOnline && 'online'}</span>);
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    let id: string;

    ws.onopen = (): void => {
      sendPlayer({ isOnline: true }, ws);
    };

    ws.onmessage = (message): void => {
      const data = JSON.parse(message.data);

      id = data.player.id;
      setPlayers(data.players);
    };

    window.addEventListener('beforeunload', () => {
      window.navigator.sendBeacon('http://localhost:8080/player-off', JSON.stringify({ id, isOnline: false }));
      ws.close();
    });
  }, []);

  return (
    <StoreProvider store={store}>
      <Fields />
      {players.length && renderOnlinePlayers(players)}
    </StoreProvider>
  );
};

export default TicTocTae;
