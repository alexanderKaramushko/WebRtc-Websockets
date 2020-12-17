/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, MouseEvent, ReactElement, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../StoreProvider';
import { Field, FieldTypes } from '../store/FieldsStore/types';
import Square from '../../Shapes/Square';
import Canvas from '../../Canvas/Canvas';
import Circle from '../../Shapes/Circle';
import Cross from '../../Shapes/Cross';
import Shape from '../../Shapes/Shape';
import Line from '../../Shapes/Line';

const Fields: FC = (): ReactElement => {
  const { canvasStore, fieldsStore, playersStore } = useContext(StoreContext);
  const {
    fields,
    getFieldByCoords,
    updateCurrentFieldId,
    updateField,
    victory,
  } = fieldsStore;
  const {
    player,
    updatePlayer,
  } = playersStore;
  const { canvasContext } = canvasStore;

  const canvasHeight = 300;
  const canvasWidth = 300;

  function build(): void {
    const [columns] = fields;

    const derivedHeight = canvasHeight / fields.length;
    const derivedWidth = canvasWidth / columns.length;

    // TODO: simplify
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
        square.build(canvasContext as CanvasRenderingContext2D);
      }
    }
  }

  function drawVictoryLine(): void {
    if (!victory) {
      return;
    }

    const { fields: victoryFields } = victory;

    const {
      height: height1,
      width: width1,
      x: x1,
      y: y1,
    } = victoryFields[0];

    const {
      height: height2,
      width: width2,
      x: x2,
      y: y2,
    } = victoryFields[victoryFields.length - 1];

    const offset = 20;

    if (victory.by === 'linear') {
      const line = new Line({
        x1: x1 + offset,
        x2: x2 + width2 - offset,
        y1: y1 + height1 / 2,
        y2: y2 + height2 / 2,
      });

      line.build(canvasContext as CanvasRenderingContext2D);
    }

    if (victory.by === 'vertical') {
      const line = new Line({
        x1: x1 + width1 / 2,
        x2: x2 + width2 / 2,
        y1: y1 + offset,
        y2: y2 + height2 - offset,
      });

      line.build(canvasContext as CanvasRenderingContext2D);
    }

    if (victory.by === 'forwardDiagonal') {
      const line = new Line({
        x1: x1 + offset,
        x2: x2 + width1 - offset,
        y1: y1 + offset,
        y2: y2 + height2 - offset,
      });

      line.build(canvasContext as CanvasRenderingContext2D);
    }

    if (victory.by === 'backwardDiagonal') {
      const line = new Line({
        x1: x1 + width1 - offset,
        x2: x2 + offset,
        y1: y1 + offset,
        y2: y2 + height2 - offset,
      });

      line.build(canvasContext as CanvasRenderingContext2D);
    }
  }

  function drawShape(inField: Field): void {
    const { height, type, width, x, y } = inField;

    if (type === FieldTypes.EMPTY) {
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      const shape = new Shape<Circle | Cross>([
        new Circle({
          anticlockwise: true,
          radius: 30,
          stroke: true,
          x: centerX,
          y: centerY,
        }),
        new Cross({
          height: 20,
          stroke: true,
          width: 20,
          x: centerX,
          y: centerY,
        }),
      ]);

      shape.build(player, canvasContext as CanvasRenderingContext2D);
    }
  }

  function handleClick(event: MouseEvent<HTMLCanvasElement>): void {
    if (victory) {
      return;
    }

    event.persist();

    const { pageX, pageY, target } = event;

    const clickInX = pageX - (target as HTMLElement).offsetLeft;
    const clickInY = pageY - (target as HTMLElement).offsetTop;

    const fieldByCoords = getFieldByCoords(clickInX, clickInY);

    if (fieldByCoords) {
      const { id } = fieldByCoords;

      drawShape(fieldByCoords);

      updateField(id, { type: player });
      updateCurrentFieldId(id);
    }
  }

  useEffect(() => {
    if (victory) {
      drawVictoryLine();
    } else {
      const { CIRCLE, CROSS } = FieldTypes;

      updatePlayer(player === CIRCLE ? CROSS : CIRCLE);
    }
  }, [fields, victory]);

  return (
    <Canvas
      build={build}
      height={canvasHeight}
      onClick={handleClick}
      width={canvasWidth}
    />
  );
};

export default observer(Fields);
