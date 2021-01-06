import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { StoreContext } from './StoreProvider';
import { WsData, WsEventTypes } from '../../server/types';
import Fields from './Fields/Fields';

const TicTocTae: FC = (): ReactElement => {
  const { playersStore, webSocketStore, peersStore } = useContext(StoreContext);

  useEffect(() => {
    const { ws } = webSocketStore;
    const { initiatorPeer, receiverPeer } = peersStore;

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
