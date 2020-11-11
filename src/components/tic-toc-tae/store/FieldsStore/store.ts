import uniqId from 'lodash/uniqueId';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import find from 'lodash/find';
import filter from 'lodash/filter';
import { action, computed, makeObservable, observable } from 'mobx';
import { Field, FieldTypes } from './types';

class FieldsStore implements FieldsStore {

  @observable currentFieldId = '';

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

  @computed get isVictory(): boolean {
    const flattenedFields = flatten(this.fields);
    const setField = find(flattenedFields, (({ id }) => id === this.currentFieldId));

    if (!setField) {
      return false;
    }

    const {
      y: soughtY,
      x: soughtX,
      type: soughtType,
    } = setField;

    const xIntersections = filter(flattenedFields, ({ y, type }) => y === soughtY && type === soughtType);
    const yIntersections = filter(flattenedFields, ({ x, type }) => x === soughtX && type === soughtType);

    return xIntersections.length === 3 || yIntersections.length === 3;
  }

  constructor() {
    makeObservable(this);
  }

  @action.bound
  updatePlayer(player: FieldTypes): void {
    this.player = player;
  }

  @action.bound
  updateCurrentFieldId(id: string): void {
    this.currentFieldId = id;
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
