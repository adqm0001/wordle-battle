export interface Player {
  id: string,
  name: string,
  guesses: string[],
  hasWon: boolean
};

export type GameStatus = 'waiting' | 'playing' | 'finished';

export interface GameRoom  {
  code: string,
  players: Player[],
  secretWord: string,
  status: GameStatus
};

