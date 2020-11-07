import { action, makeObservable, observable } from 'mobx';
import { Field, FieldTypes } from './types';

class FieldsStore implements FieldsStore {

  @observable currentPlayer = FieldTypes.CROSS;

  @observable fields = [
    [
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
    ],
    [
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
    ],
    [
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
      { height: 0, type: FieldTypes.EMPTY, width: 0, x: 0, y: 0 },
    ],
  ];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  updateField(soughtRowIndex: number, soughtColumnIndex: number, update: Partial<Field>): void {
    for (let rowIndex = 0; rowIndex < this.fields.length; rowIndex += 1) {
      if (soughtRowIndex === rowIndex) {
        this.fields[soughtRowIndex][soughtColumnIndex] = {
          ...this.fields[soughtRowIndex][soughtColumnIndex],
          ...update,
        };
      }
    }
  }

}

export default FieldsStore;
