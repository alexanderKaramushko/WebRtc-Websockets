import { action, makeObservable, observable } from 'mobx';
import { FieldTypes } from '../FieldsStore/types';
import { PlayersStoreModel } from './types';

class PlayersStore implements PlayersStoreModel {

  @observable players: string[] = [];

  @observable player = FieldTypes.CROSS;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  updatePlayers(players: string[]): void {
    this.players = players;
  }

  @action.bound
  updatePlayer(player: FieldTypes): void {
    this.player = player;
  }

}

export default PlayersStore;
