import { MouseEvent } from 'react';

export interface Props {
  build: () => void;
  height?: number;
  onClick: (event: MouseEvent<HTMLCanvasElement>) => void;
  width?: number;
}
