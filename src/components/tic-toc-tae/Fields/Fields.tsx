import React, { FC, MouseEvent, ReactElement, useContext } from 'react';
import { StoreContext } from '../StoreProvider';
import { FieldTypes } from '../store/FieldsStore/types';
import Square from '../../Shapes/Square';
import Canvas from '../../Canvas/Canvas';
import Circle from '../../Shapes/Circle';
import Cross from '../../Shapes/Cross';

export const Fields: FC = (): ReactElement => {
  const { fieldsStore } = useContext(StoreContext);
  const { currentPlayer, fields, updateField } = fieldsStore;

  const height = 300;
  const width = 300;

  function build(context: CanvasRenderingContext2D): void {
    const [columns] = fields;

    const derivedHeight = height / fields.length;
    const derivedWidth = width / columns.length;

    for (let rowIndex = 0; rowIndex < fields.length; rowIndex += 1) {
      const row = fields[rowIndex];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
        const column = row[columnIndex];

        const offsetX = columnIndex * derivedWidth;
        const offsetY = rowIndex * derivedHeight;

        const centerX = offsetX + derivedWidth / 2;
        const centerY = offsetY + derivedHeight / 2;

        const square = new Square({
          height: derivedHeight,
          width: derivedWidth,
          x: offsetX,
          y: offsetY,
        });

        const field = {
          height: derivedHeight,
          type: FieldTypes.EMPTY,
          width: derivedWidth,
          x: offsetX,
          y: offsetY,
        };

        if (column.type === FieldTypes.CIRCLE) {
          const circle = new Circle({
            anticlockwise: true,
            radius: 30,
            x: centerX,
            y: centerY,
          });

          circle.build(context, { fill: true });
        } else if (column.type === FieldTypes.CROSS) {
          const cross = new Cross({
            height: 20,
            width: 20,
            x: centerX,
            y: centerY,
          });

          cross.build(context, { stroke: true });
        }

        updateField(rowIndex, columnIndex, field);

        square.build(context);
      }
    }
  }

  function handleClick(event: MouseEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D): void {
    event.persist();

    const { pageX, pageY, target } = event;

    const xClick = pageX - (target as HTMLElement).offsetLeft;
    const yClick = pageY - (target as HTMLElement).offsetTop;

    for (let rowIndex = 0; rowIndex < fields.length; rowIndex += 1) {
      const row = fields[rowIndex];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
        const column = row[columnIndex];

        const xBoundaryStart = column.x;
        const xBoundaryEnd = xBoundaryStart + column.width;
        const yBoundaryStart = column.y;
        const yBoundaryEnd = yBoundaryStart + column.height;

        const isClickInXBoundary = xClick >= xBoundaryStart && xClick <= xBoundaryEnd;
        const isClickInYBoundary = yClick >= yBoundaryStart && yClick <= yBoundaryEnd;

        if (isClickInXBoundary && isClickInYBoundary) {
          updateField(rowIndex, columnIndex, { type: currentPlayer });
          build(context);
        }
      }
    }
  }

  return (
    <Canvas
      build={build}
      height={height}
      onClick={handleClick}
      width={width}
    />
  );
};
