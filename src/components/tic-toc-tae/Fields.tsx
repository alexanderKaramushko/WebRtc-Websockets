import React, { FC, ReactElement, useContext } from 'react';
import { StoreContext } from './StoreProvider';

export const Fields: FC = (): ReactElement => {
  const { fieldsStore } = useContext(StoreContext);
  const { changeFields } = fieldsStore;

  return (
    <button type="button" onClick={changeFields}>
      FIelds
    </button>
  );
};
