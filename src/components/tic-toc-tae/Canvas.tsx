import React, { FC, ReactElement, useEffect } from 'react';
import Circle from '../Shapes/Circle';
import Square from '../Shapes/Square';
import Cross from '../Shapes/Cross';
import { Field } from './store/FieldsStore/types';

interface Props {
  fields: Field[][];
  height?: number;
  width?: number;
}

const defaultProps: Pick<Props, 'height' | 'width'> = {
  height: 200,
  width: 200,
};

const Canvas: FC<Props> = (props): ReactElement => {
  const { fields, height, width } = props;
  let canvas: HTMLCanvasElement | null = null;

  function getCanvasRef(ref: HTMLCanvasElement): void {
    canvas = ref;
  }

  function buildCanvas(context: CanvasRenderingContext2D): void {
    const [columns] = fields;

    const derivedHeight = (height as number) / fields.length;
    const derivedWidth = (width as number) / columns.length;

    for (let i = 0; i < fields.length; i += 1) {
      const row = fields[i];

      for (let j = 0; j < row.length; j += 1) {
        const offsetX = j * derivedWidth;
        const offsetY = i * derivedHeight;

        const centerX = offsetX + derivedWidth / 2;
        const centerY = offsetY + derivedHeight / 2;

        const square = new Square({
          height: derivedHeight,
          width: derivedWidth,
          x: offsetX,
          y: offsetY,
        });
        const circle = new Circle({
          anticlockwise: true,
          radius: 30,
          x: centerX,
          y: centerY,
        });
        const cross = new Cross({
          height: 20,
          width: 20,
          x: centerX,
          y: centerY,
        });

        // cross.build(context, { stroke: true });
        // circle.build(context, { fill: true });
        square.build(context);
      }
    }
  }

  useEffect(() => {
    const context = (canvas as HTMLCanvasElement).getContext('2d');

    buildCanvas((context as CanvasRenderingContext2D));
  }, [canvas, fields]);

  return (
    <canvas
      ref={getCanvasRef}
      width={width}
      height={height}
      id="canvas"
    />
  );
};

Canvas.defaultProps = defaultProps;

export default Canvas;
