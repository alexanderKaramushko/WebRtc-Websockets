import http from 'http';
import Ws from 'ws';
import express from 'express';
import bodyParser from 'body-parser';
import uniqueId from 'lodash/uniqueId';
import { Player, PlayersData } from './types';

const app = express();
const server = http.createServer(app);

const websocket = new Ws.Server({ server });
const players: Player[] = [
  { id: uniqueId(), isOnline: false },
  { id: uniqueId(), isOnline: false },
];

function sendToClients(data: PlayersData): void {
  websocket.clients.forEach((client) => client.send(JSON.stringify(data)));
}

app.use(bodyParser.text());

app.post('/player-off', (req) => {
  const { id } = JSON.parse(req.body);

  const index = players.findIndex(({ id: innerId }) => innerId === id);
  const player = { ...players[index], isOnline: false };

  players.splice(index, 1, player);

  sendToClients({
    player,
    players,
  });
});

websocket.on('connection', (ws) => {
  ws.on('message', (message) => {
    const client = JSON.parse(message as string);

    if (client.isOnline) {
      const index = players.findIndex(({ isOnline }) => !isOnline);
      const player = { ...players[index], isOnline: true };

      players.splice(index, 1, player);

      sendToClients({
        player,
        players,
      });
    }
  });
});

server.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 8080');
});

export default {};
