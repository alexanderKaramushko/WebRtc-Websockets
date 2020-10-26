import { action, makeObservable, observable } from 'mobx';
import { Field } from './types';

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
