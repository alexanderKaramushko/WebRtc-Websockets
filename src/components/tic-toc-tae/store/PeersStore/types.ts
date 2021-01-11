import SimplePeer from 'simple-peer';

export enum RTCErrorCodes {
  ERR_WEBRTC_SUPPORT = 'ERR_WEBRTC_SUPPORT',
  ERR_CREATE_OFFER = 'ERR_CREATE_OFFER',
  ERR_CREATE_ANSWER = 'ERR_CREATE_ANSWER',
  ERR_SET_LOCAL_DESCRIPTION = 'ERR_SET_LOCAL_DESCRIPTION',
  ERR_SET_REMOTE_DESCRIPTION = 'ERR_SET_REMOTE_DESCRIPTION',
  ERR_ADD_ICE_CANDIDATE = 'ERR_ADD_ICE_CANDIDATE',
  ERR_ICE_CONNECTION_FAILURE = 'ERR_ICE_CONNECTION_FAILURE',
  ERR_SIGNALING = 'ERR_SIGNALING',
  ERR_DATA_CHANNEL = 'ERR_DATA_CHANNEL',
  ERR_CONNECTION_FAILURE = 'ERR_CONNECTION_FAILURE',
}

export interface PeerError extends Error {
  code: RTCErrorCodes;
}

export interface PeersStoreModel {
  initiatorPeer: SimplePeer.Instance;
  receiverPeer: SimplePeer.Instance;
  peerStatuses: string[];
}
