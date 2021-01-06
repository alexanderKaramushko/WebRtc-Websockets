import { FieldTypes } from '../FieldsStore/types';

export interface PlayersStoreModel {
  hasTurn: boolean;
  player: FieldTypes;
  players: string[];
}
