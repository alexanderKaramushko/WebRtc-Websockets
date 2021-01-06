import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { StoreContext } from './StoreProvider';
import { WsData, WsEventTypes } from '../../server/types';
import Fields from './Fields/Fields';

const TicTocTae: FC = (): ReactElement => {
  const { peersStore, playersStore, webSocketStore } = useContext(StoreContext);

  useEffect(() => {
    const { ws } = webSocketStore;
    const {
      acceptAnswer,
      sendAnswer,
      sendOffer,
    } = peersStore;

    // todo hardcoded for now
    const isInitiator = window.location.hash === '#initiator';

    ws.addEventListener('message', (message) => {
      const { data } = message;
      const { type, payload } = JSON.parse(data);

      if (type === WsEventTypes.PING) {
        const pongMessage: WsData = {
          type: WsEventTypes.PONG,
        };

        ws.send(JSON.stringify(pongMessage));
        playersStore.updatePlayers(payload.clients);
      }

      if (type === WsEventTypes.RTC_OFFER && !isInitiator) {
        sendAnswer(ws, payload);
      }

      if (type === WsEventTypes.RTC_ANSWER) {
        acceptAnswer(ws, payload);
      }
    });

    ws.addEventListener('open', () => {
      if (isInitiator) {
        sendOffer(ws);
      }
    });
  }, []);

  return (
    <Fields />
  );
};

export default TicTocTae;
