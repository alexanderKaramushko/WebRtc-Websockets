import CanvasStore from './CanvasStore/store';
import FieldsStore from './FieldsStore/store';
import PeersStore from './PeersStore/store';
import PlayersStore from './PlayersStore/store';
import WebSocketStore from './WebSocketStore/store';

class RootStore {

    fieldsStore: FieldsStore;
    playersStore: PlayersStore;
    canvasStore: CanvasStore;
    webSocketStore: WebSocketStore;
    peersStore: PeersStore;

    constructor() {
      this.fieldsStore = new FieldsStore();
      this.playersStore = new PlayersStore();
      this.canvasStore = new CanvasStore();
      this.webSocketStore = new WebSocketStore();
      this.peersStore = new PeersStore();
    }

}

export default RootStore;
