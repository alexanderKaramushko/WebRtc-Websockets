import React, { FC, ReactElement, useContext } from 'react';
import Canvas from '../Canvas';
import { StoreContext } from '../StoreProvider';

export const Fields: FC = (): ReactElement => {
  const { fieldsStore } = useContext(StoreContext);
  const { fields } = fieldsStore;

  return (
    <Canvas
      fields={fields}
      width={300}
      height={300}
    />
  );
};
