import React, { FC, ReactElement, useEffect, MouseEvent } from 'react';
import { Props } from './Canvas.types';

const defaultProps: Pick<Props, 'height' | 'width'> = {
  height: 200,
  width: 200,
};

const Canvas: FC<Props> = (props): ReactElement => {
  const { build, height, onClick, width } = props;
  let canvas: HTMLCanvasElement | null = null;

  function getCanvasRef(ref: HTMLCanvasElement): void {
    canvas = ref;
  }

  function handleClick(event: MouseEvent<HTMLCanvasElement>): void {
    const context = (canvas as HTMLCanvasElement).getContext('2d');

    if (context) {
      onClick(event, context);
    }
  }

  useEffect(() => {
    const context = (canvas as HTMLCanvasElement).getContext('2d');

    if (context) {
      build(context);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);

  return (
    <canvas
      height={height}
      id="canvas"
      onClick={handleClick}
      ref={getCanvasRef}
      width={width}
    />
  );
};

Canvas.defaultProps = defaultProps;

export default Canvas;
