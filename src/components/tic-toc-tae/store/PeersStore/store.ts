import { makeObservable, observable } from 'mobx';
import SimplePeer from 'simple-peer';
import { PeersStoreModel } from './types';

class PeersStore implements PeersStoreModel {

  @observable initiatorPeer = new SimplePeer({ initiator: true });

  @observable receiverPeer = new SimplePeer();

  constructor() {
    makeObservable(this);
  }

}

export default PeersStore;
