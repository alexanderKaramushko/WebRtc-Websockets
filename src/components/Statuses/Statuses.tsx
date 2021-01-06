import React, { FC, ReactElement, useContext } from 'react';
import uniq from 'lodash/uniq';
import { observer } from 'mobx-react';
import { Box, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Avatar from '../Avatar/Avatar';
import { StoreContext } from '../tic-toc-tae/StoreProvider';

const Statuses: FC = (): ReactElement => {
  const { playersStore, peersStore } = useContext(StoreContext);
  const { peerStatuses } = peersStore;

  function renderPlayers(players: string[]): ReactElement[] {
    return players.map((player: string) => (
      <Grid key={player} item>
        <Avatar isOnline>{player}</Avatar>
      </Grid>
    ));
  }

  function renderPeerStatuses(statuses: string[]): ReactElement[] {
    return uniq(statuses).map((status: string) => (
      <Box key={status} mt={2} ml="auto" maxWidth={300}>
        <Alert
          variant="outlined"
        >
          {status}
        </Alert>
      </Box>
    ));
  }

  return (
    <>
      <Grid
        spacing={2}
        container
        justify="flex-end"
      >
        {renderPlayers(playersStore.players)}
      </Grid>
      {renderPeerStatuses(peerStatuses)}
    </>
  );
};

Statuses.displayName = 'Statuses';

export default observer(Statuses);
