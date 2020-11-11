/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, MouseEvent, ReactElement, useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../StoreProvider';
import { FieldTypes } from '../store/FieldsStore/types';
import Square from '../../Shapes/Square';
import Canvas from '../../Canvas/Canvas';
import Circle from '../../Shapes/Circle';
import Cross from '../../Shapes/Cross';

const Fields: FC = (): ReactElement => {
  const { fieldsStore } = useContext(StoreContext);
  const { fields, getFieldByCoords, isVictory, player, updateCurrentFieldId, updateField, updatePlayer } = fieldsStore;

  const canvasHeight = 300;
  const canvasWidth = 300;

  function build(context: CanvasRenderingContext2D): void {
    const [columns] = fields;

    const derivedHeight = canvasHeight / fields.length;
    const derivedWidth = canvasWidth / columns.length;

    for (let rowIndex = 0; rowIndex < fields.length; rowIndex += 1) {
      const row = fields[rowIndex];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
        const { id } = row[columnIndex];

        const offsetX = columnIndex * derivedWidth;
        const offsetY = rowIndex * derivedHeight;

        const square = new Square({
          height: derivedHeight,
          width: derivedWidth,
          x: offsetX,
          y: offsetY,
        });

        const updatedField = {
          height: derivedHeight,
          type: FieldTypes.EMPTY,
          width: derivedWidth,
          x: offsetX,
          y: offsetY,
        };

        updateField(id, updatedField);
        square.build(context);
      }
    }
  }

  function handleClick(event: MouseEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D): void {
    event.persist();

    if (isVictory) {
      return;
    }

    const { pageX, pageY, target } = event;

    const clickInX = pageX - (target as HTMLElement).offsetLeft;
    const clickInY = pageY - (target as HTMLElement).offsetTop;

    const fieldByCoords = getFieldByCoords(clickInX, clickInY);

    if (fieldByCoords) {
      const { height, id, type, width, x, y } = fieldByCoords;

      if (type !== FieldTypes.EMPTY) {
        return;
      }

      const centerX = x + width / 2;
      const centerY = y + height / 2;

      if (player === FieldTypes.CIRCLE) {
        // TODO: split code, SOLID
        const circle = new Circle({
          anticlockwise: true,
          radius: 30,
          x: centerX,
          y: centerY,
        });

        circle.build(context, { stroke: true });
        updatePlayer(FieldTypes.CROSS);
      } else if (player === FieldTypes.CROSS) {
        const cross = new Cross({
          height: 20,
          width: 20,
          x: centerX,
          y: centerY,
        });

        cross.build(context, { stroke: true });
        updatePlayer(FieldTypes.CIRCLE);
      }

      updateField(id, { type: player });
      updateCurrentFieldId(id);
    }
  }

  return (
    <>
      {isVictory && <div>Victory!</div>}
      <Canvas
        build={build}
        height={canvasHeight}
        onClick={handleClick}
        width={canvasWidth}
      />
    </>
  );
};

export default observer(Fields);
