import { action, makeObservable, observable } from 'mobx';
import uniqId from 'lodash/uniqueId';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import find from 'lodash/find';
import { Field, FieldTypes } from './types';

class FieldsStore implements FieldsStore {

  @observable player = FieldTypes.CROSS;

  @observable fields: Field[][] = [
    [
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
    ],
    [
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
    ],
    [
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, id: uniqId(), type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
    ],
  ];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  updatePlayer(player: FieldTypes): void {
    this.player = player;
  }

  @action.bound
  updateField(id: string, update: Partial<Field>): void {
    this.fields = map(this.fields, (row) => map(row, (field) => (field.id === id ? { ...field, ...update } : field)));
  }

  @action.bound
  getFieldByCoords(clickInX: number, clickInY: number): Field | null {
    const foundField = find(flatten(this.fields), (field) => {
      const { x, y, width, height } = field;

      const xEnd = x + width;
      const yEnd = y + height;

      const isClickInXBoundary = clickInX >= x && clickInX <= xEnd;
      const isClickInYBoundary = clickInY >= y && clickInY <= yEnd;

      return isClickInXBoundary && isClickInYBoundary;
    });

    return foundField || null;
  }

}

export default FieldsStore;
