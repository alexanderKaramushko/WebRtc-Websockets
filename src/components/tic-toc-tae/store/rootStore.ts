import CanvasStore from './CanvasStore/store';
import FieldsStore from './FieldsStore/store';
import PlayersStore from './PlayersStore/store';

class RootStore {

    fieldsStore: FieldsStore;
    playersStore: PlayersStore;
    canvasStore: CanvasStore;

    constructor() {
      this.fieldsStore = new FieldsStore();
      this.playersStore = new PlayersStore();
      this.canvasStore = new CanvasStore();
    }

}

export default RootStore;
