import Ws from 'ws';

export interface ExtendedWs extends Ws {
  isAlive: boolean;
  id: string;
}

export enum WsEventTypes {
  PING = 'PING',
  PONG = 'PONG',
  RTC_OFFER = 'RTC_OFFER',
  RTC_ANSWER = 'RTC_ANSWER',
}

export interface WsData {
  type: WsEventTypes;
  payload?: {
    [key: string]: unknown;
  };
}
