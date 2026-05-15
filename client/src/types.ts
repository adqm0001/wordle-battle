export interface TileResult {
  letter: string
  result: 'correct' | 'present' | 'absent'
}

export type Screen = 'leaderboard' | 'lobby' | 'waiting' | 'game' | 'gameover';
