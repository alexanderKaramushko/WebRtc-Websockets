import React, { FC, ReactElement, useEffect, useRef, MouseEvent, useContext } from 'react';
import { observer } from 'mobx-react';
import { Props } from './Canvas.types';
import { StoreContext } from '../tic-toc-tae/StoreProvider';

const defaultProps: Pick<Props, 'height' | 'width'> = {
  height: 200,
  width: 200,
};

const Canvas: FC<Props> = (props): ReactElement => {
  const { canvasStore } = useContext(StoreContext);
  const {
    build,
    height,
    onClick,
    width,
  } = props;
  const { canvasContext, setCanvasContext } = canvasStore;

  const canvas = useRef<HTMLCanvasElement | null>(null);

  function handleClick(event: MouseEvent<HTMLCanvasElement>): void {
    if (canvasContext) {
      onClick(event);
    }
  }

  useEffect(() => {
    const context = (canvas.current as HTMLCanvasElement).getContext('2d');

    if (context) {
      setCanvasContext(context);
    }
  }, []);

  useEffect(() => {
    if (canvasContext) {
      build();
    }
  }, [canvasContext]);

  return (
    <canvas
      height={height}
      id="canvas"
      onClick={handleClick}
      ref={canvas}
      width={width}
    />
  );
};

Canvas.defaultProps = defaultProps;

export default observer(Canvas);
