import React, { FC, ReactElement } from 'react';
import { Props } from './TabContent.types';
import styles from './style.module.scss';

const TabContent: FC<Props> = ({ children }): ReactElement => (
  <div role="tabpanel" className={styles.content}>
    {children}
  </div>
);

TabContent.displayName = 'TabContent';

export default TabContent;
