import FieldsStore from './FieldsStore/store';

class RootStore {

    fieldsStore: FieldsStore;

    constructor() {
      this.fieldsStore = new FieldsStore();
    }

}

export default RootStore;
