import React, { FC, ReactElement, useContext, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import { StoreContext } from './StoreProvider';
import { WsData, WsEventTypes } from '../../server/types';
import Fields from './Fields/Fields';

const TicTocTae: FC = (): ReactElement => {
  const { playersStore } = useContext(StoreContext);
  const initiatorPeer = new SimplePeer({
    initiator: true,
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.addEventListener('message', (message) => {
      const { data } = message;
      const { type, payload } = JSON.parse(data);

      if (type === WsEventTypes.PING) {
        const pongMessage: WsData = {
          type: WsEventTypes.PONG,
        };

        ws.send(JSON.stringify(pongMessage));
        playersStore.updatePlayers(payload.clients);
      } else if (type === WsEventTypes.RTC_OFFER && window.location.hash !== '#initiator') {
        const receiverPeer = new SimplePeer();

        if (receiverPeer.destroyed) {
          return;
        }

        receiverPeer.on('signal', (data) => {
          const rtcAnswerMessage: WsData = {
            payload: {
              answer: JSON.stringify(data),
            },
            type: WsEventTypes.RTC_ANSWER,
          };

          ws.send(JSON.stringify(rtcAnswerMessage));
        });

        receiverPeer.signal(JSON.parse(payload.offer));
      } else if (type === WsEventTypes.RTC_ANSWER) {
        if (initiatorPeer.destroyed) {
          return;
        }

        initiatorPeer.signal(JSON.parse(payload.answer));
      }
    });

    ws.addEventListener('open', () => {
      if (window.location.hash === '#initiator') {
        initiatorPeer.on('signal', (data) => {
          const rtcOfferMessage: WsData = {
            payload: {
              offer: JSON.stringify(data),
            },
            type: WsEventTypes.RTC_OFFER,
          };

          ws.send(JSON.stringify(rtcOfferMessage));
        });
      }
    });
  }, []);

  return (
    <Fields />
  );
};

export default TicTocTae;
