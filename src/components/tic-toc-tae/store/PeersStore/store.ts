import { action, makeObservable, observable } from 'mobx';
import SimplePeer from 'simple-peer';
import { WsData, WsEventTypes } from '../../../../server/types';
import { PeersStoreModel } from './types';

class PeersStore implements PeersStoreModel {

  @observable initiatorPeer = new SimplePeer({ initiator: true });

  @observable receiverPeer = new SimplePeer();

  constructor() {
    makeObservable(this);
  }

  @action.bound
  sendOffer(ws: WebSocket): void {
    this.initiatorPeer.on('signal', (data) => {
      const rtcOfferMessage: WsData = {
        payload: {
          offer: JSON.stringify(data),
        },
        type: WsEventTypes.RTC_OFFER,
      };

      ws.send(JSON.stringify(rtcOfferMessage));
    });
  }

  @action.bound
  sendAnswer(ws: WebSocket, payload: any): void {
    if (this.receiverPeer.destroyed) {
      return;
    }

    this.receiverPeer.on('signal', (offer) => {
      const rtcAnswerMessage: WsData = {
        payload: {
          answer: JSON.stringify(offer),
        },
        type: WsEventTypes.RTC_ANSWER,
      };

      ws.send(JSON.stringify(rtcAnswerMessage));
    });

    this.receiverPeer.signal(JSON.parse(payload.offer));
  }

  @action.bound
  acceptAnswer(ws: WebSocket, payload: any): void {
    if (this.initiatorPeer.destroyed) {
      return;
    }

    this.initiatorPeer.signal(JSON.parse(payload.answer));
  }

  @action.bound
  establishReceiverPeer(): void {
    this.receiverPeer = new SimplePeer();
  }

  @action.bound
  establishInitiatorPeer(): void {
    this.initiatorPeer = new SimplePeer({ initiator: true });
  }

}

export default PeersStore;
