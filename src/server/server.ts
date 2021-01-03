import http from 'http';
import Ws from 'ws';
import express from 'express';
import uniqueId from 'lodash/uniqueId';
import forEach from 'lodash/forEach';
import { ExtendedWs, WsData, WsEventTypes } from './types';

const app = express();
const server = http.createServer(app);

const websocket = new Ws.Server({ server });
const connectedClients = new Map<string, ExtendedWs>();

function refreshIsAlive(wsClientStream: Ws, isAlive): void {
  // eslint-disable-next-line no-param-reassign
  (wsClientStream as ExtendedWs).isAlive = isAlive;
}

websocket.on('connection', (wsClientStream) => {
  const thisStreamId = uniqueId();

  connectedClients.set(thisStreamId, wsClientStream as ExtendedWs);

  refreshIsAlive(wsClientStream, true);

  wsClientStream.on('close', () => {
    connectedClients.delete(thisStreamId);
  });

  wsClientStream.on('message', (message: string) => {
    const { payload, type } = JSON.parse(message) as WsData;

    if (type === WsEventTypes.PONG) {
      refreshIsAlive(wsClientStream, true);
    } else if (type === WsEventTypes.RTC_OFFER) {
      const clientStreams = Array.from(connectedClients.values());

      forEach<ExtendedWs>(clientStreams, (clientStream) => {
        const rtcOfferMessage = {
          payload,
          type: WsEventTypes.RTC_OFFER,
        };

        clientStream.send(JSON.stringify(rtcOfferMessage));
      });
    } else if (type === WsEventTypes.RTC_ANSWER) {
      const clientStreams = Array.from(connectedClients.values());

      forEach<ExtendedWs>(clientStreams, (clientStream) => {
        const rtcAnswerMessage = {
          payload,
          type: WsEventTypes.RTC_ANSWER,
        };

        clientStream.send(JSON.stringify(rtcAnswerMessage));
      });
    }
  });
});

setInterval(() => {
  const clientStreams = Array.from(connectedClients.values());
  const clientsIds = Array.from(connectedClients.keys());

  forEach<ExtendedWs>(clientStreams, (clientStream) => {
    const { isAlive } = clientStream;

    if (!isAlive) {
      clientStream.terminate();
      return;
    }

    const pingMessage = {
      payload: {
        clients: clientsIds,
      },
      type: WsEventTypes.PING,
    };

    refreshIsAlive(clientStream, false);
    clientStream.send(JSON.stringify(pingMessage));
  });
}, 2000);

server.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 8080');
});

export default {};
