import SimplePeer from 'simple-peer';

export interface PeersStoreModel {
  initiatorPeer: SimplePeer.Instance;
  receiverPeer: SimplePeer.Instance;
  peerStatuses: string[];
}
