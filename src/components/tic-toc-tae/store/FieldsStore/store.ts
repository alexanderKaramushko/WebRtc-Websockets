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

  @computed get rowLength(): number {
    const [row] = this.fields;

    return row.length;
  }

  @computed get getLinearFields(): Field[] {
    const flattenedFields = flatten(this.fields);
    const field = find(flattenedFields, (({ id }) => id === this.currentFieldId));

    if (!field) {
      return [];
    }

    const {
      y: soughtY,
      x: soughtX,
      type: soughtType,
    } = field;

    const xIntersections = filter(flattenedFields, ({ y, type }) => y === soughtY && type === soughtType);
    const yIntersections = filter(flattenedFields, ({ x, type }) => x === soughtX && type === soughtType);

    const fields = flatten(filter([xIntersections, yIntersections], ((intersection) => intersection.length === 3)));

    return fields;
  }

  @computed get getForwardDiagonalFields(): Field[] {
    const flattenedFields = flatten(this.fields);
    const field = find(flattenedFields, (({ id }) => id === this.currentFieldId));

    const fields = [];

    for (let index = 0; index < flattenedFields.length; index += 1) {
      if (index % this.rowLength === 0) {
        const middle = index / this.rowLength;
        const flattenedField = flattenedFields[index + middle];

        if (field?.type === flattenedField.type) {
          fields.push(flattenedField);
        }
      }
    }

    return fields;
  }

  @computed get getBackwardDiagonalFields(): Field[] {
    const flattenedFields = flatten(this.fields);
    const field = find(flattenedFields, (({ id }) => id === this.currentFieldId));

    const fields = [];

    let offsetIndex = 0;

    for (let index = 0; index < flattenedFields.length; index += 1) {
      const isNewRow = (index + 1) % this.rowLength === 0;

      if (isNewRow) {
        const flattenedField = flattenedFields[index - offsetIndex];

        if (field?.type === flattenedField.type) {
          fields.push(flattenedField);
        }
        offsetIndex += 1;
      }
    }

    return fields;
  }

  @computed get isVictory(): boolean {
    const victoryRows = [
      this.getLinearFields,
      this.getBackwardDiagonalFields,
      this.getForwardDiagonalFields,
    ];

    return victoryRows.some((victoryRow) => victoryRow.length === this.rowLength);
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
