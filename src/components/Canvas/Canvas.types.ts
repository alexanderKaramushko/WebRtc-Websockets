import { MouseEvent } from 'react';

export interface Props {
  build: (context: CanvasRenderingContext2D) => void;
  height?: number;
  onClick: (event: MouseEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D) => void;
  width?: number;
}
