import FieldsStore from './FieldsStore';

class RootStore {

    fieldsStore: FieldsStore;

    constructor() {
      this.fieldsStore = new FieldsStore();
    }

}

export default RootStore;
