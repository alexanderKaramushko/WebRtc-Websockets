import React, { FC, ReactElement, useContext } from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import Avatar from '../Avatar/Avatar';
import { StoreContext } from '../tic-toc-tae/StoreProvider';

const Statuses: FC = (): ReactElement => {
  const { playersStore } = useContext(StoreContext);

  function renderPlayers(players: string[]): ReactElement[] {
    return players.map((player: string) => (
      <Grid key={player} item>
        <Avatar isOnline>{player}</Avatar>
      </Grid>
    ));
  }

  return (
    <Grid container spacing={2}>
      {renderPlayers(playersStore.players)}
    </Grid>
  );
};

Statuses.displayName = 'Statuses';

export default observer(Statuses);
