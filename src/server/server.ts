import http from 'http';
import Ws from 'ws';
import express from 'express';
import uniqueId from 'lodash/uniqueId';
import forEach from 'lodash/forEach';
import { ExtendedWs } from './types';

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

  wsClientStream.on('close', () => {
    connectedClients.delete(thisStreamId);
  });

  refreshIsAlive(wsClientStream, true);

  wsClientStream.on('message', (message) => {
    if (message === 'pong') {
      refreshIsAlive(wsClientStream, true);
    }
  });
});

setInterval(() => {
  const clientStreams = Array.from(connectedClients.values());

  forEach<ExtendedWs>(clientStreams, (clientStream) => {
    const { isAlive } = clientStream;

    if (!isAlive) {
      clientStream.terminate();
      return;
    }

    refreshIsAlive(clientStream, false);
    clientStream.send('ping');
    clientStream.send(clientStreams.length);
  });
}, 2000);

server.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 8080');
});

export default {};
