import React, { FC, ReactElement } from 'react';
import classnames from 'classnames';
import { Avatar as MuiAvatar } from '@material-ui/core';
import { Props } from './Avatar.types';
import styles from './style.module.scss';

const Avatar: FC<Props> = ({ isOnline }): ReactElement => {
  const classNames = classnames(
    styles.avatar,
    {
      [styles.online]: isOnline,
    },
  );

  return (
    <MuiAvatar className={classNames} />
  );
};

Avatar.displayName = 'Avatar';

export default Avatar;
