import Ws from 'ws';

export interface ExtendedWs extends Ws {
  isAlive: boolean;
  id: string;
}
