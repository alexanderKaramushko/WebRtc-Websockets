import React, { FC, ReactElement } from 'react';
import { Tab as MaterialTab } from '@material-ui/core';
import { Props } from './Tab.types';

const defaultProps: Props = {
  href: '#',
  label: '',
};

const Tab: FC<Props> = ({ href, label, ...props }): ReactElement => (
  <MaterialTab
    component="a"
    href={href}
    label={label}
    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
      event.preventDefault();
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

Tab.displayName = 'Tab';
Tab.defaultProps = defaultProps;

export default Tab;
