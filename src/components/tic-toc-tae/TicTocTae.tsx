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

  // peer._debug = console.log;

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.addEventListener('message', (message) => {
      const { data } = message;
      const { type, payload } = JSON.parse(data);

      if (type === WsEventTypes.PING) {
        const pongMessage: WsData = {
          type: WsEventTypes.PONG,
        };

        const onlinePlayers = new Array(+payload.clients).fill(true);

        ws.send(JSON.stringify(pongMessage));
        playersStore.updatePlayers(onlinePlayers);
      } else if (type === WsEventTypes.RTC_OFFER && window.location.hash !== '#initiator') {
        const receiverPeer = new SimplePeer();

        if (!receiverPeer.destroyed) {
          receiverPeer.on('signal', (data) => {
            const rtcAnswerMessage: WsData = {
              payload: {
                answer: JSON.stringify(data),
              },
              type: WsEventTypes.RTC_ANSWER,
            };

            ws.send(JSON.stringify(rtcAnswerMessage));
          });

          receiverPeer.on('data', (data) => {
            console.log(`received data from initiator peer: ${data.toString()}`);
          });

          receiverPeer.signal(JSON.parse(payload.offer));
        }
      } else if (type === WsEventTypes.RTC_ANSWER) {
        if (!initiatorPeer.destroyed) {
          initiatorPeer.signal(JSON.parse(payload.answer));
        }
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

    initiatorPeer.on('connect', () => {
      console.log('connection established');
      initiatorPeer.send('data from initiator peer');
    });
  }, []);

  return (
    <Fields />
  );
};

export default TicTocTae;
