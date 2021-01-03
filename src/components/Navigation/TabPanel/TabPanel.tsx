import React, { ChangeEvent, FC, ReactElement, useState } from 'react';
import { AppBar, Tabs } from '@material-ui/core';
import TabContent from '../TabContent/TabContent';
import { Props, Tab } from './TabPanel.types';

const TabPanel: FC<Props> = (props): ReactElement => {
  const { children, tabs, height } = props;
  const [value, setValue] = useState(0);

  const handleChange = (_: ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue);
  };

  const renderTabs = (items: Tab[]): ReactElement[] =>
    items.map<ReactElement>((item: Tab, index: number): ReactElement => {
      const { content } = item;

      return (
        <div key={content?.toString()} style={{ height }}>
          {value === index && (
            <TabContent>
                {content}
            </TabContent>
          )}
        </div>
      );
    });

  return (
    <>
      <AppBar position="fixed">
        <Tabs
          onChange={handleChange}
          value={value}
          variant="fullWidth"
        >
          {children}
        </Tabs>
      </AppBar>
      {renderTabs(tabs)}
    </>
  );
};

export default TabPanel;