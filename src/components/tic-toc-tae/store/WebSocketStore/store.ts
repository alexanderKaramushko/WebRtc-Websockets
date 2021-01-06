import { makeObservable, observable } from 'mobx';
import { WebSocketStoreModel } from './types';

class WebSocketStore implements WebSocketStoreModel {

  @observable ws = new WebSocket('ws://localhost:8080');

  constructor() {
    makeObservable(this);
  }

}

export default WebSocketStore;
