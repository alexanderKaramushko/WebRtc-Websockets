import { action, makeObservable, observable } from 'mobx';
import SimplePeer from 'simple-peer';
import { WsData, WsEventTypes } from '../../../../server/types';
import { PeersStoreModel } from './types';

class PeersStore implements PeersStoreModel {

  @observable peerStatuses = ['Ожидание...'];

  @observable initiatorPeer = new SimplePeer({ initiator: true });

  @observable receiverPeer = new SimplePeer();

  constructor() {
    makeObservable(this);
  }

  @action.bound
  sendOffer(ws: WebSocket): void {
    this.updatePeerStatuses('1. Создание сигнала');

    this.initiatorPeer.on('signal', (data) => {
      this.updatePeerStatuses('2. Получение sdp-дескриптора');

      const rtcOfferMessage: WsData = {
        payload: {
          offer: JSON.stringify(data),
        },
        type: WsEventTypes.RTC_OFFER,
      };

      this.updatePeerStatuses('3. Создание оффера');

      ws.send(JSON.stringify(rtcOfferMessage));
    });
  }

  @action.bound
  sendAnswer(ws: WebSocket, payload: any): void {
    if (this.receiverPeer.destroyed) {
      return;
    }

    this.updatePeerStatuses('1. Получение оффера');

    this.receiverPeer.on('signal', (offer) => {
      this.updatePeerStatuses('4. Получение sdp-дескриптора');

      const rtcAnswerMessage: WsData = {
        payload: {
          answer: JSON.stringify(offer),
        },
        type: WsEventTypes.RTC_ANSWER,
      };

      this.updatePeerStatuses('3. Создание ответа на основе полученного оффера');

      ws.send(JSON.stringify(rtcAnswerMessage));
    });

    this.updatePeerStatuses('2. Создание сигнала');

    this.receiverPeer.signal(JSON.parse(payload.offer));
  }

  @action.bound
  acceptAnswer(ws: WebSocket, payload: any): void {
    if (this.initiatorPeer.destroyed) {
      return;
    }

    this.updatePeerStatuses('4. Получение ответа, установка соединения');

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

  @action.bound
  updatePeerStatuses(peerStatus: string): void {
    this.peerStatuses.push(peerStatus);
  }

}

export default PeersStore;
