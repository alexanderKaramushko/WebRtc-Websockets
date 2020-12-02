export interface Player {
  id?: string;
  isOnline: boolean;
}

export interface PlayersData {
  player: Player;
  players: Player[];
}
