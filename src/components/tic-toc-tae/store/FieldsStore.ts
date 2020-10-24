import { action, makeObservable, observable } from 'mobx';

enum Field {
  EMPTY = -1,
  CROSS = 0,
  CIRCLE = 1,
}

interface FieldsStore {
  fields: Field[][];
}

class FieldsStore implements FieldsStore {

  @observable fields = [
    [Field.EMPTY, Field.EMPTY, Field.EMPTY],
    [Field.EMPTY, Field.EMPTY, Field.EMPTY],
    [Field.EMPTY, Field.EMPTY, Field.EMPTY],
  ];

  constructor() {
    makeObservable(this);
  }

  @action.bound changeFields(): void {
    this.fields = [
      [Field.CROSS, Field.CROSS, Field.CROSS],
      [Field.CROSS, Field.CROSS, Field.CROSS],
      [Field.CROSS, Field.CROSS, Field.CROSS],
    ];
  }

}

export default FieldsStore;
