import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Props } from './TabContent.types';

const TabContent: FC<Props> = ({ children }): ReactElement => (
  <div role="tabpanel">
    <Box p={3}>
      <Typography>{children}</Typography>
    </Box>
  </div>
);

TabContent.displayName = 'TabContent';

export default TabContent;
