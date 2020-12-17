import React, { FC, ReactElement, useContext } from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import Avatar from '../Avatar/Avatar';
import { StoreContext } from '../tic-toc-tae/StoreProvider';

const Statuses: FC = (): ReactElement => {
  const { playersStore } = useContext(StoreContext);
  const [firstPlayer, secondPLayer] = playersStore.players;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Avatar isOnline={firstPlayer} />
      </Grid>
      <Grid item>
        <Avatar isOnline={secondPLayer} />
      </Grid>
    </Grid>
  );
};

Statuses.displayName = 'Statuses';

export default observer(Statuses);
